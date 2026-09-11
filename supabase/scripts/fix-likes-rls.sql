-- Optional: repair likes RLS if heart still fails after deploy.
-- Safe to run even if app already uses service_role for likes.

ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "likes readable by everyone" ON public.likes;
CREATE POLICY "likes readable by everyone" ON public.likes
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "users like as themselves" ON public.likes;
CREATE POLICY "users like as themselves" ON public.likes
  FOR INSERT TO authenticated
  WITH CHECK (user_id::text = auth.uid()::text);

DROP POLICY IF EXISTS "users unlike own" ON public.likes;
CREATE POLICY "users unlike own" ON public.likes
  FOR DELETE TO authenticated
  USING (user_id::text = auth.uid()::text);

GRANT SELECT ON public.likes TO anon, authenticated;
GRANT INSERT, DELETE ON public.likes TO authenticated;
GRANT ALL ON public.likes TO service_role;
