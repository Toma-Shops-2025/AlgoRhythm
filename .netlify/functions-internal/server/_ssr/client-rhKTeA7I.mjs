import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
function createSupabaseClient() {
  let url = "https://tmpdjywsnwzivetqludd.supabase.co";
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtcGRqeXdzbnd6aXZldHFsdWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3NDQ2NDcsImV4cCI6MjA5MDMyMDY0N30.qZ_G8jdWgX3sbm5LFOU_l4bkak5hSXzChwnkJ65I7tY";
  if (url) {
    url = url.split("/rest/v1")[0].replace(/\/$/, "");
  }
  if (!url || !key) {
    console.error("[Supabase] Missing keys. Check Netlify Env Vars.");
  }
  return createClient(url, key, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
export {
  supabase as s
};
