import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironment } from "@/lib/stripe";
import { useAuth } from "@/lib/auth";

const ADMIN_EMAILS = new Set(["admin@myalgorhythm.online"]);

type SubRow = {
  id: string;
  kind: "pro" | "creator";
  creator_id: string | null;
  status: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  stripe_customer_id: string;
};

function isActive(s: SubRow): boolean {
  const end = s.current_period_end ? new Date(s.current_period_end).getTime() : Infinity;
  const future = end > Date.now();
  if (["active", "trialing", "past_due"].includes(s.status)) return future;
  if (s.status === "canceled") return future;
  return false;
}

export function useProSubscription() {
  const { user } = useAuth();
  const [sub, setSub] = useState<SubRow | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .eq("kind", "pro")
          .eq("environment", env)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .maybeSingle(),
      ]);
      if (!mounted) return;
      setSub((subData as SubRow | null) ?? null);
      setIsAdmin(emailAdmin || !!roleData);
      setLoading(false);
    };
    fetch();
    const ch = supabase
      .channel(`subs:${user.id}`)
      .on("postgres_changes",
        { event: "*", schema: "public", table: "subscriptions", filter: `user_id=eq.${user.id}` },
        () => fetch())
      .subscribe();
    return () => { mounted = false; supabase.removeChannel(ch); };
  }, [user]);

  const isPro = isAdmin || (sub ? isActive(sub) : false);
  return { subscription: sub, isPro, isAdmin, loading };
}

export function useCreatorSubscription(creatorId: string | undefined) {
  const { user } = useAuth();
  const [sub, setSub] = useState<SubRow | null>(null);

  useEffect(() => {
    if (!user || !creatorId) { setSub(null); return; }
    let mounted = true;
    const env = getStripeEnvironment();
    const fetch = async () => {
      const { data } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("creator_id", creatorId)
        .eq("kind", "creator")
        .eq("environment", env)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (mounted) setSub((data as SubRow | null) ?? null);
    };
    fetch();
    const ch = supabase
      .channel(`csub:${user.id}:${creatorId}`)
      .on("postgres_changes",
        { event: "*", schema: "public", table: "subscriptions", filter: `user_id=eq.${user.id}` },
        () => fetch())
      .subscribe();
    return () => { mounted = false; supabase.removeChannel(ch); };
  }, [user, creatorId]);

  return { subscription: sub, isSubscribed: sub ? isActive(sub) : false };
}