CREATE TABLE public.connected_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_account_id text NOT NULL,
  environment text NOT NULL CHECK (environment IN ('sandbox','live')),
  charges_enabled boolean NOT NULL DEFAULT false,
  payouts_enabled boolean NOT NULL DEFAULT false,
  details_submitted boolean NOT NULL DEFAULT false,
  country text,
  default_currency text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, environment),
  UNIQUE (stripe_account_id)
);

GRANT SELECT ON public.connected_accounts TO authenticated;
GRANT ALL ON public.connected_accounts TO service_role;

ALTER TABLE public.connected_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users read own connected account"
  ON public.connected_accounts FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "no user inserts on connected_accounts"
  ON public.connected_accounts FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE POLICY "no user updates on connected_accounts"
  ON public.connected_accounts FOR UPDATE
  TO authenticated
  USING (false);

CREATE POLICY "no user deletes on connected_accounts"
  ON public.connected_accounts FOR DELETE
  TO authenticated
  USING (false);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_connected_accounts_updated_at
  BEFORE UPDATE ON public.connected_accounts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();