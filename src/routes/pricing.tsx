timport { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { createProCheckout, createPortalSession } from "@/lib/payments.functions";
import { getStripeEnvironment } from "@/lib/stripe";
import { useAuth } from "@/lib/auth";
import { useProSubscription } from "@/hooks/useSubscription";
import { Check, Crown } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "AlgoRhythm Pro — Pricing" },
      { name: "description", content: "Go Pro on AlgoRhythm for ad-free listening, higher quality, and exclusive feeds." },
      { property: "og:title", content: "AlgoRhythm Pro" },
      { property: "og:description", content: "$4.99/mo or $29.99/yr — support the platform and unlock Pro." },
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isPro } = useProSubscription();
  const checkoutFn = useServerFn(createProCheckout);
  const portalFn = useServerFn(createPortalSession);
  const [open, setOpen] = useState(false);
  const [priceId, setPriceId] = useState<"pro_monthly" | "pro_yearly">("pro_yearly");

  const start = (id: "pro_monthly" | "pro_yearly") => {
    if (!user) { navigate({ to: "/login" }); return; }
    setPriceId(id);
    setOpen(true);
  };

  const fetchSecret = open ? async () => {
    const res = await checkoutFn({
      data: {
        priceId,
        environment: getStripeEnvironment(),
        returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      },
    });
    if ("error" in res) throw new Error(res.error);
    return res.clientSecret;
  } : null;

  const manage = async () => {
    const res = await portalFn({
      data: { environment: getStripeEnvironment(), returnUrl: window.location.href },
    });
    if ("error" in res) return toast.error(res.error);
    window.open(res.url, "_blank");
  };

  return (
    <AppShell>
      <PaymentTestModeBanner />
      <div className="mx-auto max-w-md px-5 py-10">
        <div className="text-center">
          <Crown className="mx-auto h-10 w-10 text-gold" />
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">AlgoRhythm Pro</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Support AI creators. Get the full experience.
          </p>
        </div>

        <ul className="mt-8 space-y-3 text-sm">
          {[
            "Ad-free listening",
            "Higher audio quality",
            "Exclusive Pro feeds",
            "Pro badge on your profile",
            "Early access to new features",
          ].map((f) => (
            <li key={f} className="flex items-center gap-3">
              <Check className="h-4 w-4 text-gold" /> {f}
            </li>
          ))}
        </ul>

        {isPro ? (
          <div className="mt-8 rounded-xl border border-gold/40 bg-gold/5 p-5 text-center">
            <p className="text-sm">You're on AlgoRhythm Pro 🎉</p>
            <button onClick={manage} className="mt-3 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.18em]">
              Manage subscription
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-3">
            <button onClick={() => start("pro_yearly")}
              className="rounded-xl bg-gradient-gold px-5 py-4 text-left text-primary-foreground">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold">Yearly</span>
                <span className="text-lg font-bold">$29.99<span className="text-xs font-normal">/yr</span></span>
              </div>
              <div className="text-xs opacity-80">Save 50% — best value</div>
            </button>
            <button onClick={() => start("pro_monthly")}
              className="rounded-xl border border-border px-5 py-4 text-left">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold">Monthly</span>
                <span className="text-lg font-bold">$4.99<span className="text-xs font-normal text-muted-foreground">/mo</span></span>
              </div>
              <div className="text-xs text-muted-foreground">Cancel anytime</div>
            </button>
          </div>
        )}
      </div>

      <CheckoutDialog
        open={open}
        onOpenChange={setOpen}
        title="Go Pro"
        fetchClientSecret={fetchSecret}
      />
    </AppShell>
  );
}
