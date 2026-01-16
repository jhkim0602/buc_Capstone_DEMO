-- Create the dev_events table
create table if not exists public.dev_events (
  id uuid not null default gen_random_uuid (),
  title text not null,
  link text not null,
  host text null,
  date text not null,
  start_date date null,
  end_date date null,
  tags text[] null,
  category text null,
  status text not null default 'recruiting'::text,
  source text not null default 'github'::text,
  description text null,
  thumbnail text null,
  content text null,
  created_at timestamp with time zone not null default now(),
  constraint dev_events_pkey primary key (id),
  constraint dev_events_link_key unique (link)
);

-- Enable RLS (Row Level Security) if needed, or leave open for service role
alter table public.dev_events enable row level security;

-- Allow read access to everyone (public)
create policy "Allow public read access"
  on public.dev_events
  for select
  to public
  using (true);

-- Allow service role to do everything (implicit, but good to know)
