import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./router-CFClAfxv.mjs";
const logoSrc = "/assets/logo-CIjToI5B.png";
function LogoMark({ className, size = 36 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: logoSrc,
      alt: "AlgoRhythm",
      width: size,
      height: size,
      className: cn("select-none", className),
      draggable: false
    }
  );
}
function Wordmark({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-2", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LogoMark, { size: 28 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl tracking-tight text-gradient-gold", style: { fontFamily: "var(--font-display)" }, children: "AlgoRhythm" })
  ] });
}
function Watermark({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("pointer-events-none flex items-center gap-1.5 opacity-70", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LogoMark, { size: 18 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "text-[11px] uppercase tracking-[0.2em] text-gold",
        style: { fontFamily: "var(--font-sans)" },
        children: "AlgoRhythm"
      }
    )
  ] });
}
export {
  Wordmark as W,
  Watermark as a
};
