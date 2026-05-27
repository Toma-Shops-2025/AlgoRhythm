import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Returns true if the user has an active "pro" subscription in any environment.
// Used to gate AI-powered features (cover art, metadata, scenes, lyrics) so
// only paying creators consume Lovable AI credits.
export async function userIsPro(userId: string): Promise<boolean> {
  const { data } = await supabaseAdmin
    .from("subscriptions")
    .select("status, current_period_end")
    .eq("user_id", userId)
    .eq("kind", "pro")
    .order("created_at", { ascending: false })
    .limit(5);
  if (!data || data.length === 0) return false;
  const now = Date.now();
  return data.some((s) => {
    const end = s.current_period_end ? new Date(s.current_period_end).getTime() : Infinity;
    const future = end > now;
    if (["active", "trialing", "past_due"].includes(s.status)) return future;
    if (s.status === "canceled") return future;
    return false;
  });
}

export class ProRequiredError extends Error {
  constructor() {
    super("AI features are a Pro perk. Upgrade to Pro to use AI cover art, captions, lyric videos, and scene generation.");
    this.name = "ProRequiredError";
  }
}