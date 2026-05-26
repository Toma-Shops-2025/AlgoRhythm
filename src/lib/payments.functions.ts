import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  type StripeEnv,
  createStripeClient,
  getStripeErrorMessage,
  splitPlatformFee,
} from "@/lib/stripe.server";
import Stripe from "stripe";

type CheckoutResult = { clientSecret: string } | { error: string };
type PortalResult = { url: string } | { error: string };

const EnvSchema = z.enum(["sandbox", "live"]);

async function resolveOrCreateCustomer(
  stripe: Stripe,
  options: { email?: string; userId: string },
): Promise<string> {
  if (!/^[a-zA-Z0-9_-]+$/.test(options.userId)) throw new Error("Invalid userId");
  const found = await stripe.customers.search({
    query: `metadata['userId']:'${options.userId}'`,
    limit: 1,
  });
  if (found.data.length) return found.data[0].id;
  if (options.email) {
    const existing = await stripe.customers.list({ email: options.email, limit: 1 });
    if (existing.data.length) {
      const customer = existing.data[0];
      if (customer.metadata?.userId !== options.userId) {
        await stripe.customers.update(customer.id, {
          metadata: { ...customer.metadata, userId: options.userId },
        });
      }
      return customer.id;
    }
  }
  const created = await stripe.customers.create({
    ...(options.email && { email: options.email }),
    metadata: { userId: options.userId },
  });
  return created.id;
}

export const createProCheckout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { priceId: "pro_monthly" | "pro_yearly"; returnUrl: string; environment: StripeEnv }) => {
    EnvSchema.parse(data.environment);
    if (!["pro_monthly", "pro_yearly"].includes(data.priceId)) throw new Error("Invalid priceId");
    return data;
  })
  .handler(async ({ data, context }): Promise<CheckoutResult> => {
    try {
      const stripe = createStripeClient(data.environment);
      const prices = await stripe.prices.list({ lookup_keys: [data.priceId] });
      if (!prices.data.length) throw new Error("Price not found");
      const price = prices.data[0];
      const customerId = await resolveOrCreateCustomer(stripe, {
        userId: context.userId,
        email: context.claims.email,
      });
      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: price.id, quantity: 1 }],
        mode: "subscription",
        ui_mode: "embedded_page",
        return_url: data.returnUrl,
        customer: customerId,
        metadata: { userId: context.userId, kind: "pro" },
        subscription_data: { metadata: { userId: context.userId, kind: "pro" } },
        managed_payments: { enabled: true },
      } as Stripe.Checkout.SessionCreateParams & { managed_payments: { enabled: boolean } });
      return { clientSecret: session.client_secret ?? "" };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });

export const createCreatorSubCheckout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { creatorId: string; returnUrl: string; environment: StripeEnv }) => {
    EnvSchema.parse(data.environment);
    z.string().uuid().parse(data.creatorId);
    return data;
  })
  .handler(async ({ data, context }): Promise<CheckoutResult> => {
    if (data.creatorId === context.userId) {
      return { error: "You can't subscribe to yourself" };
    }
    try {
      const stripe = createStripeClient(data.environment);
      const prices = await stripe.prices.list({ lookup_keys: ["creator_sub_monthly"] });
      if (!prices.data.length) throw new Error("Creator price not found");
      const price = prices.data[0];
      const customerId = await resolveOrCreateCustomer(stripe, {
        userId: context.userId,
        email: context.claims.email,
      });
      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: price.id, quantity: 1 }],
        mode: "subscription",
        ui_mode: "embedded_page",
        return_url: data.returnUrl,
        customer: customerId,
        metadata: { userId: context.userId, kind: "creator", creatorId: data.creatorId },
        subscription_data: {
          metadata: { userId: context.userId, kind: "creator", creatorId: data.creatorId },
        },
        managed_payments: { enabled: true },
      } as Stripe.Checkout.SessionCreateParams & { managed_payments: { enabled: boolean } });
      return { clientSecret: session.client_secret ?? "" };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });

export const createTipCheckout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: {
    creatorId: string;
    amountCents: number;
    postId?: string;
    returnUrl: string;
    environment: StripeEnv;
  }) => {
    EnvSchema.parse(data.environment);
    z.string().uuid().parse(data.creatorId);
    if (data.postId) z.string().uuid().parse(data.postId);
    if (!Number.isInteger(data.amountCents) || data.amountCents < 100 || data.amountCents > 50000) {
      throw new Error("Tip must be between $1 and $500");
    }
    return data;
  })
  .handler(async ({ data, context }): Promise<CheckoutResult> => {
    if (data.creatorId === context.userId) {
      return { error: "You can't tip yourself" };
    }
    try {
      const stripe = createStripeClient(data.environment);
      const customerId = await resolveOrCreateCustomer(stripe, {
        userId: context.userId,
        email: context.claims.email,
      });
      const { fee, net } = splitPlatformFee(data.amountCents);
      const session = await stripe.checkout.sessions.create({
        line_items: [{
          price_data: {
            currency: "usd",
            product_data: { name: "AlgoRhythm tip" },
            unit_amount: data.amountCents,
          },
          quantity: 1,
        }],
        mode: "payment",
        ui_mode: "embedded_page",
        return_url: data.returnUrl,
        customer: customerId,
        payment_intent_data: { description: "AlgoRhythm tip" },
        metadata: {
          userId: context.userId,
          kind: "tip",
          creatorId: data.creatorId,
          postId: data.postId ?? "",
          amountCents: String(data.amountCents),
          feeCents: String(fee),
          netCents: String(net),
        },
        managed_payments: { enabled: true },
      } as Stripe.Checkout.SessionCreateParams & { managed_payments: { enabled: boolean } });
      return { clientSecret: session.client_secret ?? "" };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });

export const createPortalSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { returnUrl: string; environment: StripeEnv }) => {
    EnvSchema.parse(data.environment);
    return data;
  })
  .handler(async ({ data, context }): Promise<PortalResult> => {
    const { supabase, userId } = context;
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .eq("environment", data.environment)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!sub?.stripe_customer_id) return { error: "No subscription found" };
    try {
      const stripe = createStripeClient(data.environment);
      const portal = await stripe.billingPortal.sessions.create({
        customer: sub.stripe_customer_id,
        return_url: data.returnUrl,
      });
      return { url: portal.url };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });