-- Enable required extension for UUID generation
create extension if not exists pgcrypto with schema public;

-- Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  username text,
  role text default 'job_seeker',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Profiles RLS policies
create policy if not exists "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy if not exists "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy if not exists "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Create jobs table
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text,
  company text,
  location text,
  type text,
  description text,
  requirements text,
  benefits text,
  salary_min integer,
  salary_max integer,
  posted_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

alter table public.jobs enable row level security;

-- Jobs RLS policies
create policy if not exists "Jobs are viewable by everyone"
  on public.jobs for select
  using (true);

create policy if not exists "Authenticated users can create jobs"
  on public.jobs for insert
  with check (posted_by = auth.uid());

create policy if not exists "Users can update their own jobs"
  on public.jobs for update
  using (posted_by = auth.uid());

-- Helpful indexes
create index if not exists idx_jobs_posted_by on public.jobs(posted_by);

-- Create applications table
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  cover_letter text,
  created_at timestamptz default now()
);

alter table public.applications enable row level security;

-- Applications RLS policies
create policy if not exists "Users can view their own applications"
  on public.applications for select
  using (auth.uid() = user_id);

create policy if not exists "Users can create their own applications"
  on public.applications for insert
  with check (auth.uid() = user_id);

-- Helpful indexes
create index if not exists idx_applications_user_id on public.applications(user_id);
create index if not exists idx_applications_job_id on public.applications(job_id);
