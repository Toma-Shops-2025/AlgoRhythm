import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BFSxUYhI.mjs";
import { E as EmbeddedCheckoutProvider, a as EmbeddedCheckout } from "../_libs/stripe__react-stripe-js.mjs";
import { a as getStripe } from "./stripe-FMfoOcDi.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BvEa_6le.mjs";
import { c as createServerFn } from "./server-BFmo0EM4.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D56DPoCt.mjs";
import { e as enumType, s as stringType } from "../_libs/zod.mjs";
function StripeEmbeddedCheckoutPanel({
  fetchClientSecret
}) {
  const options = reactExports.useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[480px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmbeddedCheckoutProvider, { stripe: getStripe(), options, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmbeddedCheckout, {}) }) });
}
function CheckoutDialog({
  open,
  onOpenChange,
  title,
  fetchClientSecret
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg max-h-[90vh] overflow-y-auto p-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "px-5 pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-base", children: title }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: fetchClientSecret && /* @__PURE__ */ jsxRuntimeExports.jsx(StripeEmbeddedCheckoutPanel, { fetchClientSecret }) })
  ] }) });
}
const EnvSchema = enumType(["sandbox", "live"]);
const createProCheckout = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  if (!["pro_monthly", "pro_yearly"].includes(data.priceId)) throw new Error("Invalid priceId");
  return data;
}).handler(createSsrRpc("2c7d0bdced14aaf3d713cdaa55d8d188e8094d41f06f62f0d2814b6efe6d2d6f"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  stringType().uuid().parse(data.creatorId);
  return data;
}).handler(createSsrRpc("f137cac7dae3f3158fd3b72c3804770afb9d8de740264e574993aca8ddb5d91f"));
const createTipCheckout = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  stringType().uuid().parse(data.creatorId);
  if (data.postId) stringType().uuid().parse(data.postId);
  if (!Number.isInteger(data.amountCents) || data.amountCents < 100 || data.amountCents > 5e4) {
    throw new Error("Tip must be between $1 and $500");
  }
  return data;
}).handler(createSsrRpc("c5b3db2508472d25963ecf63e6f56b80b4e12505e1086dcdfe58265d795fa3b6"));
const createPortalSession = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => {
  EnvSchema.parse(data.environment);
  return data;
}).handler(createSsrRpc("71c0e3dc0dd52a502c1e4ab660ba8964d3d58e856aa89eb593678cbe7b062d53"));
export {
  CheckoutDialog as C,
  createProCheckout as a,
  createTipCheckout as b,
  createPortalSession as c
};
