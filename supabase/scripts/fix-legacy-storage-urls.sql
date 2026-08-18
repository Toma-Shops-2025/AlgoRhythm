-- AlgoRhythm: fix media URLs after Supabase project migration.
-- Run in Supabase SQL Editor for project tmpdjywsnwzivetqludd

-- 1) Ensure public storage buckets exist
insert into storage.buckets (id, name, public) values
  ('avatars', 'avatars', true),
  ('media', 'media', true),
  ('covers', 'covers', true)
on conflict (id) do nothing;

-- 2) Rewrite dead project host -> live project host
update public.posts
set media_url = replace(
  media_url,
  'https://goorydexknxspyetdnsi.supabase.co',
  'https://tmpdjywsnwzivetqludd.supabase.co'
)
where media_url like '%goorydexknxspyetdnsi.supabase.co%';

update public.posts
set cover_url = replace(
  cover_url,
  'https://goorydexknxspyetdnsi.supabase.co',
  'https://tmpdjywsnwzivetqludd.supabase.co'
)
where cover_url like '%goorydexknxspyetdnsi.supabase.co%';

update public.profiles
set avatar_url = replace(
  avatar_url,
  'https://goorydexknxspyetdnsi.supabase.co',
  'https://tmpdjywsnwzivetqludd.supabase.co'
)
where avatar_url like '%goorydexknxspyetdnsi.supabase.co%';
