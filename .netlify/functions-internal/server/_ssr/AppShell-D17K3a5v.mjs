import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as cn } from "./router-CFClAfxv.mjs";
import { s as supabase } from "./client-rhKTeA7I.mjs";
import { H as House, h as Search, g as Plus, U as User } from "../_libs/lucide-react.mjs";
function useAuth() {
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, sess) => setSession(sess)
    );
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);
  return { user: session?.user ?? null, session, loading };
}
async function signOut() {
  await supabase.auth.signOut();
}
const items = [
  { to: "/", label: "Feed", icon: House },
  { to: "/discover", label: "Discover", icon: Search },
  { to: "/upload", label: "Post", icon: Plus, primary: true, authed: true },
  { to: "/me", label: "Me", icon: User, authed: true }
];
function AppShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-dvh text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative z-10 pb-20", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {})
  ] });
}
function BottomNav() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const { user } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/85 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mx-auto grid max-w-md grid-cols-4 px-2 pb-[env(safe-area-inset-bottom)]", children: items.map(({ to, label, icon: Icon, primary, authed }) => {
    const target = authed && !user ? "/login" : to;
    const active = pathname === to;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: target,
        className: cn(
          "flex flex-1 flex-col items-center justify-center gap-1 py-3 text-[10px] uppercase tracking-[0.18em] transition-colors",
          active ? "text-gold" : "text-muted-foreground hover:text-foreground"
        ),
        children: [
          primary ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-md bg-gradient-gold text-primary-foreground shadow-[0_0_24px_-4px_var(--gold)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
        ]
      }
    ) }, to);
  }) }) });
}
export {
  AppShell as A,
  signOut as s,
  useAuth as u
};
