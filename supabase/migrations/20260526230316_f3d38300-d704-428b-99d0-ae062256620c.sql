
-- 1. tips: block update/delete for users (only service_role bypasses RLS)
CREATE POLICY "no user updates on tips" ON public.tips FOR UPDATE TO authenticated USING (false);
CREATE POLICY "no user deletes on tips" ON public.tips FOR DELETE TO authenticated USING (false);

-- 2. user_roles: only admins can write
CREATE POLICY "admins insert roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins update roles" ON public.user_roles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins delete roles" ON public.user_roles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 3. storage update policies for covers + media
CREATE POLICY "covers owner update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'covers' AND (storage.foldername(name))[1] = (auth.uid())::text);
CREATE POLICY "media owner update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'media' AND (storage.foldername(name))[1] = (auth.uid())::text);

-- 4. drop broad SELECT policies (public buckets still serve via /object/public/* endpoint without RLS)
DROP POLICY IF EXISTS "avatars read" ON storage.objects;
DROP POLICY IF EXISTS "covers read" ON storage.objects;
DROP POLICY IF EXISTS "media read" ON storage.objects;

-- 5. revoke executable SECURITY DEFINER from end users
REVOKE EXECUTE ON FUNCTION public.gen_unique_handle(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
