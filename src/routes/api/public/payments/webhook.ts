import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import {
  type StripeEnv,
  createStripeClient,
  getWebhookSecret,
} from "@/lib/stripe.server";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const envParam = url.searchParams.get("env");
        if (envParam !== "sandbox" && envParam !== "live") {
          return new Response("Invalid env", { status: 400 });
        }
        const env: StripeEnv = envParam;

        const signature = request.headers.get("stripe-signature");
        if (!signature) return new Response("Missing signature", { status: 400 });

        const body = await request.text();
        const stripe = createStripeClient(env);
        const secret = getWebhookSecret(env);

        let event: Stripe.Event;
        try {
          event = await stripe.webhooks.constructEventAsync(body, signature, secret);
        } catch (err) {
          console.error("Webhook signature failed", err);
          return new Response("Invalid signature", { status: 401 });
        }

        // Idempotency
        const { error: dupError } = await supabaseAdmin
          .from("processed_stripe_events")
          .insert({ event_id: event.id, type: event.type, environment: env });
        if (dupError) {
          // duplicate -> already processed
          if ((dupError as { code?: string }).code === "23505") {
            return new Response("ok", { status: 200 });
          }
          console.error("event log insert failed", dupError);
        }

        try {
          await handleEvent(event, env, stripe);
        } catch (err) {
          console.error("Webhook handler error", err);
          return new Response("Handler error", { status: 500 });
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});

async function handleEvent(event: Stripe.Event, env: StripeEnv, stripe: Stripe) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const kind = session.metadata?.kind;
      if (kind === "tip") await recordTip(session, env);
      // subscription rows are managed by customer.subscription.* events
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await upsertSubscription(sub, env);
      break;
    }
    default:
      break;
  }
}

async function recordTip(session: Stripe.Checkout.Session, env: StripeEnv) {
  const md = session.metadata ?? {};
  const fromUser = md.userId;
  const toUser = md.creatorId;
  const amount = Number(md.amountCents ?? session.amount_total ?? 0);
  const fee = Number(md.feeCents ?? 0);
  const net = Number(md.netCents ?? amount - fee);
  const postId = md.postId || null;
  if (!fromUser || !toUser || !amount) return;

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  await supabaseAdmin
    .from("tips")
    .upsert(
      {
        from_user: fromUser,
        to_user: toUser,
        post_id: postId,
        amount_cents: amount,
        currency: session.currency ?? "usd",
        status: "succeeded",
        environment: env,
        platform_fee_cents: fee,
        creator_net_cents: net,
        stripe_checkout_session_id: session.id,
        stripe_payment_intent_id: paymentIntentId,
      },
      { onConflict: "stripe_checkout_session_id" },
    );
}

async function upsertSubscription(sub: Stripe.Subscription, env: StripeEnv) {
  const md = sub.metadata ?? {};
  const userId = md.userId;
  const kind = md.kind === "creator" ? "creator" : "pro";
  const creatorId = md.creatorId || null;
  if (!userId) return;

  const item = sub.items.data[0];
  const priceLookupKey = item?.price?.lookup_key ?? item?.price?.id ?? "";

  // Get period end from item (dahlia moved it onto items)
  const periodEndUnix = (item as unknown as { current_period_end?: number })?.current_period_end
    ?? (sub as unknown as { current_period_end?: number }).current_period_end
    ?? null;

  const customerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer.id;

  await supabaseAdmin.from("subscriptions").upsert(
    {
      user_id: userId,
      kind,
      creator_id: creatorId,
      stripe_customer_id: customerId,
      stripe_subscription_id: sub.id,
      price_id: priceLookupKey,
      status: sub.status,
      current_period_end: periodEndUnix ? new Date(periodEndUnix * 1000).toISOString() : null,
      cancel_at_period_end: sub.cancel_at_period_end ?? false,
      environment: env,
    },
    { onConflict: "stripe_subscription_id" },
  );
}