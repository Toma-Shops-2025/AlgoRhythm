-- Ensure new posts are visible in the feed/detail by default.
ALTER TABLE public.posts
  ALTER COLUMN is_published SET DEFAULT true;

-- Fix recent posts stuck unpublished after a missing/false default
-- (does not touch older intentionally unpublished rows).
UPDATE public.posts
SET is_published = true
WHERE is_published = false
  AND created_at > now() - interval '7 days';
