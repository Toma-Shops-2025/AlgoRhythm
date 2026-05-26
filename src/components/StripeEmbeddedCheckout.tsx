import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useMemo } from "react";
import { getStripe } from "@/lib/stripe";

export function StripeEmbeddedCheckoutPanel({
  fetchClientSecret,
}: {
  fetchClientSecret: () => Promise<string>;
}) {
  const options = useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);
  return (
    <div className="min-h-[480px]">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}