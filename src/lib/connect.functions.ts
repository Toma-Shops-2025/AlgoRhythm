import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import {
  type StripeEnv,
  createStripeClient,
  getStripeErrorMessage,
} from "@/lib/stripe.server";
import type Stripe from "stripe";

const EnvSchema = z.enum(["sandbox", "live"]);

export type ConnectStatus = {
  hasAccount: boolean;
  stripeAccountId: string | null;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  detailsSubmitted: boolean;
  country: string | null;
  defaultCurrency: string | null;
};

async function upsertConnectedAccount(
  userId: string,
  env: StripeEnv,
  account: Stripe.Account,
) {
  await supabaseAdmin.from("connected_accounts").upsert(
    {
      user_id: userId,
      environment: env,
      stripe_account_id: account.id,
      charges_enabled: account.charges_enabled ?? false,
      payouts_enabled: account.payouts_enabled ?? false,
      details_submitted: account.details_submitted ?? false,
      country: account.country ?? null,
      default_currency: account.default_currency ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,environment" },
  );
}

export const getMyConnectStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { environment: StripeEnv }) => {
    EnvSchema.parse(data.environment);
    return data;
  })
  .handler(async ({ data, context }): Promise<ConnectStatus> => {
    const { userId } = context;
    const { data: row } = await supabaseAdmin
      .from("connected_accounts")
      .select("stripe_account_id, charges_enabled, payouts_enabled, details_submitted, country, default_currency")
      .eq("user_id", userId)
      .eq("environment", data.environment)
      .maybeSingle();

    if (!row) {
      return {
        hasAccount: false,
        stripeAccountId: null,
        chargesEnabled: false,
        payoutsEnabled: false,
        detailsSubmitted: false,
        country: null,
        defaultCurrency: null,
      };
    }
    return {
      hasAccount: true,
      stripeAccountId: row.stripe_account_id,
      chargesEnabled: row.charges_enabled,
      payoutsEnabled: row.payouts_enabled,
      detailsSubmitted: row.details_submitted,
      country: row.country,
      defaultCurrency: row.default_currency,
    };
  });

export const startConnectOnboarding = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { environment: StripeEnv; returnUrl: string; refreshUrl: string }) => {
    EnvSchema.parse(data.environment);
    z.string().url().parse(data.returnUrl);
    z.string().url().parse(data.refreshUrl);
    return data;
  })
  .handler(async ({ data, context }): Promise<{ url: string } | { error: string }> => {
    const { userId, claims } = context;
    try {
      const stripe = createStripeClient(data.environment);

      const { data: existing } = await supabaseAdmin
        .from("connected_accounts")
        .select("stripe_account_id")
        .eq("user_id", userId)
        .eq("environment", data.environment)
        .maybeSingle();

      let accountId = existing?.stripe_account_id ?? null;

      if (!accountId) {
        const account = await stripe.accounts.create({
          type: "express",
          email: claims.email,
          capabilities: {
            transfers: { requested: true },
            card_payments: { requested: true },
          },
          business_type: "individual",
          metadata: { userId },
        });
        accountId = account.id;
        await upsertConnectedAccount(userId, data.environment, account);
      }

      const link = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: data.refreshUrl,
        return_url: data.returnUrl,
        type: "account_onboarding",
      });

      return { url: link.url };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });

export const refreshConnectStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { environment: StripeEnv }) => {
    EnvSchema.parse(data.environment);
    return data;
  })
  .handler(async ({ data, context }): Promise<ConnectStatus> => {
    const { userId } = context;
    const { data: row } = await supabaseAdmin
      .from("connected_accounts")
      .select("stripe_account_id")
      .eq("user_id", userId)
      .eq("environment", data.environment)
      .maybeSingle();
    if (!row?.stripe_account_id) {
      return {
        hasAccount: false,
        stripeAccountId: null,
        chargesEnabled: false,
        payoutsEnabled: false,
        detailsSubmitted: false,
        country: null,
        defaultCurrency: null,
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
      defaultCurrency: account.default_currency ?? null,
    };
  });

export const getConnectDashboardLink = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { environment: StripeEnv }) => {
    EnvSchema.parse(data.environment);
    return data;
  })
  .handler(async ({ data, context }): Promise<{ url: string } | { error: string }> => {
    const { userId } = context;
    const { data: row } = await supabaseAdmin
      .from("connected_accounts")
      .select("stripe_account_id")
      .eq("user_id", userId)
      .eq("environment", data.environment)
      .maybeSingle();
    if (!row?.stripe_account_id) return { error: "No Connect account yet" };
    try {
      const stripe = createStripeClient(data.environment);
      const link = await stripe.accounts.createLoginLink(row.stripe_account_id);
      return { url: link.url };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });