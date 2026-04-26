-- 0004_co_parent_invite.sql — parent → co-parent invites with fan-out
-- at acceptance.
--
-- A parent (the "inviter") can invite another parent (the "co-parent") to
-- share visibility into their already-accepted children. We reuse the
-- `student_links` table for invite plumbing (RLS, the admin-email pipeline
-- in /api/student-links/co-parent-invite, the lifecycle states), and add a
-- `kind` column to discriminate between the existing parent→student
-- invites (`kind='student'`) and the new parent→parent invites
-- (`kind='co_parent'`).
--
-- Acceptance behavior — IMPORTANT:
--   When a co-parent accepts, the SECURITY DEFINER fn
--   `accept_co_parent_invite` looks up every accepted `kind='student'`
--   link the inviter currently has and inserts a fresh `kind='student'`
--   link from the co-parent's auth user → that student. The newly inserted
--   rows are status='accepted' (the inviting parent already vouched for
--   the relationship; we don't want to ask each child to re-accept). The
--   original `kind='co_parent'` invite row is then marked accepted as a
--   record-of-event.
--
--   v1 LIMITATION: Children added to the inviter AFTER co-parent acceptance
--   are NOT auto-shared. The fan-out runs once. Re-inviting the co-parent
--   (after revoking the original invite) is the v1 workaround. v2 can
--   either (a) move to a proper `adult_co_links` join table that drives
--   visibility on read, or (b) install a trigger that fans out on every
--   inviter→student acceptance.
--
-- Reversibility: see the rollback block at the bottom of this file.

-- ---------------------------------------------------------------------------
-- 1. Add `kind` column with CHECK constraint.
-- ---------------------------------------------------------------------------
alter table public.student_links
  add column if not exists kind text not null default 'student';

-- Drop and recreate the check constraint so re-applying this migration is
-- safe even if the constraint already exists with a different definition.
alter table public.student_links
  drop constraint if exists student_links_kind_check;

alter table public.student_links
  add constraint student_links_kind_check
  check (kind in ('student','co_parent'));

create index if not exists student_links_kind_idx
  on public.student_links(kind);

-- ---------------------------------------------------------------------------
-- 2. Rebuild the unique partial index so duplicate-pending-invite detection
--    is scoped per `kind`. A parent legitimately may have BOTH a pending
--    student invite AND a pending co-parent invite addressed to the same
--    email (e.g. inviting their adult sibling who happens to also be a
--    student in their own right).
-- ---------------------------------------------------------------------------
drop index if exists public.student_links_one_pending_per_adult_email;

create unique index if not exists student_links_one_pending_per_adult_email_kind
  on public.student_links(adult_profile_id, kind, lower(invited_email))
  where status = 'pending';

-- ---------------------------------------------------------------------------
-- 3. Tighten the existing INSERT policy so co-parent invites are
--    parent-only (teachers don't have co-teachers in v1) while preserving
--    the existing parent/teacher allowance for student invites.
--
--    The earlier policy allowed any parent OR teacher profile to insert
--    rows; we keep that for `kind='student'` and add a parent-only branch
--    for `kind='co_parent'`.
-- ---------------------------------------------------------------------------
drop policy if exists "student_links_insert_adult" on public.student_links;
create policy "student_links_insert_adult" on public.student_links
  for insert
  with check (
    auth.uid() = adult_user_id
    and status = 'pending'
    and student_profile_id is null
    and student_user_id is null
    and (
      (
        kind = 'student'
        and exists (
          select 1 from public.profiles p
          where p.id = adult_profile_id
            and p.owner_user_id = auth.uid()
            and coalesce(p.data->>'role', 'student') in ('parent','teacher')
        )
      )
      or (
        kind = 'co_parent'
        and exists (
          select 1 from public.profiles p
          where p.id = adult_profile_id
            and p.owner_user_id = auth.uid()
            and coalesce(p.data->>'role', 'student') = 'parent'
        )
      )
    )
  );

-- ---------------------------------------------------------------------------
-- 4. Tighten the student-side update policy so it only matches
--    kind='student' rows. Co-parent invites must be accepted through the
--    SECURITY DEFINER function below; permitting client-side UPDATE on
--    co-parent rows would let the invitee mark the row 'accepted' WITHOUT
--    triggering the fan-out, leaving the co-parent silently un-shared.
--
--    We keep the same USING/WITH CHECK shape from migration 0003 and only
--    add `kind = 'student'` to the USING clause.
-- ---------------------------------------------------------------------------
drop policy if exists "student_links_update_student" on public.student_links;
create policy "student_links_update_student" on public.student_links
  for update
  using (
    kind = 'student'
    and (
      (status = 'pending' and lower(invited_email) = lower(auth.email()))
      or (status = 'accepted' and student_user_id = auth.uid())
    )
  )
  with check (
    status in ('accepted','revoked')
    and (status <> 'accepted' or (
      student_user_id = auth.uid()
      and student_profile_id in (
        select id from public.profiles where owner_user_id = auth.uid()
      )
    ))
  );

-- ---------------------------------------------------------------------------
-- 5. Update the column-immutability trigger to also pin `kind`.
--    Adding `kind` to the immutable list closes a privilege-escalation hole
--    where the inviter could flip a row from 'co_parent' → 'student' (or
--    vice versa) after creation and bypass the per-kind insert checks.
-- ---------------------------------------------------------------------------
create or replace function public.enforce_student_links_immutable_cols()
returns trigger
language plpgsql
as $$
begin
  if new.adult_profile_id is distinct from old.adult_profile_id then
    raise exception 'student_links.adult_profile_id is immutable' using errcode = '42501';
  end if;
  if new.adult_user_id is distinct from old.adult_user_id then
    raise exception 'student_links.adult_user_id is immutable' using errcode = '42501';
  end if;
  if new.invited_email is distinct from old.invited_email then
    raise exception 'student_links.invited_email is immutable' using errcode = '42501';
  end if;
  if new.kind is distinct from old.kind then
    raise exception 'student_links.kind is immutable' using errcode = '42501';
  end if;
  if old.student_profile_id is not null
     and new.student_profile_id is distinct from old.student_profile_id then
    raise exception 'student_links.student_profile_id is immutable after acceptance' using errcode = '42501';
  end if;
  if old.student_user_id is not null
     and new.student_user_id is distinct from old.student_user_id then
    raise exception 'student_links.student_user_id is immutable after acceptance' using errcode = '42501';
  end if;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- 6. accept_co_parent_invite — the SECURITY DEFINER fan-out function.
--
--    Authorization model:
--      - Caller must be authenticated.
--      - The link row must exist, be kind='co_parent', be status='pending',
--        and address the caller's email (matched case-insensitively against
--        auth.email()).
--      - For each kind='student' + status='accepted' link owned by the
--        ORIGINAL inviter (the row's adult_user_id / adult_profile_id), we
--        insert a new kind='student' + status='accepted' link from the
--        caller's auth user → that student. The caller has no `adult_profile_id`
--        yet that's distinct from their own parent profile they own, so we
--        require the caller to pass `p_co_parent_profile_id` and verify they
--        own it AND it's a parent profile. This is the equivalent of
--        "you're accepting AS this profile of yours".
--      - We DO NOT trust the inviter to genuinely own the children: we only
--        fan out rows whose adult_profile_id == link.adult_profile_id AND
--        adult_user_id == link.adult_user_id, both of which are immutable
--        on the row by the trigger above. So a malicious inviter cannot
--        forge ownership of children they didn't invite themselves.
--
--    Idempotency / dedup:
--      - If the co-parent already has an accepted link to a given child
--        (e.g. the child invited them directly earlier), we skip — the
--        ON CONFLICT clause on the unique pending-per-adult-email index
--        does NOT cover already-accepted rows, so we use a manual dedup via
--        WHERE NOT EXISTS.
--      - If the function is called twice (network retry, double-click) the
--        second call sees status='accepted' on the co-parent link and
--        returns 0 fan-outs without raising.
-- ---------------------------------------------------------------------------
create or replace function public.accept_co_parent_invite(
  p_link_id              uuid,
  p_co_parent_profile_id uuid
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_link              public.student_links%rowtype;
  v_caller_email      text;
  v_caller_uid        uuid;
  v_owns_profile      boolean;
  v_profile_role      text;
  v_inserted          integer := 0;
begin
  v_caller_uid := auth.uid();
  if v_caller_uid is null then
    raise exception 'Not authenticated' using errcode = '42501';
  end if;

  v_caller_email := auth.email();
  if v_caller_email is null then
    raise exception 'No email on session' using errcode = '42501';
  end if;

  -- Load the invite row. Use a row lock so concurrent accepts can't both
  -- run the fan-out (the second one would see status='accepted').
  select * into v_link
  from public.student_links
  where id = p_link_id
  for update;

  if not found then
    raise exception 'Invite not found' using errcode = '42704';
  end if;

  if v_link.kind <> 'co_parent' then
    raise exception 'Not a co-parent invite' using errcode = '22023';
  end if;

  -- Match the invite to the caller. We accept either pending (normal path)
  -- or already-accepted-by-this-user (idempotent retry returns 0).
  if lower(v_link.invited_email) <> lower(v_caller_email) then
    raise exception 'Invite is not addressed to you' using errcode = '42501';
  end if;

  if v_link.status = 'accepted' then
    -- Already done. Return 0 to signal no new fan-outs were created.
    return 0;
  end if;

  if v_link.status <> 'pending' then
    raise exception 'Invite is not pending' using errcode = '22023';
  end if;

  -- Verify caller owns the parent profile they want to accept AS, and that
  -- it's a parent role profile. (Co-parents must already have onboarded as
  -- parents — the UI walks them through onboarding before surfacing the
  -- accept button.)
  select
    (owner_user_id = v_caller_uid),
    coalesce(data->>'role', 'student')
  into v_owns_profile, v_profile_role
  from public.profiles
  where id = p_co_parent_profile_id;

  if not coalesce(v_owns_profile, false) then
    raise exception 'You do not own that profile' using errcode = '42501';
  end if;

  if v_profile_role <> 'parent' then
    raise exception 'Co-parent invites can only be accepted by parent profiles' using errcode = '42501';
  end if;

  -- Fan-out: for each accepted student link the inviter owns, create a
  -- new accepted link from the co-parent → that student. Skip duplicates
  -- where the co-parent already has any non-revoked link to that student.
  --
  -- NOTE: we deliberately set adult_profile_id = p_co_parent_profile_id
  -- (the co-parent's parent profile) so the new rows are visible on that
  -- specific profile's dashboard. The co-parent may own multiple profiles;
  -- this scopes the visibility to the one they explicitly chose.
  insert into public.student_links (
    adult_profile_id,
    adult_user_id,
    student_profile_id,
    student_user_id,
    invited_email,
    status,
    adult_label,
    kind,
    accepted_at
  )
  select
    p_co_parent_profile_id,
    v_caller_uid,
    src.student_profile_id,
    src.student_user_id,
    v_caller_email,
    'accepted',
    -- Carry forward the inviter's label as a hint, prefixed so the co-parent
    -- can tell it came from the fan-out. Falls back to a generic label.
    coalesce(
      'Shared by co-parent: ' || nullif(src.adult_label, ''),
      'Shared by co-parent'
    ),
    'student',
    now()
  from public.student_links src
  where src.adult_profile_id = v_link.adult_profile_id
    and src.adult_user_id = v_link.adult_user_id
    and src.kind = 'student'
    and src.status = 'accepted'
    and src.student_profile_id is not null
    and src.student_user_id is not null
    -- Dedup: skip students the co-parent already has a non-revoked link to,
    -- regardless of which of their own profiles owns that link, so we don't
    -- create duplicates if they'd already linked from another of their parent
    -- profiles or accepted a direct invite from the child earlier.
    and not exists (
      select 1 from public.student_links existing
      where existing.adult_user_id = v_caller_uid
        and existing.kind = 'student'
        and existing.status <> 'revoked'
        and existing.student_profile_id = src.student_profile_id
    );

  get diagnostics v_inserted = row_count;

  -- Mark the co-parent invite row accepted. We patch student_user_id only
  -- (NOT student_profile_id — co-parent invites are not "attached" to a
  -- student profile; v_link.student_profile_id stays null forever, which the
  -- immutability trigger permits because the OLD value was also null and the
  -- trigger only locks once non-null).
  update public.student_links
  set status         = 'accepted',
      student_user_id = v_caller_uid,
      accepted_at    = now()
  where id = p_link_id;

  return v_inserted;
end;
$$;

revoke execute on function public.accept_co_parent_invite(uuid, uuid) from public;
grant execute on function public.accept_co_parent_invite(uuid, uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- ROLLBACK (for reference — not auto-applied)
-- ---------------------------------------------------------------------------
-- To revert this migration manually:
--
--   drop function if exists public.accept_co_parent_invite(uuid, uuid);
--   drop policy if exists "student_links_update_student" on public.student_links;
--   create policy "student_links_update_student" on public.student_links
--     for update
--     using (
--       (status = 'pending' and lower(invited_email) = lower(auth.email()))
--       or (status = 'accepted' and student_user_id = auth.uid())
--     )
--     with check (
--       status in ('accepted','revoked')
--       and (status <> 'accepted' or (
--         student_user_id = auth.uid()
--         and student_profile_id in (
--           select id from public.profiles where owner_user_id = auth.uid()
--         )
--       ))
--     );
--   drop policy if exists "student_links_insert_adult" on public.student_links;
--   create policy "student_links_insert_adult" on public.student_links
--     for insert
--     with check (
--       auth.uid() = adult_user_id
--       and status = 'pending'
--       and student_profile_id is null
--       and student_user_id is null
--       and exists (
--         select 1 from public.profiles p
--         where p.id = adult_profile_id
--           and p.owner_user_id = auth.uid()
--           and coalesce(p.data->>'role', 'student') in ('parent','teacher')
--       )
--     );
--   drop index if exists public.student_links_one_pending_per_adult_email_kind;
--   create unique index if not exists student_links_one_pending_per_adult_email
--     on public.student_links(adult_profile_id, lower(invited_email))
--     where status = 'pending';
--   drop index if exists public.student_links_kind_idx;
--   alter table public.student_links drop constraint if exists student_links_kind_check;
--   alter table public.student_links drop column if exists kind;
--   -- Restore the original immutability trigger (without the kind check):
--   create or replace function public.enforce_student_links_immutable_cols()
--   returns trigger language plpgsql as $$
--   begin
--     if new.adult_profile_id is distinct from old.adult_profile_id then
--       raise exception 'student_links.adult_profile_id is immutable' using errcode = '42501';
--     end if;
--     -- ... (see migration 0002 for the original body)
--     return new;
--   end;
--   $$;
--
-- After revert, any kind='co_parent' rows that existed will be lost. Drain
-- them by marking them revoked first if you need an audit trail.
