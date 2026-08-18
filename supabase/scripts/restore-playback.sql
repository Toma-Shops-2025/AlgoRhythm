-- AlgoRhythm: restore feed playback (project tmpdjywsnwzivetqludd)
-- Paste into Supabase → SQL Editor → Run

-- 1) Public storage buckets
insert into storage.buckets (id, name, public) values
  ('avatars', 'avatars', true),
  ('media', 'media', true),
  ('covers', 'covers', true)
on conflict (id) do nothing;

-- 2) Storage policies (idempotent)
drop policy if exists "media read" on storage.objects;
create policy "media read" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "media owner write" on storage.objects;
create policy "media owner write" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "media owner delete" on storage.objects;
create policy "media owner delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "media owner update" on storage.objects;
create policy "media owner update" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "covers read" on storage.objects;
create policy "covers read" on storage.objects
  for select using (bucket_id = 'covers');

drop policy if exists "covers owner write" on storage.objects;
create policy "covers owner write" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'covers' and (storage.foldername(name))[1] = auth.uid()::text);

-- 3) Rewrite URLs from deleted project
update public.posts
set media_url = replace(media_url, 'https://goorydexknxspyetdnsi.supabase.co', 'https://tmpdjywsnwzivetqludd.supabase.co')
where media_url like '%goorydexknxspyetdnsi.supabase.co%';

update public.posts
set cover_url = replace(cover_url, 'https://goorydexknxspyetdnsi.supabase.co', 'https://tmpdjywsnwzivetqludd.supabase.co')
where cover_url like '%goorydexknxspyetdnsi.supabase.co%';

update public.profiles
set avatar_url = replace(avatar_url, 'https://goorydexknxspyetdnsi.supabase.co', 'https://tmpdjywsnwzivetqludd.supabase.co')
where avatar_url like '%goorydexknxspyetdnsi.supabase.co%';

-- 4) Hide broken feed rows (media files were never migrated to this project).
update public.posts
set is_published = false
where is_published = true;

-- 5) Summary
select is_published, count(*) as n from public.posts group by is_published order by n desc;
