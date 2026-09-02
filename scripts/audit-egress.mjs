/**
 * AlgoRhythm cached-egress audit.
 *
 * Usage:
 *   set SUPABASE_URL=https://tmpdjywsnwzivetqludd.supabase.co
 *   set SUPABASE_ANON_KEY=<current anon key from Supabase dashboard>
 *   node scripts/audit-egress.mjs
 *
 * Optional (storage object sizes): SUPABASE_SERVICE_ROLE_KEY
 */

const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !ANON_KEY) {
  console.error("Set SUPABASE_URL and SUPABASE_ANON_KEY (from Supabase → Settings → API).");
  process.exit(1);
}

const headers = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` };

async function rest(path) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers });
  if (!res.ok) throw new Error(`REST ${res.status}: ${await res.text()}`);
  return res.json();
}

async function headSize(url) {
  if (!url) return 0;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 15000);
    const res = await fetch(url, { method: "HEAD", signal: ctrl.signal, redirect: "follow" });
    clearTimeout(t);
    const len = res.headers.get("content-length");
    return len ? Number(len) : 0;
  } catch {
    return 0;
  }
}

function classify(url) {
  if (!url) return "empty";
  if (url.includes("tmpdjywsnwzivetqludd.supabase.co")) return "algorhythm_storage";
  if (url.includes("stream.mux.com") || url.includes("image.mux.com")) return "mux";
  if (url.includes("commondatastorage.googleapis.com")) return "google_sample";
  if (url.includes(".supabase.co/storage/")) return "other_supabase";
  return "external";
}

function fmt(bytes) {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(2)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(2)} MB`;
  if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(1)} KB`;
  return `${bytes} B`;
}

async function fetchPosts() {
  const rows = [];
  let offset = 0;
  while (true) {
    const batch = await rest(
      `posts?select=id,title,type,media_url,cover_url,view_count,is_published&is_published=eq.true&order=view_count.desc&offset=${offset}&limit=500`,
    );
    rows.push(...batch);
    if (batch.length < 500) break;
    offset += 500;
  }
  return rows;
}

async function listStorageObjects(bucket) {
  if (!SERVICE_KEY) return [];
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/list/${bucket}`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prefix: "", limit: 1000, offset: 0 }),
  });
  if (!res.ok) {
    console.warn(`Storage list ${bucket}: ${res.status} ${(await res.text()).slice(0, 120)}`);
    return [];
  }
  return res.json();
}

async function main() {
  console.log("AlgoRhythm cached egress audit\n");

  const posts = await fetchPosts();
  console.log(`Published posts: ${posts.length}\n`);

  const bySource = {};
  for (const p of posts) {
    const src = classify(p.media_url);
    bySource[src] = bySource[src] || { count: 0, views: 0 };
    bySource[src].count++;
    bySource[src].views += p.view_count ?? 0;
  }

  console.log("=== Media URL sources (published) ===");
  for (const [src, v] of Object.entries(bySource).sort((a, b) => b[1].views - a[1].views)) {
    console.log(`  ${src}: ${v.count} posts, ${v.views} total view_count`);
  }

  const storagePosts = posts.filter((p) => classify(p.media_url) === "algorhythm_storage");
  console.log(`\n=== Top storage-backed posts (by view_count) ===`);
  console.log("Probing file sizes via HEAD (may take a minute)...\n");

  const ranked = [];
  for (const p of storagePosts.slice(0, 40)) {
    const mediaBytes = await headSize(p.media_url);
    const coverBytes = p.cover_url ? await headSize(p.cover_url) : 0;
    const views = p.view_count ?? 0;
    const estEgress = (mediaBytes + coverBytes) * Math.max(views, 1);
    ranked.push({ ...p, mediaBytes, coverBytes, estEgress });
  }
  ranked.sort((a, b) => b.estEgress - a.estEgress);

  let totalEst = 0;
  for (const r of ranked.slice(0, 15)) {
    totalEst += r.estEgress;
    console.log(
      [
        `views=${r.view_count}`,
        `media=${fmt(r.mediaBytes)}`,
        `est=${fmt(r.estEgress)}`,
        r.type,
        r.title?.slice(0, 40),
        r.id,
      ].join(" | "),
    );
  }

  console.log(`\nRough min egress (top 15 storage posts × views): ${fmt(totalEst)}`);
  console.log("(Real egress is higher: redownloads, discover grid, bots, unscrolled posts)\n");

  if (SERVICE_KEY) {
    for (const bucket of ["media", "covers", "avatars"]) {
      const top = await listStorageObjects(bucket);
      if (!top.length) continue;
      console.log(`=== Storage bucket: ${bucket} (top-level folders: ${top.length}) ===`);
    }
    console.log("\nFor per-file sizes, run the SQL in scripts/audit-egress.sql in Supabase SQL Editor.");
  } else {
    console.log("Tip: set SUPABASE_SERVICE_ROLE_KEY to list storage objects from this script.");
    console.log("Or run scripts/audit-egress.sql in Supabase SQL Editor (no API key needed).\n");
  }

  console.log("=== Why ViralSnap is separate ===");
  console.log("ViralSnap uses project ylfrcrigmazlptxnlzqm — its own 5 GB egress quota.");
  console.log("This spike is only on AlgoRhythm (tmpdjywsnwzivetqludd).");
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
