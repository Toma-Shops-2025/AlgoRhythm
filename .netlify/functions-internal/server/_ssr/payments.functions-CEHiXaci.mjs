import { c as createServerRpc } from "./createServerRpc-Cyzl_R9r.mjs";
import { c as createServerFn } from "./server-BFmo0EM4.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D56DPoCt.mjs";
import { c as createStripeClient, g as getStripeErrorMessage, P as PLATFORM_FEE_BPS, s as splitPlatformFee } from "./stripe.server-B9htgGZ_.mjs";
import { s as supabaseAdmin } from "./client.server-LV8D9vnO.mjs";
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
const PRO_AMOUNTS = {
  pro_monthly: 699,
  pro_yearly: 2999
};
async function ensureProPrice(stripe, lookupKey) {
  const want = PRO_AMOUNTS[lookupKey];
  const listed = await stripe.prices.list({
    lookup_keys: [lookupKey],
    active: true
  });
  const existing = listed.data[0];
  if (existing?.unit_amount === want) return existing.id;
  let productId = typeof existing?.product === "string" ? existing.product : existing && typeof existing.product === "object" && existing.product && "id" in existing.product ? existing.product.id : void 0;
  if (!productId) {
    const found = await stripe.products.search({
      query: "name:'AlgoRhythm Pro' AND active:'true'",
      limit: 1
    });
    productId = found.data[0]?.id;
  }
  if (!productId) {
    productId = (await stripe.products.create({
      name: "AlgoRhythm Pro"
    })).id;
  }
  const created = await stripe.prices.create({
    product: productId,
    currency: "usd",
    unit_amount: want,
    recurring: {
      interval: lookupKey === "pro_yearly" ? "year" : "month"
    },
    lookup_key: lookupKey,
    transfer_lookup_key: true
  });
  return created.id;
}
async function getCreatorPayoutAccount(creatorId, env) {
  const {
    data
  } = await supabaseAdmin.from("connected_accounts").select("stripe_account_id, charges_enabled").eq("user_id", creatorId).eq("environment", env).maybeSingle();
  if (!data?.stripe_account_id) {
    return {
      error: "This creator hasn't set up payouts yet. Ask them to complete payout onboarding."
    };
  }
  if (!data.charges_enabled) {
    return {
      error: "This creator's payout account isn't fully active yet. Try again once they finish onboarding."
    };
  }
  return {
    stripeAccountId: data.stripe_account_id
  };
}
async function resolveOrCreateCustomer(stripe, options) {
  if (!/^[a-zA-Z0-9_-]+$/.test(options.userId)) throw new Error("Invalid userId");
  const found = await stripe.customers.search({
    query: `metadata['userId']:'${options.userId}'`,
    limit: 1
  });
  if (found.data.length) return found.data[0].id;
  if (options.email) {
    const existing = await stripe.customers.list({
      email: options.email,
      limit: 1
    });
    if (existing.data.length) {
      const customer = existing.data[0];
      if (customer.metadata?.userId !== options.userId) {
        await stripe.customers.update(customer.id, {
          metadata: {
            ...customer.metadata,
            userId: options.userId
          }
        });
      }
      return customer.id;
    }
  }
  const created = await stripe.customers.create({
    ...options.email && {
      email: options.email
    },
    metadata: {
      userId: options.userId
    }
  });
  return created.id;
}
const createProCheckout_createServerFn_handler = createServerRpc({
  id: "2c7d0bdced14aaf3d713cdaa55d8d188e8094d41f06f62f0d2814b6efe6d2d6f",
  name: "createProCheckout",
  filename: "src/lib/payments.functions.ts"
}, (opts) => createProCheckout.__executeServer(opts));
const createProCheckout = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  if (!["pro_monthly", "pro_yearly"].includes(data.priceId)) throw new Error("Invalid priceId");
  return data;
}).handler(createProCheckout_createServerFn_handler, async ({
  data,
  context
}) => {
  try {
    const stripe = createStripeClient(data.environment);
    const priceId = await ensureProPrice(stripe, data.priceId);
    const customerId = await resolveOrCreateCustomer(stripe, {
      userId: context.userId,
      email: context.claims.email
    });
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      mode: "subscription",
      ui_mode: "embedded_page",
      return_url: data.returnUrl,
      customer: customerId,
      metadata: {
        userId: context.userId,
        kind: "pro"
      },
      subscription_data: {
        metadata: {
          userId: context.userId,
          kind: "pro"
        }
      }
    });
    return {
      clientSecret: session.client_secret ?? ""
    };
  } catch (error) {
    return {
      error: getStripeErrorMessage(error)
    };
  }
});
const createCreatorSubCheckout_createServerFn_handler = createServerRpc({
  id: "f137cac7dae3f3158fd3b72c3804770afb9d8de740264e574993aca8ddb5d91f",
  name: "createCreatorSubCheckout",
  filename: "src/lib/payments.functions.ts"
}, (opts) => createCreatorSubCheckout.__executeServer(opts));
const createCreatorSubCheckout = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  stringType().uuid().parse(data.creatorId);
  return data;
}).handler(createCreatorSubCheckout_createServerFn_handler, async ({
  data,
  context
}) => {
  if (data.creatorId === context.userId) {
    return {
      error: "You can't subscribe to yourself"
    };
  }
  try {
    const stripe = createStripeClient(data.environment);
    const payout = await getCreatorPayoutAccount(data.creatorId, data.environment);
    if ("error" in payout) return payout;
    const prices = await stripe.prices.list({
      lookup_keys: ["creator_sub_monthly"]
    });
    if (!prices.data.length) throw new Error("Creator price not found");
    const price = prices.data[0];
    const customerId = await resolveOrCreateCustomer(stripe, {
      userId: context.userId,
      email: context.claims.email
    });
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price: price.id,
        quantity: 1
      }],
      mode: "subscription",
      ui_mode: "embedded_page",
      return_url: data.returnUrl,
      customer: customerId,
      metadata: {
        userId: context.userId,
        kind: "creator",
        creatorId: data.creatorId
      },
      subscription_data: {
        metadata: {
          userId: context.userId,
          kind: "creator",
          creatorId: data.creatorId
        },
        application_fee_percent: PLATFORM_FEE_BPS / 100,
        transfer_data: {
          destination: payout.stripeAccountId
        }
      }
    });
    return {
      clientSecret: session.client_secret ?? ""
    };
  } catch (error) {
    return {
      error: getStripeErrorMessage(error)
    };
  }
});
const createTipCheckout_createServerFn_handler = createServerRpc({
  id: "c5b3db2508472d25963ecf63e6f56b80b4e12505e1086dcdfe58265d795fa3b6",
  name: "createTipCheckout",
  filename: "src/lib/payments.functions.ts"
}, (opts) => createTipCheckout.__executeServer(opts));
const createTipCheckout = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  stringType().uuid().parse(data.creatorId);
  if (data.postId) stringType().uuid().parse(data.postId);
  if (!Number.isInteger(data.amountCents) || data.amountCents < 100 || data.amountCents > 5e4) {
    throw new Error("Tip must be between $1 and $500");
  }
  return data;
}).handler(createTipCheckout_createServerFn_handler, async ({
  data,
  context
}) => {
  if (data.creatorId === context.userId) {
    return {
      error: "You can't tip yourself"
    };
  }
  try {
    const stripe = createStripeClient(data.environment);
    const payout = await getCreatorPayoutAccount(data.creatorId, data.environment);
    if ("error" in payout) return payout;
    const customerId = await resolveOrCreateCustomer(stripe, {
      userId: context.userId,
      email: context.claims.email
    });
    const {
      fee,
      net
    } = splitPlatformFee(data.amountCents);
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: "AlgoRhythm tip"
          },
          unit_amount: data.amountCents
        },
        quantity: 1
      }],
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: data.returnUrl,
      customer: customerId,
      payment_intent_data: {
        description: "AlgoRhythm tip",
        application_fee_amount: fee,
        transfer_data: {
          destination: payout.stripeAccountId
        }
      },
      metadata: {
        userId: context.userId,
        kind: "tip",
        creatorId: data.creatorId,
        postId: data.postId ?? "",
        amountCents: String(data.amountCents),
        feeCents: String(fee),
        netCents: String(net)
      }
    });
    return {
      clientSecret: session.client_secret ?? ""
    };
  } catch (error) {
    return {
      error: getStripeErrorMessage(error)
    };
  }
});
const createPortalSession_createServerFn_handler = createServerRpc({
  id: "71c0e3dc0dd52a502c1e4ab660ba8964d3d58e856aa89eb593678cbe7b062d53",
  name: "createPortalSession",
  filename: "src/lib/payments.functions.ts"
}, (opts) => createPortalSession.__executeServer(opts));
const createPortalSession = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  return data;
}).handler(createPortalSession_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: sub
  } = await supabase.from("subscriptions").select("stripe_customer_id").eq("user_id", userId).eq("environment", data.environment).order("created_at", {
    ascending: false
  }).limit(1).maybeSingle();
  if (!sub?.stripe_customer_id) return {
    error: "No subscription found"
  };
  try {
    const stripe = createStripeClient(data.environment);
    const portal = await stripe.billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      return_url: data.returnUrl
    });
    return {
      url: portal.url
    };
  } catch (error) {
    return {
      error: getStripeErrorMessage(error)
    };
  }
});
export {
  createCreatorSubCheckout_createServerFn_handler,
  createPortalSession_createServerFn_handler,
  createProCheckout_createServerFn_handler,
  createTipCheckout_createServerFn_handler
};
