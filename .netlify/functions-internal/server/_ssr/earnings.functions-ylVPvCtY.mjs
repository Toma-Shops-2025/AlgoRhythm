import { c as createServerRpc } from "./createServerRpc-o8WUwg82.mjs";
import { c as createServerFn } from "./server-BXP1ipXf.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-OlnkJNGV.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const CREATOR_SUB_GROSS_CENTS = 499;
const CREATOR_NET_BPS = 8500;
const getMyEarnings_createServerFn_handler = createServerRpc({
  id: "26dd6e8190f511198bb5d3d37ebe2511a957e9a2f13ab145c1c74af17d9aa8e8",
  name: "getMyEarnings",
  filename: "../algorhythm/src/lib/earnings.functions.ts"
}, (opts) => getMyEarnings.__executeServer(opts));
const getMyEarnings = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(getMyEarnings_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: tips
  } = await supabase.from("tips").select("id, amount_cents, creator_net_cents, created_at, environment, status").eq("to_user", userId).eq("status", "succeeded").order("created_at", {
    ascending: false
  }).limit(500);
  const tipRows = tips ?? [];
  const tipGrossCents = tipRows.reduce((s, t) => s + (t.amount_cents ?? 0), 0);
  const tipNetCents = tipRows.reduce((s, t) => s + (t.creator_net_cents ?? 0), 0);
  const {
    data: subs
  } = await supabase.from("subscriptions").select("status, current_period_end").eq("creator_id", userId).eq("kind", "creator");
  const now = Date.now();
  const activeSubs = (subs ?? []).filter((s) => {
    if (!["active", "trialing", "past_due"].includes(s.status)) return false;
    const end = s.current_period_end ? new Date(s.current_period_end).getTime() : Infinity;
    return end > now;
  });
  const activeSubCount = activeSubs.length;
  const estMonthlySubNetCents = Math.round(activeSubCount * CREATOR_SUB_GROSS_CENTS * (CREATOR_NET_BPS / 1e4));
  return {
    tipCount: tipRows.length,
    tipGrossCents,
    tipNetCents,
    activeSubCount,
    estMonthlySubNetCents,
    totalBalanceCents: tipNetCents,
    // subs not paid out yet
    recentTips: tipRows.slice(0, 10).map((t) => ({
      id: t.id,
      amountCents: t.amount_cents ?? 0,
      netCents: t.creator_net_cents ?? 0,
      createdAt: t.created_at,
      environment: t.environment
    }))
  };
});
export {
  getMyEarnings_createServerFn_handler
};
