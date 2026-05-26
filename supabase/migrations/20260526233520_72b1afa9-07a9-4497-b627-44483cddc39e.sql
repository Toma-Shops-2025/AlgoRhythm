
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('pro','creator')),
  creator_id UUID,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT NOT NULL UNIQUE,
  price_id TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
  environment TEXT NOT NULL DEFAULT 'sandbox' CHECK (environment IN ('sandbox','live')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users read own subscriptions" ON public.subscriptions
  FOR SELECT TO authenticated USING (user_id = auth.uid() OR creator_id = auth.uid());
CREATE POLICY "no user inserts on subscriptions" ON public.subscriptions
  FOR INSERT TO authenticated WITH CHECK (false);
CREATE POLICY "no user updates on subscriptions" ON public.subscriptions
  FOR UPDATE TO authenticated USING (false);
CREATE POLICY "no user deletes on subscriptions" ON public.subscriptions
  FOR DELETE TO authenticated USING (false);

CREATE INDEX idx_subs_user ON public.subscriptions(user_id, environment, kind);
CREATE INDEX idx_subs_creator ON public.subscriptions(creator_id, environment) WHERE creator_id IS NOT NULL;

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.tips
  ADD COLUMN stripe_payment_intent_id TEXT UNIQUE,
  ADD COLUMN stripe_checkout_session_id TEXT UNIQUE,
  ADD COLUMN environment TEXT NOT NULL DEFAULT 'sandbox' CHECK (environment IN ('sandbox','live')),
  ADD COLUMN platform_fee_cents INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN creator_net_cents INTEGER NOT NULL DEFAULT 0;

CREATE TABLE public.processed_stripe_events (
  event_id TEXT NOT NULL PRIMARY KEY,
  type TEXT NOT NULL,
  environment TEXT NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.processed_stripe_events TO service_role;
ALTER TABLE public.processed_stripe_events ENABLE ROW LEVEL SECURITY;
