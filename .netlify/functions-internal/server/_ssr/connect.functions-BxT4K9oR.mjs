import { c as createServerRpc } from "./createServerRpc-Cyzl_R9r.mjs";
import { c as createServerFn } from "./server-BFmo0EM4.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D56DPoCt.mjs";
import { s as supabaseAdmin } from "./client.server-LV8D9vnO.mjs";
import { c as createStripeClient, g as getStripeErrorMessage } from "./stripe.server-B9htgGZ_.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/stripe.mjs";
import { e as enumType, s as stringType } from "../_libs/zod.mjs";
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
import "events";
import "http";
import "https";
import "os";
const EnvSchema = enumType(["sandbox", "live"]);
async function upsertConnectedAccount(userId, env, account) {
  await supabaseAdmin.from("connected_accounts").upsert({
    user_id: userId,
    environment: env,
    stripe_account_id: account.id,
    charges_enabled: account.charges_enabled ?? false,
    payouts_enabled: account.payouts_enabled ?? false,
    details_submitted: account.details_submitted ?? false,
    country: account.country ?? null,
    default_currency: account.default_currency ?? null,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }, {
    onConflict: "user_id,environment"
  });
}
const getMyConnectStatus_createServerFn_handler = createServerRpc({
  id: "dfd5dd01f9f5c3c0b2765ca1345e61ccae56e070c21694f38ca5ac40686d2874",
  name: "getMyConnectStatus",
  filename: "src/lib/connect.functions.ts"
}, (opts) => getMyConnectStatus.__executeServer(opts));
const getMyConnectStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  return data;
}).handler(getMyConnectStatus_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const {
    data: row
  } = await supabaseAdmin.from("connected_accounts").select("stripe_account_id, charges_enabled, payouts_enabled, details_submitted, country, default_currency").eq("user_id", userId).eq("environment", data.environment).maybeSingle();
  if (!row) {
    return {
      hasAccount: false,
      stripeAccountId: null,
      chargesEnabled: false,
      payoutsEnabled: false,
      detailsSubmitted: false,
      country: null,
      defaultCurrency: null
    };
  }
  return {
    hasAccount: true,
    stripeAccountId: row.stripe_account_id,
    chargesEnabled: row.charges_enabled,
    payoutsEnabled: row.payouts_enabled,
    detailsSubmitted: row.details_submitted,
    country: row.country,
    defaultCurrency: row.default_currency
  };
});
const startConnectOnboarding_createServerFn_handler = createServerRpc({
  id: "3e83e38bbc054db84ba9d1efceaea35db82e46f021210cf2e0468e7c5e1e5ff3",
  name: "startConnectOnboarding",
  filename: "src/lib/connect.functions.ts"
}, (opts) => startConnectOnboarding.__executeServer(opts));
const startConnectOnboarding = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  stringType().url().parse(data.returnUrl);
  stringType().url().parse(data.refreshUrl);
  return data;
}).handler(startConnectOnboarding_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId,
    claims
  } = context;
  try {
    const stripe = createStripeClient(data.environment);
    const {
      data: existing
    } = await supabaseAdmin.from("connected_accounts").select("stripe_account_id").eq("user_id", userId).eq("environment", data.environment).maybeSingle();
    let accountId = existing?.stripe_account_id ?? null;
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        email: claims.email,
        capabilities: {
          transfers: {
            requested: true
          },
          card_payments: {
            requested: true
          }
        },
        business_type: "individual",
        metadata: {
          userId
        }
      });
      accountId = account.id;
      await upsertConnectedAccount(userId, data.environment, account);
    }
    const link = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: data.refreshUrl,
      return_url: data.returnUrl,
      type: "account_onboarding"
    });
    return {
      url: link.url
    };
  } catch (error) {
    return {
      error: getStripeErrorMessage(error)
    };
  }
});
const refreshConnectStatus_createServerFn_handler = createServerRpc({
  id: "474d578983ab1c023c0aff29e70609f6f99eceb710620548d8898eef36468d86",
  name: "refreshConnectStatus",
  filename: "src/lib/connect.functions.ts"
}, (opts) => refreshConnectStatus.__executeServer(opts));
const refreshConnectStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  return data;
}).handler(refreshConnectStatus_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const {
    data: row
  } = await supabaseAdmin.from("connected_accounts").select("stripe_account_id").eq("user_id", userId).eq("environment", data.environment).maybeSingle();
  if (!row?.stripe_account_id) {
    return {
      hasAccount: false,
      stripeAccountId: null,
      chargesEnabled: false,
      payoutsEnabled: false,
      detailsSubmitted: false,
      country: null,
      defaultCurrency: null
    };
  }
  const stripe = createStripeClient(data.environment);
  const account = await stripe.accounts.retrieve(row.stripe_account_id);
  await upsertConnectedAccount(userId, data.environment, account);
  return {
    hasAccount: true,
    stripeAccountId: account.id,
    chargesEnabled: account.charges_enabled ?? false,
    payoutsEnabled: account.payouts_enabled ?? false,
    detailsSubmitted: account.details_submitted ?? false,
    country: account.country ?? null,
    defaultCurrency: account.default_currency ?? null
  };
});
const getConnectDashboardLink_createServerFn_handler = createServerRpc({
  id: "f393c953f3d6eb61150daee70b202814e7a66a4879b471ca8f8fb34ba59538c9",
  name: "getConnectDashboardLink",
  filename: "src/lib/connect.functions.ts"
}, (opts) => getConnectDashboardLink.__executeServer(opts));
const getConnectDashboardLink = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  return data;
}).handler(getConnectDashboardLink_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const {
    data: row
  } = await supabaseAdmin.from("connected_accounts").select("stripe_account_id").eq("user_id", userId).eq("environment", data.environment).maybeSingle();
  if (!row?.stripe_account_id) return {
    error: "No Connect account yet"
  };
  try {
    const stripe = createStripeClient(data.environment);
    const link = await stripe.accounts.createLoginLink(row.stripe_account_id);
    return {
      url: link.url
    };
  } catch (error) {
    return {
      error: getStripeErrorMessage(error)
    };
  }
});
export {
  getConnectDashboardLink_createServerFn_handler,
  getMyConnectStatus_createServerFn_handler,
  refreshConnectStatus_createServerFn_handler,
  startConnectOnboarding_createServerFn_handler
};
