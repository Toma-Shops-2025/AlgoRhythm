// Automatic URL Cleanser - Fixes the "rest/v1/rest/v1" double-path error
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

function createSupabaseClient() {
  let url = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || "";

  // CLEANUP LOGIC: Strip any trailing slashes or /rest/v1 from the end
  url = url.replace(/\/$/, ""); // Remove trailing slash
  url = url.replace(/\/rest\/v1$/, ""); // Remove /rest/v1 if it was accidentally pasted

  if (!url || !key) {
    console.error("[Supabase] Missing keys in Netlify Environment Variables.");
  }

  return createClient<Database>(url, key, {
    auth: {
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    }
  });
}

let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  },
});
