# Security Fixes

Fix the three real warnings from the security scan. Skip the informational/false-positive ones.

## 1. Lock down `/api/transcribe-lyrics`

Right now anyone on the internet can POST a 20 MB audio file and burn the Lovable AI quota.

- In `src/routes/api/transcribe-lyrics.ts`, validate an `Authorization: Bearer <token>` header at the top of the POST handler using `supabase.auth.getClaims(token)` (same pattern as `auth-middleware.ts`). Return 401 if missing/invalid.
- In `src/routes/upload.tsx`, attach the user's access token to the `fetch('/api/transcribe-lyrics', ...)` call via `supabase.auth.getSession()`.

## 2. Stop leaking `birth_year` and `terms_accepted_at` from `profiles`

The `profiles` table is publicly readable (needed for handles/avatars), but `birth_year` and `terms_accepted_at` shouldn't be.

Migration:
- Drop the existing public `SELECT` policy on `profiles`.
- Recreate it so `anon` and other users can only read non-sensitive columns. Cleanest approach: keep public SELECT but add a `SECURITY INVOKER` view `public.profiles_public` exposing only safe columns, and switch any anon/public-facing reads to it. Simpler alternative (chosen): keep the existing table policy but **revoke `birth_year` and `terms_accepted_at` column-level SELECT from `anon`**, and add a separate policy so owners can still read their own row in full. Postgres supports column-level GRANTs which PostgREST honors.
- Then audit `src/lib/*.functions.ts` for any `profiles` select using `*` that would now silently drop those columns for non-owners (should be fine — UI doesn't display them publicly).

## 3. Add admin SELECT policy on `processed_stripe_events`

Migration: add `CREATE POLICY "admins read processed stripe events" ON public.processed_stripe_events FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));`. Webhook writes already use `supabaseAdmin` so this is purely additive.

## Skipped (not real issues)

- **Blocked users can detect they're blocked** — scanner itself says the policy is correct.
- **Signed-in users can execute SECURITY DEFINER functions** — `has_role`, `handle_new_user`, `gen_unique_handle` are intentionally callable; this is the standard Supabase pattern.
- **RLS enabled, no policy (info)** — resolved by fix #3.

## Order of operations

1. Migration: column-level GRANT revoke on `profiles` + owner-read policy + admin policy on `processed_stripe_events`.
2. Edit `src/routes/api/transcribe-lyrics.ts` (add auth check).
3. Edit `src/routes/upload.tsx` (send bearer token).
4. Re-run the security scan to confirm.
