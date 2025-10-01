-- Add a user_role enum type if it doesn't exist
do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('volunteer','broker');
  end if;
end $$;

-- Add the column (safe if run more than once)
alter table public.profiles
  add column if not exists role public.user_role;
