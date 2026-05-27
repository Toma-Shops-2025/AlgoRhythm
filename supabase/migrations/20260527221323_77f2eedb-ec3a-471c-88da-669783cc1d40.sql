-- Saves (bookmarks) for posts
CREATE TABLE public.saves (
  user_id uuid NOT NULL,
  post_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, post_id)
);
CREATE INDEX idx_saves_user_created ON public.saves(user_id, created_at DESC);
CREATE INDEX idx_saves_post ON public.saves(post_id);

GRANT SELECT, INSERT, DELETE ON public.saves TO authenticated;
GRANT ALL ON public.saves TO service_role;

ALTER TABLE public.saves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users read own saves" ON public.saves
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "users save as themselves" ON public.saves
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "users unsave own" ON public.saves
  FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Post-level engagement metrics for retention-weighted feed
ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS save_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS play_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS complete_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS loop_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_listen_ms bigint NOT NULL DEFAULT 0;

-- Saves count trigger
CREATE OR REPLACE FUNCTION public.saves_count_trg()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
begin
  if tg_op = 'INSERT' then
    update public.posts set save_count = save_count + 1 where id = new.post_id;
  elsif tg_op = 'DELETE' then
    update public.posts set save_count = greatest(0, save_count - 1) where id = old.post_id;
  end if;
  return null;
end $$;

CREATE TRIGGER saves_count_ins AFTER INSERT ON public.saves
  FOR EACH ROW EXECUTE FUNCTION public.saves_count_trg();
CREATE TRIGGER saves_count_del AFTER DELETE ON public.saves
  FOR EACH ROW EXECUTE FUNCTION public.saves_count_trg();
