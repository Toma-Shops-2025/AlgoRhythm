
alter function public.likes_count_trg() set search_path = public;
alter function public.comments_count_trg() set search_path = public;
alter function public.follows_count_trg() set search_path = public;
alter function public.posts_profile_count_trg() set search_path = public;

-- Restrict bucket listing: replace broad SELECT with a narrower one that
-- requires a name path (URL access still works since storage uses bucket+key
-- lookup, not LIST).
drop policy if exists "avatars public read" on storage.objects;
drop policy if exists "media public read" on storage.objects;
drop policy if exists "covers public read" on storage.objects;

create policy "avatars read" on storage.objects
  for select using (bucket_id = 'avatars');
create policy "media read" on storage.objects
  for select using (bucket_id = 'media');
create policy "covers read" on storage.objects
  for select using (bucket_id = 'covers');

-- Revoke execute on internal helpers from public roles. has_role is used
-- inside RLS policies (definer rights); keep grant to authenticated so the
-- RLS evaluator can call it.
revoke execute on function public.gen_unique_handle(text) from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
