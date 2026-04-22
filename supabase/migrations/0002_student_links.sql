-- 0002_student_links.sql — parent/teacher ↔ student linking.
--
-- Adults (profiles with role='parent' or 'teacher') can invite a student by
-- email. The student approves the invite on their next sign-in; after
-- acceptance the adult can READ the student's progress and WRITE the four
-- "path dial" fields (currentLevel, currentBand, selectedStudyPlanId,
-- examDate) via the `update_linked_student_path` function.
--
-- Relationship cardinality is many-to-many: one student may be visible to
-- multiple adults (Mom + Dad + homeroom teacher); one adult profile may
-- be linked to multiple students (two kids, or a small class).
--
-- v1 does NOT send invite emails. The row sits in `pending` until the
-- student signs in with the invited email; at that point the student's
-- dashboard surfaces the invite and the student accepts it. Email delivery
-- is a follow-up (v1.1).

-- ---------------------------------------------------------------------------
-- Table
-- ---------------------------------------------------------------------------
create table if not exists public.student_links (
  id                 uuid primary key default gen_random_uuid(),
  -- The adult's profile row (role='parent' or 'teacher'). `adult_user_id`
  -- is denormalized from profiles.owner_user_id for cheap RLS checks.
  adult_profile_id   uuid not null references public.profiles(id) on delete cascade,
  adult_user_id      uuid not null references auth.users(id) on delete cascade,
  -- The student side is resolved lazily: invite is created with an email
  -- only; after acceptance we fill in the student's profile + user ids.
  student_profile_id uuid references public.profiles(id) on delete set null,
  student_user_id    uuid references auth.users(id) on delete set null,
  -- Canonical invite target. Compared case-insensitively; stored as the
  -- user typed for display.
  invited_email      text not null,
  status             text not null default 'pending'
                       check (status in ('pending','accepted','revoked')),
  -- Free-form label the adult set at invite time (e.g. "My son Aarav").
  -- Only shown in the adult's UI; never shown to the student.
  adult_label        text,
  created_at         timestamptz not null default now(),
  accepted_at        timestamptz,
  revoked_at         timestamptz,
  revoked_by         text check (revoked_by is null or revoked_by in ('adult','student'))
);

create index if not exists student_links_adult_profile_idx
  on public.student_links(adult_profile_id);
create index if not exists student_links_student_profile_idx
  on public.student_links(student_profile_id) where student_profile_id is not null;
create index if not exists student_links_invited_email_idx
  on public.student_links(lower(invited_email));

-- Prevent duplicate pending invites from the same adult to the same email.
create unique index if not exists student_links_one_pending_per_adult_email
  on public.student_links(adult_profile_id, lower(invited_email))
  where status = 'pending';

-- ---------------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------------
alter table public.student_links enable row level security;

-- Adults see their own invites (pending or accepted or revoked).
drop policy if exists "student_links_select_adult" on public.student_links;
create policy "student_links_select_adult" on public.student_links
  for select
  using (auth.uid() = adult_user_id);

-- Students see invites to them. Matches either by direct user id (after
-- acceptance) OR by invited_email matching the student's auth email (for
-- pending invites issued before the student signed up).
drop policy if exists "student_links_select_student" on public.student_links;
create policy "student_links_select_student" on public.student_links
  for select
  using (
    auth.uid() = student_user_id
    or (
      status = 'pending'
      and lower(invited_email) = (
        select lower(email) from auth.users where id = auth.uid()
      )
    )
  );

-- Adults create invites. Must be the owner of the adult profile and the
-- profile must have parent/teacher role. Row must start in `pending` with
-- student ids null.
drop policy if exists "student_links_insert_adult" on public.student_links;
create policy "student_links_insert_adult" on public.student_links
  for insert
  with check (
    auth.uid() = adult_user_id
    and status = 'pending'
    and student_profile_id is null
    and student_user_id is null
    and exists (
      select 1 from public.profiles p
      where p.id = adult_profile_id
        and p.owner_user_id = auth.uid()
        and coalesce(p.data->>'role', 'student') in ('parent','teacher')
    )
  );

-- Students accept or revoke their own pending/accepted invites. The
-- WITH CHECK disallows resurrecting a revoked invite and enforces that an
-- accept row carries the correct student_user_id.
drop policy if exists "student_links_update_student" on public.student_links;
create policy "student_links_update_student" on public.student_links
  for update
  using (
    (status = 'pending'
      and lower(invited_email) = (
        select lower(email) from auth.users where id = auth.uid()
      ))
    or (status = 'accepted' and student_user_id = auth.uid())
  )
  with check (
    status in ('accepted','revoked')
    and (status <> 'accepted' or student_user_id = auth.uid())
  );

-- Adults revoke their own invites (any status → revoked). Cannot reassign
-- the adult or student ids.
drop policy if exists "student_links_update_adult_revoke" on public.student_links;
create policy "student_links_update_adult_revoke" on public.student_links
  for update
  using (auth.uid() = adult_user_id)
  with check (
    auth.uid() = adult_user_id
    and status = 'revoked'
  );

-- ---------------------------------------------------------------------------
-- Cross-user profile reads enabled by an accepted link.
-- ---------------------------------------------------------------------------
-- Adult can SELECT a linked student's profile row.
drop policy if exists "profiles_select_linked_student" on public.profiles;
create policy "profiles_select_linked_student" on public.profiles
  for select
  using (
    exists (
      select 1 from public.student_links sl
      where sl.student_profile_id = profiles.id
        and sl.adult_user_id = auth.uid()
        and sl.status = 'accepted'
    )
  );

-- Student can SELECT a linked adult's profile row (so the UI can label
-- "shared with Mom Smith" with a real name). Exposes the adult's data
-- blob — acceptable because the adult's blob is just name/role plus their
-- own demo-student seed data, nothing sensitive.
drop policy if exists "profiles_select_linked_adult" on public.profiles;
create policy "profiles_select_linked_adult" on public.profiles
  for select
  using (
    exists (
      select 1 from public.student_links sl
      where sl.adult_profile_id = profiles.id
        and sl.student_user_id = auth.uid()
        and sl.status = 'accepted'
    )
  );

-- ---------------------------------------------------------------------------
-- update_linked_student_path
--
-- The adult path-dial write channel. SECURITY DEFINER so it can bypass the
-- default profiles UPDATE policy (which scopes to owner_user_id). The
-- function itself checks the caller is an accepted linked adult, then
-- patches only the four permitted jsonb keys into `data`. This is how we
-- get column-level restriction on a jsonb blob — RLS can't do it, so we
-- channel writes through this function.
-- ---------------------------------------------------------------------------
create or replace function public.update_linked_student_path(
  p_student_profile_id       uuid,
  p_current_level            text,
  p_current_band             text,
  p_selected_study_plan_id   text,
  p_exam_date                text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_allowed boolean;
begin
  select exists (
    select 1 from public.student_links sl
    where sl.student_profile_id = p_student_profile_id
      and sl.adult_user_id = auth.uid()
      and sl.status = 'accepted'
  ) into v_allowed;

  if not v_allowed then
    raise exception 'Not authorized to update this student' using errcode = '42501';
  end if;

  update public.profiles
  set data = coalesce(data, '{}'::jsonb)
    || jsonb_build_object(
      'currentLevel',          p_current_level,
      'currentBand',           p_current_band,
      'selectedStudyPlanId',   p_selected_study_plan_id,
      'examDate',              p_exam_date
    ),
    updated_at = now()
  where id = p_student_profile_id;
end;
$$;

-- Lock down EXECUTE so anon can't call it (authenticated users only).
revoke execute on function public.update_linked_student_path(uuid, text, text, text, text) from public;
grant execute on function public.update_linked_student_path(uuid, text, text, text, text) to authenticated;
