import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, A as AppShell } from "./AppShell-D17K3a5v.mjs";
import { C as CheckoutDialog, c as createPortalSession, a as createProCheckout } from "./payments.functions-CI6_eqWr.mjs";
import { g as getStripeEnvironment } from "./stripe-FMfoOcDi.mjs";
import { u as useProSubscription } from "./useSubscription-B2-XPe1t.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe.mjs";
import "../_libs/stripe__react-stripe-js.mjs";
import "../_libs/stripe__stripe-js.mjs";
import { C as Crown, a as Check } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "./router-CFClAfxv.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./client-rhKTeA7I.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./client.server-LV8D9vnO.mjs";
import "./createSsrRpc-BvEa_6le.mjs";
import "./server-BFmo0EM4.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./gemini.server-Blu19axI.mjs";
import "../_libs/lovable.dev__email-js.mjs";
import "./stripe.server-B9htgGZ_.mjs";
import "events";
import "http";
import "https";
import "os";
import "./dialog-BFSxUYhI.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./auth-middleware-D56DPoCt.mjs";
import "../_libs/zod.mjs";
import "../_libs/prop-types.mjs";
const clientToken = "pk_live_51TbZFYAGzfh2ib0mkr1qXZUfk37oLthPPcvezCY1MvLWyUPCj6DTZgP0onzn1p1Hu6yvx3yMrtgpttxtHRb6Kz3a00tt3269pY";
function PaymentTestModeBanner() {
  if (!clientToken?.startsWith("pk_test_")) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-amber-500/15 border-b border-amber-500/30 px-4 py-1.5 text-center text-[11px] uppercase tracking-[0.2em] text-amber-200", children: "Test mode — no real charges" });
}
function PricingPage() {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const {
    isPro
  } = useProSubscription();
  const checkoutFn = createProCheckout;
  const portalFn = createPortalSession;
  const [open, setOpen] = reactExports.useState(false);
  const [priceId, setPriceId] = reactExports.useState("pro_yearly");
  const start = (id) => {
    if (!user) {
      navigate({
        to: "/login"
      });
      return;
    }
    setPriceId(id);
    setOpen(true);
  };
  const fetchSecret = open ? async () => {
    const res = await checkoutFn({
      data: {
        priceId,
        environment: getStripeEnvironment(),
        returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`
      }
    });
    if ("error" in res) throw new Error(res.error);
    return res.clientSecret;
  } : null;
  const manage = async () => {
    const res = await portalFn({
      data: {
        environment: getStripeEnvironment(),
        returnUrl: window.location.href
      }
    });
    if ("error" in res) return toast.error(res.error);
    window.open(res.url, "_blank");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentTestModeBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md px-5 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "mx-auto h-10 w-10 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-2xl font-semibold tracking-tight", children: "AlgoRhythm Pro" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Support AI creators. Get the full experience." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 space-y-3 text-sm", children: ["AI title, caption & hashtags", "AI cover art", "AI lyric videos", "Ad-free listening", "Higher audio quality", "Pro badge on your profile"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-gold" }),
        " ",
        f
      ] }, f)) }),
      isPro ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-xl border border-gold/40 bg-gold/5 p-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "You're on AlgoRhythm Pro 🎉" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: manage, className: "mt-3 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.18em]", children: "Manage subscription" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => start("pro_yearly"), className: "rounded-xl bg-gradient-gold px-5 py-4 text-left text-primary-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Yearly" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold", children: [
              "$29.99",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal", children: "/yr" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-80", children: "Save 50% — best value" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => start("pro_monthly"), className: "rounded-xl border border-border px-5 py-4 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Monthly" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold", children: [
              "$6.99",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "/mo" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Cancel anytime" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CheckoutDialog, { open, onOpenChange: setOpen, title: "Go Pro", fetchClientSecret: fetchSecret })
  ] });
}
export {
  PricingPage as component
};
