-- 0003_use_auth_email.sql — hotfix.
--
-- Migration 0002 had two student_links policies that subqueried auth.users
-- directly:
--
--   lower(invited_email) = (select lower(email) from auth.users where id = auth.uid())
--
-- Neither the `anon` nor `authenticated` role has SELECT on auth.users by
-- default. RLS evaluates ALL permissive SELECT policies on a table; when
-- any client (signed-in or not) queried `profiles`, the planner drilled
-- through `profiles_select_linked_student` → student_links RLS →
-- student_links_select_student → auth.users and got
-- `42501 permission denied for table users`. End user saw "Couldn't load
-- your profiles. Please refresh." on the public landing page.
--
-- Replace the subquery with Supabase's built-in `auth.email()` function,
-- which reads the email out of the request JWT and is callable by any
-- role. Same semantics, no auth.users access needed.

drop policy if exists "student_links_select_student" on public.student_links;
create policy "student_links_select_student" on public.student_links
  for select
  using (
    auth.uid() = student_user_id
    or (status = 'pending' and lower(invited_email) = lower(auth.email()))
  );

drop policy if exists "student_links_update_student" on public.student_links;
create policy "student_links_update_student" on public.student_links
  for update
  using (
    (status = 'pending' and lower(invited_email) = lower(auth.email()))
    or (status = 'accepted' and student_user_id = auth.uid())
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
