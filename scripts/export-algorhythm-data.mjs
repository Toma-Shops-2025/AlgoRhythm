/**
 * Export AlgoRhythm content from the OLD Supabase project (before quota lock).
 * Media files stay on R2 — this only exports DB rows (posts, profiles, likes, saves, follows, comments).
 *
 * PowerShell:
 *   $env:OLD_SUPABASE_URL="https://tmpdjywsnwzivetqludd.supabase.co"
 *   $env:OLD_SUPABASE_SERVICE_ROLE_KEY="..."
 *   node scripts/export-algorhythm-data.mjs
 *
 * Writes: scripts/data/algorhythm-export.json
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const URL = (process.env.OLD_SUPABASE_URL || process.env.SUPABASE_URL || "").replace(/\/$/, "");
const KEY = process.env.OLD_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "data", "algorhythm-export.json");

if (!URL || !KEY) {
  console.error("Set OLD_SUPABASE_URL and OLD_SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  "Content-Type": "application/json",
};

async function fetchAll(table, select = "*", { order = "created_at.asc" } = {}) {
  const pageSize = 1000;
  const rows = [];
  for (let from = 0; ; from += pageSize) {
    const to = from + pageSize - 1;
    const orderParam = order ? `&order=${encodeURIComponent(order)}` : "";
    const res = await fetch(
      `${URL}/rest/v1/${table}?select=${encodeURIComponent(select)}${orderParam}&offset=${from}&limit=${pageSize}`,
      { headers: { ...headers, Range: `${from}-${to}`, Prefer: "count=exact" } },
    );
    if (!res.ok) {
      const body = await res.text();
      if (res.status === 404 || /does not exist|PGRST/i.test(body)) {
        console.warn(`skip ${table}: ${res.status} ${body.slice(0, 120)}`);
        return [];
      }
      throw new Error(`${table}: ${res.status} ${body}`);
    }
    const batch = await res.json();
    rows.push(...batch);
    if (batch.length < pageSize) break;
  }
  return rows;
}

const exportData = {
  exportedAt: new Date().toISOString(),
  source: URL,
  profiles: await fetchAll("profiles"),
  posts: await fetchAll("posts"),
  likes: await fetchAll("likes"),
  saves: await fetchAll("saves"),
  follows: await fetchAll("follows"),
  comments: await fetchAll("comments"),
  user_roles: await fetchAll("user_roles", "*", { order: "user_id.asc" }),
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(exportData, null, 2));
console.log(`Wrote ${OUT}`);
console.log(
  JSON.stringify(
    {
      profiles: exportData.profiles.length,
      posts: exportData.posts.length,
      likes: exportData.likes.length,
      saves: exportData.saves.length,
      follows: exportData.follows.length,
      comments: exportData.comments.length,
      user_roles: exportData.user_roles.length,
      r2Posts: exportData.posts.filter((p) => String(p.media_url || "").includes("r2.dev")).length,
    },
    null,
    2,
  ),
);
