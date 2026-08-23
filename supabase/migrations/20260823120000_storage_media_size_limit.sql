-- Raise media bucket limit for AI-rendered music videos (default is 50MB).
-- 500MB matches ViralSnap Pro upload cap and typical 3–5 min webm exports.
--
-- IMPORTANT: Supabase also enforces a GLOBAL file size limit in
-- Dashboard → Storage → Settings. Free plans cannot exceed 50MB globally.
-- Pro (or higher) is required to raise the global cap above 50MB.

update storage.buckets
set file_size_limit = 524288000
where id = 'media';

insert into storage.buckets (id, name, public, file_size_limit)
values ('media', 'media', true, 524288000)
on conflict (id) do update set file_size_limit = excluded.file_size_limit;

-- Verify bucket limit (should show 524288000)
select id, file_size_limit from storage.buckets where id = 'media';
