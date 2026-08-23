-- Restore missing default on posts.id (live DB drifted; inserts were sending null id).
CREATE EXTENSION IF NOT EXISTS pgcrypto;

ALTER TABLE public.posts
  ALTER COLUMN id SET DEFAULT gen_random_uuid();
