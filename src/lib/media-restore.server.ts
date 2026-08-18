import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BUCKETS = ["avatars", "media", "covers"] as const;

export async function restoreAlgoRhythmPlayback() {
  const created: string[] = [];
  const existing: string[] = [];

  for (const id of BUCKETS) {
    const { data: bucket } = await supabaseAdmin.storage.getBucket(id);
    if (bucket) {
      existing.push(id);
      continue;
    }
    const { error } = await supabaseAdmin.storage.createBucket(id, { public: true });
    if (error && !/already exists/i.test(error.message)) {
      throw new Error(`Bucket ${id}: ${error.message}`);
    }
    created.push(id);
  }

  const { count: publishedBefore } = await supabaseAdmin
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("is_published", true);

  const { error: hideErr } = await supabaseAdmin
    .from("posts")
    .update({ is_published: false })
    .eq("is_published", true);

  if (hideErr) throw new Error(hideErr.message);

  const { count: publishedAfter } = await supabaseAdmin
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("is_published", true);

  return {
    buckets: { created, existing },
    publishedBefore: publishedBefore ?? 0,
    publishedAfter: publishedAfter ?? 0,
    note:
      "Storage policies still require restore-playback.sql if uploads fail. Re-upload tracks/videos to repopulate the feed.",
  };
}
