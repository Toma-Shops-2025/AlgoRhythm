const LEGACY_SUPABASE_HOSTS = [
  "goorydexknxspyetdnsi.supabase.co",
  "vujmezepstugbhozgtrm.supabase.co"
];
function currentSupabaseOrigin() {
  const raw = "https://tmpdjywsnwzivetqludd.supabase.co";
  return raw.split("/rest/v1")[0].replace(/\/$/, "");
}
function resolveStorageUrl(url) {
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
  "commondatastorage.googleapis.com/gtv-videos-bucket/sample"
];
function isPlayablePost(post) {
  const url = resolveStorageUrl(post.media_url);
  if (!url) return false;
  if (BLOCKED_MEDIA_HOSTS.some((host) => url.includes(host))) return false;
  if (url.includes(".supabase.co/storage/v1/object/public/")) return true;
  return /^https?:\/\//i.test(url) && !LEGACY_SUPABASE_HOSTS.some((h) => url.includes(h));
}
export {
  isPlayablePost as i,
  resolveStorageUrl as r
};
