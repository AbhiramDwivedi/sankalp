-- 0001_profiles.sql — initial schema for cross-device profile sync.
--
-- Design: one row per StudentProfile, whole profile blob stored in `data`
-- jsonb. Blob storage (not per-field columns) so schema evolution on the
-- client (adding new optional fields to StudentProfile) does not require DB
-- migrations. `migrateProfile()` in types.ts handles backward compat on read.
--
-- One auth.users may own many profiles (parent tracking demo students, a
-- teacher with a demo seat, etc. — architectural choice captured in
-- docs/AUTH_SETUP.md).

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id            uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  data          jsonb not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists profiles_owner_idx on public.profiles(owner_user_id);

-- ---------------------------------------------------------------------------
-- updated_at touch trigger
-- ---------------------------------------------------------------------------
create or replace function public.touch_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_profiles_updated_at();

-- ---------------------------------------------------------------------------
-- Row-level security: users only see + write their own profiles.
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select
  using (auth.uid() = owner_user_id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert
  with check (auth.uid() = owner_user_id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update
  using (auth.uid() = owner_user_id)
  with check (auth.uid() = owner_user_id);

drop policy if exists "profiles_delete_own" on public.profiles;
create policy "profiles_delete_own" on public.profiles
  for delete
  using (auth.uid() = owner_user_id);
