import Stripe from 'stripe';

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`${key} is not configured`);
  return value;
};

export type StripeEnv = 'sandbox' | 'live';

export function getStripeSecretKey(env: StripeEnv): string {
  return env === 'sandbox'
    ? getEnv('STRIPE_SECRET_KEY_TEST')
    : getEnv('STRIPE_SECRET_KEY_LIVE');
}

export function getWebhookSecret(env: StripeEnv): string {
  return env === 'sandbox'
    ? getEnv('PAYMENTS_SANDBOX_WEBHOOK_SECRET')
    : getEnv('PAYMENTS_LIVE_WEBHOOK_SECRET');
}

export function createStripeClient(env: StripeEnv): Stripe {
  return new Stripe(getStripeSecretKey(env), {
    apiVersion: '2026-03-25.dahlia',
    httpClient: Stripe.createFetchHttpClient(),
  });
}

export function getStripeErrorMessage(error: unknown): string {
  if (error && typeof error === 'object') {
    const e = error as { message?: string; raw?: { message?: string } };
    const message = e.raw?.message ?? e.message;
    if (message) return message;
  }
  return 'Stripe request failed';
}

// AlgoRhythm platform takes 15% of tips and creator subscriptions.
export const PLATFORM_FEE_BPS = 1500; // 15%

export function splitPlatformFee(amountCents: number): { fee: number; net: number } {
  const fee = Math.round((amountCents * PLATFORM_FEE_BPS) / 10000);
  return { fee, net: amountCents - fee };
}