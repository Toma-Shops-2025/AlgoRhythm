
REVOKE SELECT (birth_year, terms_accepted_at) ON public.profiles FROM anon, authenticated, public;

CREATE POLICY "admins read processed stripe events"
ON public.processed_stripe_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

GRANT SELECT ON public.processed_stripe_events TO authenticated;
