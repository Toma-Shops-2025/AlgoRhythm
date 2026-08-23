import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
function createSupabaseAdminClient() {
  let url = process.env.SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  url = url.replace(/\/$/, "");
  url = url.replace(/\/rest\/v1$/, "");
  if (!url || !key) {
    throw new Error("Missing Supabase Admin keys in Netlify Environment Variables.");
  }
  return createClient(url, key, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
let _supabaseAdmin;
const supabaseAdmin = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  }
});
export {
  supabaseAdmin as s
};
