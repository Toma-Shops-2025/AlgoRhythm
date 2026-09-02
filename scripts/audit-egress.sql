-- AlgoRhythm cached egress audit (run in Supabase SQL Editor)
-- Project: tmpdjywsnwzivetqludd / AlgoRhythm-Production

-- 1) Where published media is hosted
SELECT
  CASE
    WHEN media_url ILIKE '%tmpdjywsnwzivetqludd.supabase.co/storage%' THEN 'algorhythm_storage'
    WHEN media_url ILIKE '%stream.mux.com%' OR media_url ILIKE '%mux.com%' THEN 'mux'
    WHEN media_url ILIKE '%.supabase.co/storage%' THEN 'other_supabase'
    WHEN media_url IS NULL OR media_url = '' THEN 'empty'
    ELSE 'external'
  END AS media_source,
  type,
  COUNT(*)::int AS posts,
  COALESCE(SUM(view_count), 0)::bigint AS total_views
FROM public.posts
WHERE is_published = true
GROUP BY 1, 2
ORDER BY total_views DESC;

-- 2) Top posts likely driving egress (storage URL × views)
SELECT
  id,
  title,
  type,
  view_count,
  LEFT(media_url, 100) AS media_url,
  LEFT(cover_url, 80) AS cover_url
FROM public.posts
WHERE is_published = true
  AND media_url ILIKE '%supabase.co/storage%'
ORDER BY view_count DESC NULLS LAST
LIMIT 25;

-- 3) Storage bucket totals
SELECT
  bucket_id,
  COUNT(*) AS file_count,
  PG_SIZE_PRETTY(COALESCE(SUM((metadata->>'size')::bigint), 0)) AS total_size,
  COALESCE(SUM((metadata->>'size')::bigint), 0) AS total_bytes
FROM storage.objects
GROUP BY bucket_id
ORDER BY total_bytes DESC;

-- 4) Largest individual files (biggest uploads)
SELECT
  bucket_id,
  name,
  PG_SIZE_PRETTY((metadata->>'size')::bigint) AS size,
  (metadata->>'size')::bigint AS bytes,
  created_at
FROM storage.objects
ORDER BY (metadata->>'size')::bigint DESC NULLS LAST
LIMIT 30;

-- 5) Legacy / broken hosts still in DB (rewrite or unpublish)
SELECT
  COUNT(*) FILTER (WHERE media_url ILIKE '%goorydex%') AS legacy_goorydex,
  COUNT(*) FILTER (WHERE media_url ILIKE '%commondatastorage.googleapis.com%') AS google_samples,
  COUNT(*) FILTER (WHERE media_url ILIKE '%tmpdjywsnwzivetqludd%') AS current_storage
FROM public.posts
WHERE is_published = true;

-- 6) Published posts whose storage object is over 25MB (re-compress or unpublish)
SELECT
  p.id,
  p.title,
  p.view_count,
  PG_SIZE_PRETTY((o.metadata->>'size')::bigint) AS file_size,
  (o.metadata->>'size')::bigint AS bytes,
  LEFT(p.media_url, 120) AS media_url
FROM public.posts p
JOIN storage.objects o
  ON o.name = regexp_replace(p.media_url, '^.*/storage/v1/object/public/[^/]+/', '')
 AND o.bucket_id = regexp_replace(p.media_url, '^.*/storage/v1/object/public/([^/]+)/.*$', '\1')
WHERE p.is_published = true
  AND p.media_url ILIKE '%tmpdjywsnwzivetqludd.supabase.co/storage%'
  AND (o.metadata->>'size')::bigint > 25 * 1024 * 1024
ORDER BY (o.metadata->>'size')::bigint DESC;
