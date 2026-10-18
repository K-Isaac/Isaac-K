-- Run after schema.sql. Sections + sub-sections, settings, revision history.
create table if not exists sections (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  parent_id uuid references sections(id) on delete cascade,
  title text not null,
  body text default '',
  position bigint default 0,
  visible boolean default true,
  updated_at timestamptz default now()
);
create table if not exists settings (key text primary key, value jsonb);
create table if not exists section_revisions (
  id bigserial primary key, section_id uuid, title text, body text, saved_at timestamptz default now()
);
create or replace function keep_revision() returns trigger as $$
begin
  insert into section_revisions(section_id, title, body) values (old.id, old.title, old.body);
  new.updated_at = now();
  return new;
end $$ language plpgsql;
drop trigger if exists sections_rev on sections;
create trigger sections_rev before update on sections for each row execute function keep_revision();

alter table sections enable row level security;
alter table settings enable row level security;
alter table section_revisions enable row level security;
create policy "read visible sections" on sections for select using (visible = true or auth.role() = 'authenticated');
create policy "owner edits sections" on sections for all to authenticated using (true) with check (true);
create policy "public reads settings" on settings for select using (true);
create policy "owner edits settings" on settings for all to authenticated using (true) with check (true);
create policy "owner reads revisions" on section_revisions for select to authenticated using (true);
