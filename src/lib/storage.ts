/** Supabase projects that were deleted or replaced — media URLs in DB may still reference these hosts. */
const LEGACY_SUPABASE_HOSTS = [
  "goorydexknxspyetdnsi.supabase.co",
  "vujmezepstugbhozgtrm.supabase.co",
];

function currentSupabaseOrigin(): string {
  const raw =
    import.meta.env.VITE_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "";
  return raw.split("/rest/v1")[0].replace(/\/$/, "");
}

/** Rewrite dead Supabase storage URLs to the active project from env. */
export function resolveStorageUrl(url: string | null | undefined): string {
  if (!url) return "";
  const current = currentSupabaseOrigin();
  if (!current) return url;

  let resolved = url;
  for (const legacy of LEGACY_SUPABASE_HOSTS) {
    resolved = resolved.replaceAll(`https://${legacy}`, current);
  }
  return resolved;
}
