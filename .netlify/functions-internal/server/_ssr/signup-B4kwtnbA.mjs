import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-rhKTeA7I.mjs";
import { l as lovable } from "./index-Dfy5hOj8.mjs";
import { W as Wordmark } from "./Logo-BGOt1dsf.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/lovable.dev__cloud-auth-js.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./router-CFClAfxv.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [displayName, setDisplayName] = reactExports.useState("");
  const [birthYear, setBirthYear] = reactExports.useState("");
  const [agreed, setAgreed] = reactExports.useState(false);
  const [ageConfirmed, setAgeConfirmed] = reactExports.useState(false);
  const [copyrightConfirmed, setCopyrightConfirmed] = reactExports.useState(false);
  const [marketingOptIn, setMarketingOptIn] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const onEmail = async (e) => {
    e.preventDefault();
    const yr = parseInt(birthYear, 10);
    const thisYear = (/* @__PURE__ */ new Date()).getFullYear();
    if (!yr || yr < 1900 || yr > thisYear) return toast.error("Enter a valid birth year");
    if (thisYear - yr < 13) return toast.error("You must be at least 13 years old to sign up");
    if (!ageConfirmed) return toast.error("Please confirm you meet the minimum age requirement");
    if (!agreed) return toast.error("Please accept the Terms, Privacy Policy, and Community Guidelines");
    if (!copyrightConfirmed) return toast.error("Please confirm you'll only post content you have rights to");
    setLoading(true);
    const {
      data: authData,
      error
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + "/",
        data: {
          display_name: displayName,
          birth_year: yr,
          terms_accepted_at: (/* @__PURE__ */ new Date()).toISOString(),
          marketing_opt_in: marketingOptIn
        }
      }
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    const {
      error: signInError
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (signInError) {
      toast.success("Account created!", {
        description: "Please sign in with your new credentials."
      });
      navigate({
        to: "/login"
      });
    } else {
      toast.success("Welcome to AlgoRhythm");
      navigate({
        to: "/"
      });
    }
  };
  const onGoogle = async () => {
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/"
    });
    if (res?.error) toast.error(res.error.message ?? "Google sign-in failed");
    else if (!res?.redirected) navigate({
      to: "/"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "px-5 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wordmark, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto mt-10 max-w-sm px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl tracking-tight text-gradient-gold", children: "Create your profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Start posting AI tracks and videos to a viral, gold-tinged feed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onGoogle, className: "mt-6 w-full rounded-md border border-border bg-card px-4 py-3 text-sm hover:border-gold/40", children: "Continue with Google" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" }),
        " or ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: onEmail, className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, placeholder: "Display name", value: displayName, onChange: (e) => setDisplayName(e.target.value), className: "w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, minLength: 8, placeholder: "Password (8+ chars)", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", required: true, min: "1900", max: (/* @__PURE__ */ new Date()).getFullYear(), placeholder: "Birth year (e.g. 1995)", value: birthYear, onChange: (e) => setBirthYear(e.target.value), className: "w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-md border border-gold/20 bg-card/30 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: ageConfirmed, onChange: (e) => setAgeConfirmed(e.target.checked), className: "mt-0.5 accent-[var(--gold)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "I confirm I'm at least 13 years old (or the minimum age in my country)." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: agreed, onChange: (e) => setAgreed(e.target.checked), className: "mt-0.5 accent-[var(--gold)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "I agree to the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "text-gold", children: "Terms" }),
              ",",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacy", className: "text-gold", children: "Privacy Policy" }),
              ", and",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/guidelines", className: "text-gold", children: "Community Guidelines" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: copyrightConfirmed, onChange: (e) => setCopyrightConfirmed(e.target.checked), className: "mt-0.5 accent-[var(--gold)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "I'll only upload music and content I own or have permission to share, per our",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dmca", className: "text-gold", children: "DMCA / Copyright Policy" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: marketingOptIn, onChange: (e) => setMarketingOptIn(e.target.checked), className: "mt-0.5 accent-[var(--gold)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "(Optional) Send me product updates and creator tips by email. I can unsubscribe anytime." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: loading, type: "submit", className: "w-full rounded-md bg-gradient-gold px-4 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_24px_-6px_var(--gold)] disabled:opacity-50", children: "Create account" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-center text-xs text-muted-foreground", children: [
        "Have an account? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-gold", children: "Sign in" })
      ] })
    ] })
  ] });
}
export {
  SignupPage as component
};
