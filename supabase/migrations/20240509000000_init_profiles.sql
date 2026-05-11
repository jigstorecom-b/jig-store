-- Initial Schema for User Profiles
-- Created for Business Engine master template

-- 1. Create the profiles table
create table if not exists public.profiles (
  id          uuid references auth.users on delete cascade primary key,
  full_name   text,
  role        text default 'customer',   -- 'admin' | 'client' | 'customer'
  avatar_url  text,
  created_at  timestamptz default now()
);

-- 2. Enable RLS
alter table public.profiles enable row level security;

-- 3. RLS Policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 4. Auth Trigger (Auto-create profile on signup)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
