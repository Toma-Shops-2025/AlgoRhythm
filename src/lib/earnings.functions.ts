import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type EarningsSummary = {
  tipCount: number;
  tipGrossCents: number;
  tipNetCents: number;
  activeSubCount: number;
  estMonthlySubNetCents: number;
  totalBalanceCents: number;
  recentTips: Array<{
    id: string;
    amountCents: number;
    netCents: number;
    createdAt: string;
    environment: string;
  }>;
};

// Creator subscriptions are $4.99/mo; platform keeps 15%.
const CREATOR_SUB_GROSS_CENTS = 499;
const CREATOR_NET_BPS = 8500;

export const getMyEarnings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<EarningsSummary> => {
    const { supabase, userId } = context;

    const { data: tips } = await supabase
      .from("tips")
      .select("id, amount_cents, creator_net_cents, created_at, environment, status")
      .eq("to_user", userId)
      .eq("status", "succeeded")
      .order("created_at", { ascending: false })
      .limit(500);

    const tipRows = tips ?? [];
    const tipGrossCents = tipRows.reduce((s, t) => s + (t.amount_cents ?? 0), 0);
    const tipNetCents = tipRows.reduce((s, t) => s + (t.creator_net_cents ?? 0), 0);

    const { data: subs } = await supabase
      .from("subscriptions")
      .select("status, current_period_end")
      .eq("creator_id", userId)
      .eq("kind", "creator");

    const now = Date.now();
    const activeSubs = (subs ?? []).filter((s) => {
      if (!["active", "trialing", "past_due"].includes(s.status)) return false;
      const end = s.current_period_end ? new Date(s.current_period_end).getTime() : Infinity;
      return end > now;
    });
    const activeSubCount = activeSubs.length;
    const estMonthlySubNetCents = Math.round(
      activeSubCount * CREATOR_SUB_GROSS_CENTS * (CREATOR_NET_BPS / 10000),
    );

    return {
      tipCount: tipRows.length,
      tipGrossCents,
      tipNetCents,
      activeSubCount,
      estMonthlySubNetCents,
      totalBalanceCents: tipNetCents, // subs not paid out yet
      recentTips: tipRows.slice(0, 10).map((t) => ({
        id: t.id,
        amountCents: t.amount_cents ?? 0,
        netCents: t.creator_net_cents ?? 0,
        createdAt: t.created_at,
        environment: t.environment,
      })),
    };
  });