import { S as Stripe } from "../_libs/stripe.mjs";
const getEnv = (key) => {
  const value = process.env[key];
  if (!value) throw new Error(`${key} is not configured`);
  return value;
};
function getStripeSecretKey(env) {
  return env === "sandbox" ? getEnv("STRIPE_SECRET_KEY_TEST") : getEnv("STRIPE_SECRET_KEY_LIVE");
}
function getWebhookSecret(env) {
  return env === "sandbox" ? getEnv("PAYMENTS_SANDBOX_WEBHOOK_SECRET") : getEnv("PAYMENTS_LIVE_WEBHOOK_SECRET");
}
function createStripeClient(env) {
  return new Stripe(getStripeSecretKey(env), {
    apiVersion: "2026-03-25.dahlia",
    httpClient: Stripe.createFetchHttpClient()
  });
}
function getStripeErrorMessage(error) {
  if (error && typeof error === "object") {
    const e = error;
    const message = e.raw?.message ?? e.message;
    if (message) return message;
  }
  return "Stripe request failed";
}
const PLATFORM_FEE_BPS = 1500;
function splitPlatformFee(amountCents) {
  const fee = Math.round(amountCents * PLATFORM_FEE_BPS / 1e4);
  return { fee, net: amountCents - fee };
}
export {
  PLATFORM_FEE_BPS as P,
  getWebhookSecret as a,
  createStripeClient as c,
  getStripeErrorMessage as g,
  splitPlatformFee as s
};
