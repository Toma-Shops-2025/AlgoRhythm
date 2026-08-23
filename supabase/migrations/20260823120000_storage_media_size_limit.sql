-- Raise media bucket limit for AI-rendered music videos (default is 50MB).
-- 500MB matches ViralSnap Pro upload cap and typical 3–5 min webm exports.

update storage.buckets
set file_size_limit = 524288000
where id = 'media';

insert into storage.buckets (id, name, public, file_size_limit)
values ('media', 'media', true, 524288000)
on conflict (id) do update set file_size_limit = excluded.file_size_limit;
