/**
 * Import AlgoRhythm export JSON into a NEW free Supabase project.
 *
 * Prerequisites:
 * 1. New project created + apply-all-migrations.sql run
 * 2. You signed up once on the new project (founder account)
 * 3. Export file exists from export-algorhythm-data.mjs
 *
 * Modes:
 *   --owner-only (default): remap ALL posts to FOUNDER_USER_ID (simplest, keeps feed alive)
 *   --keep-creators: recreate auth users (random passwords) + profiles, then import posts with original ids
 *
 * PowerShell:
 *   $env:NEW_SUPABASE_URL="https://YOUR_NEW_REF.supabase.co"
 *   $env:NEW_SUPABASE_SERVICE_ROLE_KEY="..."
 *   $env:FOUNDER_USER_ID="uuid-from-auth-users-after-you-signup"
 *   node scripts/import-algorhythm-data.mjs
 *   node scripts/import-algorhythm-data.mjs --keep-creators
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const URL = (process.env.NEW_SUPABASE_URL || process.env.SUPABASE_URL || "").replace(/\/$/, "");
const KEY = process.env.NEW_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const FOUNDER_USER_ID = process.env.FOUNDER_USER_ID || "";
const KEEP_CREATORS = process.argv.includes("--keep-creators");
const IN = join(dirname(fileURLToPath(import.meta.url)), "data", "algorhythm-export.json");

if (!URL || !KEY || !FOUNDER_USER_ID) {
  console.error("Set NEW_SUPABASE_URL, NEW_SUPABASE_SERVICE_ROLE_KEY, FOUNDER_USER_ID");
  process.exit(1);
}

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  "Content-Type": "application/json",
  Prefer: "resolution=merge-duplicates,return=minimal",
};

const data = JSON.parse(readFileSync(IN, "utf8"));

async function upsert(table, rows, onConflict) {
  if (!rows.length) return { ok: 0 };
  const chunk = 200;
  let ok = 0;
  for (let i = 0; i < rows.length; i += chunk) {
    const batch = rows.slice(i, i + chunk);
    const res = await fetch(
      `${URL}/rest/v1/${table}?on_conflict=${encodeURIComponent(onConflict)}`,
      {
        method: "POST",
        headers: {
          ...headers,
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify(batch),
      },
    );
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`${table} upsert failed: ${res.status} ${body}`);
    }
    ok += batch.length;
  }
  return { ok };
}

async function createAuthUser(profile) {
  const email =
    profile.email ||
    `${String(profile.handle || profile.id).replace(/[^a-z0-9]/gi, "").slice(0, 24) || "creator"}@imported.algorhythm.local`;
  const password = `Import-${crypto.randomUUID().slice(0, 12)}!`;
  const res = await fetch(`${URL}/auth/v1/admin/users`, {
    method: "POST",
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        handle: profile.handle,
        display_name: profile.display_name,
        imported: true,
      },
      id: profile.id, // try keep same uuid
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    // If id conflict / email exists, continue
    console.warn(`auth create ${profile.handle}: ${res.status} ${body.slice(0, 160)}`);
    return false;
  }
  return true;
}

// Ensure founder profile exists
const founderProfile = data.profiles.find((p) => p.id === FOUNDER_USER_ID) || {
  id: FOUNDER_USER_ID,
  handle: "founder",
  display_name: "Founder",
  bio: null,
  avatar_url: null,
  links: {},
  follower_count: 0,
  following_count: 0,
  post_count: 0,
};

if (KEEP_CREATORS) {
  console.log("Creating auth users for exported profiles...");
  for (const p of data.profiles) {
    await createAuthUser(p);
  }
  await upsert("profiles", data.profiles, "id");
} else {
  console.log("Owner-only mode: all posts → FOUNDER_USER_ID");
  await upsert("profiles", [founderProfile], "id");
}

const posts = (data.posts || []).map((p) => ({
  ...p,
  creator_id: KEEP_CREATORS ? p.creator_id : FOUNDER_USER_ID,
  // ensure published
  is_published: p.is_published !== false,
}));

await upsert("posts", posts, "id");

if (KEEP_CREATORS) {
  if (data.likes?.length) await upsert("likes", data.likes, "post_id,user_id");
  if (data.saves?.length) {
    // saves may be text PK
    await upsert(
      "saves",
      data.saves.map((s) => ({
        user_id: String(s.user_id),
        post_id: String(s.post_id),
        created_at: s.created_at,
      })),
      "user_id,post_id",
    );
  }
  if (data.follows?.length) await upsert("follows", data.follows, "follower_id,following_id");
  if (data.comments?.length) await upsert("comments", data.comments, "id");
} else {
  // Remap engagement to founder where possible (likes/saves of posts)
  const postIds = new Set(posts.map((p) => p.id));
  const likes = (data.likes || [])
    .filter((l) => postIds.has(l.post_id))
    .map((l) => ({ post_id: l.post_id, user_id: FOUNDER_USER_ID, created_at: l.created_at }));
  // dedupe
  const likeKey = new Set();
  const likesDedup = likes.filter((l) => {
    const k = `${l.post_id}:${l.user_id}`;
    if (likeKey.has(k)) return false;
    likeKey.add(k);
    return true;
  });
  if (likesDedup.length) {
    try {
      await upsert("likes", likesDedup, "post_id,user_id");
    } catch (e) {
      console.warn("likes import skipped:", e.message);
    }
  }

  const saves = (data.saves || [])
    .filter((s) => postIds.has(s.post_id) || postIds.has(String(s.post_id)))
    .map((s) => ({
      user_id: String(FOUNDER_USER_ID),
      post_id: String(s.post_id),
      created_at: s.created_at,
    }));
  const saveKey = new Set();
  const savesDedup = saves.filter((s) => {
    const k = `${s.post_id}:${s.user_id}`;
    if (saveKey.has(k)) return false;
    saveKey.add(k);
    return true;
  });
  if (savesDedup.length) {
    try {
      await upsert("saves", savesDedup, "user_id,post_id");
    } catch (e) {
      console.warn("saves import skipped:", e.message);
    }
  }
}

console.log("Import complete:", {
  mode: KEEP_CREATORS ? "keep-creators" : "owner-only",
  posts: posts.length,
  r2Posts: posts.filter((p) => String(p.media_url || "").includes("r2.dev")).length,
  founder: FOUNDER_USER_ID,
});
