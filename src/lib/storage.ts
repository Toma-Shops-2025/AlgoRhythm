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

const BLOCKED_MEDIA_HOSTS = [
  "commondatastorage.googleapis.com/gtv-videos-bucket/sample",
];

/** Skip feed rows whose media files are missing or known-broken. */
export function isPlayablePost(post: { media_url?: string | null }): boolean {
  const url = resolveStorageUrl(post.media_url);
  if (!url) return false;
  if (BLOCKED_MEDIA_HOSTS.some((host) => url.includes(host))) return false;
  // Prefer real Supabase public media, but accept any https media URL so the feed
  // never goes fully blank for Play reviewers when legacy hosts are rewritten.
  if (url.includes(".supabase.co/storage/v1/object/public/")) return true;
  return /^https?:\/\//i.test(url) && !LEGACY_SUPABASE_HOSTS.some((h) => url.includes(h));
}
