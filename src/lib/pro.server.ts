import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ADMIN_EMAILS = new Set(["admin@myalgorhythm.online"]);

// Returns true if the user has an active "pro" subscription in any environment,
// or is an admin (role or known admin email). Used to gate AI-powered features.
export async function userIsPro(userId: string, email?: string | null): Promise<boolean> {
  if (email && ADMIN_EMAILS.has(email.trim().toLowerCase())) return true;

  try {
    const { data: isAdmin } = await supabaseAdmin.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (isAdmin) return true;
  } catch {
    // Schema drift on some projects — fall through to direct role / subscription checks.
  }

  try {
    const { data: roleRow } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (roleRow) return true;
  } catch {
    // ignore
  }

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