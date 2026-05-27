DROP POLICY IF EXISTS "users send tips as themselves" ON public.tips;

CREATE POLICY "users send pending tips as themselves"
ON public.tips
FOR INSERT
TO authenticated
WITH CHECK (from_user = auth.uid() AND status = 'pending');