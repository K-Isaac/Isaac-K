create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text default '',
  content text default '',
  published boolean default true,
  created_at timestamptz default now()
);
alter table posts enable row level security;
create policy "public reads published" on posts for select using (published = true or auth.role() = 'authenticated');
create policy "owner writes" on posts for all to authenticated using (true) with check (true);
-- Then: Auth → Providers → disable "Allow new users to sign up", and create ONE user (you) in Auth → Users.
