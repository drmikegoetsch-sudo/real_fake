-- Run this in your Supabase SQL editor

create table responses (
  id          uuid default gen_random_uuid() primary key,
  created_at  timestamp with time zone default now(),
  answers     jsonb not null,
  all_correct boolean not null
);

-- Enable Realtime on this table
alter publication supabase_realtime add table responses;

-- Row Level Security
alter table responses enable row level security;

-- Anyone can insert (participants submitting answers)
create policy "allow insert"
  on responses for insert
  with check (true);

-- Anyone can read (presenter graph, future leaderboard)
create policy "allow select"
  on responses for select
  using (true);
