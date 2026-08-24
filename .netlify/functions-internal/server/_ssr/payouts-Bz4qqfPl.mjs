import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, A as AppShell } from "./AppShell-D17K3a5v.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BvEa_6le.mjs";
import { c as createServerFn } from "./server-BFmo0EM4.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D56DPoCt.mjs";
import { g as getStripeEnvironment } from "./stripe-FMfoOcDi.mjs";
import "../_libs/sonner.mjs";
import "../_libs/stripe.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe__stripe-js.mjs";
import { s as stringType, e as enumType } from "../_libs/zod.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "./router-CFClAfxv.mjs";
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
import "./gemini.server-Blu19axI.mjs";
import "../_libs/lovable.dev__email-js.mjs";
import "./stripe.server-B9htgGZ_.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "events";
import "http";
import "https";
import "os";
import "../_libs/lucide-react.mjs";
const getMyEarnings = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("7d659c8d0ed40ceb74e3ee337c1032660ccbcd0d801f3878b752e129340e30a2"));
const EnvSchema = enumType(["sandbox", "live"]);
const getMyConnectStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  return data;
}).handler(createSsrRpc("dfd5dd01f9f5c3c0b2765ca1345e61ccae56e070c21694f38ca5ac40686d2874"));
const startConnectOnboarding = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  stringType().url().parse(data.returnUrl);
  stringType().url().parse(data.refreshUrl);
  return data;
}).handler(createSsrRpc("3e83e38bbc054db84ba9d1efceaea35db82e46f021210cf2e0468e7c5e1e5ff3"));
const refreshConnectStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  return data;
}).handler(createSsrRpc("474d578983ab1c023c0aff29e70609f6f99eceb710620548d8898eef36468d86"));
const getConnectDashboardLink = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  return data;
}).handler(createSsrRpc("f393c953f3d6eb61150daee70b202814e7a66a4879b471ca8f8fb34ba59538c9"));
function PayoutsPage() {
  const {
    user
  } = useAuth();
  const fetchEarnings = getMyEarnings;
  const fetchStatus = getMyConnectStatus;
  const startOnboard = startConnectOnboarding;
  const refreshStatus = refreshConnectStatus;
  const getDashLink = getConnectDashboardLink;
  const qc = useQueryClient();
  const env = getStripeEnvironment();
  const [busy, setBusy] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const {
    data: earnings
  } = useQuery({
    queryKey: ["my-earnings"],
    queryFn: () => fetchEarnings(),
    enabled: !!user
  });
  const {
    data: status
  } = useQuery({
    queryKey: ["connect-status", env],
    queryFn: () => fetchStatus({
      data: {
        environment: env
      }
    }),
    enabled: !!user
  });
  const onboard = async () => {
    setBusy("onboard");
    setError(null);
    try {
      const returnUrl = `${window.location.origin}/payouts?connect=return`;
      const refreshUrl = `${window.location.origin}/payouts?connect=refresh`;
      const res = await startOnboard({
        data: {
          environment: env,
          returnUrl,
          refreshUrl
        }
      });
      if ("error" in res) {
        setError(res.error);
        return;
      }
      window.location.href = res.url;
    } finally {
      setBusy(null);
    }
  };
  const refresh = async () => {
    setBusy("refresh");
    setError(null);
    try {
      await refreshStatus({
        data: {
          environment: env
        }
      });
      await qc.invalidateQueries({
        queryKey: ["connect-status", env]
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to refresh");
    } finally {
      setBusy(null);
    }
  };
  const openDash = async () => {
    setBusy("dash");
    setError(null);
    try {
      const res = await getDashLink({
        data: {
          environment: env
        }
      });
      if ("error" in res) {
        setError(res.error);
        return;
      }
      window.open(res.url, "_blank", "noopener,noreferrer");
    } finally {
      setBusy(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mx-auto max-w-2xl px-5 pt-6 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl tracking-tight text-gradient-gold", children: "Creator Payouts & Fees" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Last updated: May 30, 2026" }),
    user && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-xl border border-gold/30 bg-gold/5 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-gold", children: "Your earnings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-2 gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Tip balance", value: fmt(earnings?.totalBalanceCents ?? 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Lifetime tips", value: String(earnings?.tipCount ?? 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Active subscribers", value: String(earnings?.activeSubCount ?? 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Est. monthly sub net", value: fmt(earnings?.estMonthlySubNetCents ?? 0) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-lg border border-border/60 bg-background/40 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Payout account" }),
        !status?.hasAccount && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-foreground/80", children: "Set up your payout account to start receiving tips and subscriber payments directly to your bank." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onboard, disabled: busy === "onboard", className: "mt-3 w-full rounded-md bg-gradient-gold py-2 text-sm font-medium text-primary-foreground disabled:opacity-50", children: busy === "onboard" ? "Opening secure onboarding…" : "Set up payouts" })
        ] }),
        status?.hasAccount && status.chargesEnabled && status.payoutsEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-emerald-400", children: "✓ Active — tips and subscriber payments are being sent to your account." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: openDash, disabled: busy === "dash", className: "flex-1 rounded-md border border-gold/40 py-2 text-sm text-gold disabled:opacity-50", children: busy === "dash" ? "Opening…" : "Open payout dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: refresh, disabled: busy === "refresh", className: "rounded-md border border-border px-3 py-2 text-sm disabled:opacity-50", children: busy === "refresh" ? "…" : "Refresh" })
          ] })
        ] }),
        status?.hasAccount && !(status.chargesEnabled && status.payoutsEnabled) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-amber-400", children: [
            "Onboarding in progress. ",
            status.detailsSubmitted ? "Stripe is reviewing your details — this usually takes a few minutes." : "You haven't finished entering your details yet."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onboard, disabled: busy === "onboard", className: "flex-1 rounded-md bg-gradient-gold py-2 text-sm font-medium text-primary-foreground disabled:opacity-50", children: busy === "onboard" ? "Opening…" : "Continue onboarding" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: refresh, disabled: busy === "refresh", className: "rounded-md border border-border px-3 py-2 text-sm disabled:opacity-50", children: busy === "refresh" ? "…" : "Refresh" })
          ] })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[11px] text-rose-400", children: error })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "How creators earn", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tips" }),
        " — one-time payments from fans, $1–$500 per tip."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Creator subscriptions" }),
        " — recurring $4.99/month from fans for ongoing support."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Platform fee", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "AlgoRhythm takes a flat ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "15% platform fee" }),
        " on tips and creator subscriptions. The remaining 85% is your gross earnings — payment processing fees (typically 2.9% + $0.30 per transaction) are deducted by our payment processor before payout."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Example: a $10 tip → $8.50 after AlgoRhythm fee → ~$7.91 after processing fees lands in your payout account." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Payout schedule", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "Earnings are held by our payment processor until your account meets the minimum payout threshold (currently ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "$10" }),
        ")."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "Payouts run on a ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "weekly" }),
        " schedule."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "New creator accounts have a 7-day initial holding period for fraud review." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Eligibility", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To receive payouts you must:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Be at least ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "18 years old" }),
          " (or the age of majority in your country)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Reside in a country supported by our payment processor." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Complete payout onboarding (identity verification, bank or card account, tax info)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Not be on any sanctions list (OFAC, EU, UN)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Comply with our ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/guidelines", className: "text-gold", children: "Community Guidelines" }),
          " and ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "text-gold", children: "Terms" }),
          "."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Taxes", children: [
      "You are responsible for reporting and paying taxes on your AlgoRhythm earnings in your jurisdiction. For US creators, we (or our payment processor) will issue a ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "1099-K" }),
      " if your earnings exceed the IRS reporting threshold for the year."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Refunds & chargebacks", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "If a tip or subscription is refunded or charged back, the corresponding amount is deducted from your future earnings." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Excessive chargebacks (over 1% of your volume) may trigger account review." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Account termination", children: "If your account is terminated for violating our policies, you forfeit any earnings not yet paid out. We will not knowingly enrich bad-faith actors." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-xs text-muted-foreground", children: [
      "See also: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "text-gold", children: "Terms" }),
      " · ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/refunds", className: "text-gold", children: "Refunds" }),
      " · ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "text-gold", children: "Contact" })
    ] })
  ] }) });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 text-sm text-foreground/90 space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium text-gold", children: title }),
    children
  ] });
}
function Stat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border/60 bg-background/40 px-3 py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base text-foreground", children: value })
  ] });
}
function fmt(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
export {
  PayoutsPage as component
};
