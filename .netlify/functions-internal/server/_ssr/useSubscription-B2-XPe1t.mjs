import { r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-rhKTeA7I.mjs";
import { g as getStripeEnvironment } from "./stripe-FMfoOcDi.mjs";
import { u as useAuth } from "./AppShell-D17K3a5v.mjs";
const ADMIN_EMAILS = /* @__PURE__ */ new Set(["admin@myalgorhythm.online"]);
function isActive(s) {
  const end = s.current_period_end ? new Date(s.current_period_end).getTime() : Infinity;
  const future = end > Date.now();
  if (["active", "trialing", "past_due"].includes(s.status)) return future;
  if (s.status === "canceled") return future;
  return false;
}
function useProSubscription() {
  const { user } = useAuth();
  const [sub, setSub] = reactExports.useState(null);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!user) {
      setSub(null);
      setIsAdmin(false);
      setLoading(false);
      return;
    }
    let mounted = true;
    const env = getStripeEnvironment();
    const emailAdmin = !!(user.email && ADMIN_EMAILS.has(user.email.trim().toLowerCase()));
    const fetch = async () => {
      const [{ data: subData }, { data: roleData }] = await Promise.all([
        supabase.from("subscriptions").select("*").eq("user_id", user.id).eq("kind", "pro").eq("environment", env).order("created_at", { ascending: false }).limit(1).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle()
      ]);
      if (!mounted) return;
      setSub(subData ?? null);
      setIsAdmin(emailAdmin || !!roleData);
      setLoading(false);
    };
    fetch();
    const ch = supabase.channel(`subs:${user.id}`).on(
      "postgres_changes",
      { event: "*", schema: "public", table: "subscriptions", filter: `user_id=eq.${user.id}` },
      () => fetch()
    ).subscribe();
    return () => {
      mounted = false;
      supabase.removeChannel(ch);
    };
  }, [user]);
  const isPro = isAdmin || (sub ? isActive(sub) : false);
  return { subscription: sub, isPro, isAdmin, loading };
}
function useCreatorSubscription(creatorId) {
  const { user } = useAuth();
  const [sub, setSub] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!user || !creatorId) {
      setSub(null);
      return;
    }
    let mounted = true;
    const env = getStripeEnvironment();
    const fetch = async () => {
      const { data } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).eq("creator_id", creatorId).eq("kind", "creator").eq("environment", env).order("created_at", { ascending: false }).limit(1).maybeSingle();
      if (mounted) setSub(data ?? null);
    };
    fetch();
    const ch = supabase.channel(`csub:${user.id}:${creatorId}`).on(
      "postgres_changes",
      { event: "*", schema: "public", table: "subscriptions", filter: `user_id=eq.${user.id}` },
      () => fetch()
    ).subscribe();
    return () => {
      mounted = false;
      supabase.removeChannel(ch);
    };
  }, [user, creatorId]);
  return { subscription: sub, isSubscribed: sub ? isActive(sub) : false };
}
export {
  useCreatorSubscription as a,
  useProSubscription as u
};
