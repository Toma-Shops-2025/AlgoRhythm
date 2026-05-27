import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Public — no auth required. Anonymous listeners count toward retention too.
// Throttled client-side: only called on milestone events (start, complete, loop).
export const recordPlayback = createServerFn({ method: "POST" })
  .inputValidator(
    (input: { postId: string; event: "play" | "complete" | "loop"; listenedMs?: number }) =>
      z
        .object({
          postId: z.string().uuid(),
          event: z.enum(["play", "complete", "loop"]),
          listenedMs: z.number().int().min(0).max(60 * 60 * 1000).optional(),
        })
        .parse(input),
  )
  .handler(async ({ data }) => {
    // Read current values, increment, write back. Cheap and atomic enough for our scale.
    const { data: row } = await supabaseAdmin
      .from("posts")
      .select("play_count, complete_count, loop_count, view_count, total_listen_ms")
      .eq("id", data.postId)
      .maybeSingle();
    if (!row) return { ok: false };
    const update: Record<string, number> = {};
    if (data.event === "play") {
      update.play_count = (row.play_count ?? 0) + 1;
      update.view_count = (row.view_count ?? 0) + 1;
    } else if (data.event === "complete") {
      update.complete_count = (row.complete_count ?? 0) + 1;
    } else if (data.event === "loop") {
      update.loop_count = (row.loop_count ?? 0) + 1;
    }
    if (data.listenedMs && data.listenedMs > 0) {
      update.total_listen_ms = (row.total_listen_ms ?? 0) + data.listenedMs;
    }
    await supabaseAdmin.from("posts").update(update).eq("id", data.postId);
    return { ok: true };
  });