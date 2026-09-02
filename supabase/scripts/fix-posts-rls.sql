-- Restore posts RLS policies (run in Supabase SQL Editor if inserts fail from the app)
-- Project: tmpdjywsnwzivetqludd / AlgoRhythm-Production

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "posts viewable by everyone" ON public.posts;
DROP POLICY IF EXISTS "creators insert own posts" ON public.posts;
DROP POLICY IF EXISTS "creators update own posts" ON public.posts;
DROP POLICY IF EXISTS "creators delete own posts" ON public.posts;

CREATE POLICY "posts viewable by everyone" ON public.posts
  FOR SELECT USING (is_published = true OR creator_id = auth.uid());

CREATE POLICY "creators insert own posts" ON public.posts
  FOR INSERT TO authenticated
  WITH CHECK (creator_id = auth.uid());

CREATE POLICY "creators update own posts" ON public.posts
  FOR UPDATE TO authenticated
  USING (creator_id = auth.uid());

CREATE POLICY "creators delete own posts" ON public.posts
  FOR DELETE TO authenticated
  USING (creator_id = auth.uid());

-- Verify policies exist
SELECT policyname, cmd, roles
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'posts'
ORDER BY policyname;
