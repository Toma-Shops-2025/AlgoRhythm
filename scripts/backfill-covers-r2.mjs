/**
 * 1) Move leftover Supabase Storage media/covers → Cloudflare R2
 * 2) For videos with no cover, extract a still and upload as cover_url
 *
 * PowerShell (new free project + R2):
 *   $env:SUPABASE_URL="https://hzezzjdcztfgitnmcqle.supabase.co"
 *   $env:SUPABASE_SERVICE_ROLE_KEY="..."
 *   $env:R2_ACCOUNT_ID="..."
 *   $env:R2_ACCESS_KEY_ID="..."
 *   $env:R2_SECRET_ACCESS_KEY="..."
 *   $env:R2_BUCKET="toma-media"
 *   $env:R2_PUBLIC_URL="https://pub-6a5efcce12e64d3c9d14f2b54d9c34e0.r2.dev"
 *   node scripts/backfill-covers-r2.mjs [--dry-run] [--limit=N] [--skip-frames]
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.NEW_SUPABASE_URL || "").replace(/\/$/, "");
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEW_SUPABASE_SERVICE_ROLE_KEY || "";
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || "";
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || "";
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || "";
const R2_BUCKET = process.env.R2_BUCKET || "";
const R2_PUBLIC_URL = (process.env.R2_PUBLIC_URL || "").replace(/\/$/, "");
const DRY_RUN = process.argv.includes("--dry-run");
const SKIP_FRAMES = process.argv.includes("--skip-frames");
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? Number(limitArg.split("=")[1]) : Infinity;
const PREFIX = "algorhythm";

if (!SUPABASE_URL || !SERVICE_KEY || !R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET || !R2_PUBLIC_URL) {
  console.error("Missing SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and R2_* env vars. See script header.");
  process.exit(1);
}

const headers = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=minimal",
};

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

function onR2(url) {
  return Boolean(url && (url.startsWith(R2_PUBLIC_URL) || url.includes(`/${PREFIX}/`)));
}

function isSupabaseStorage(url) {
  return Boolean(url && url.includes(".supabase.co/storage/"));
}

function extFromUrl(url, fallback) {
  try {
    const m = new URL(url).pathname.match(/\.([a-z0-9]+)$/i);
    return (m?.[1] || fallback).toLowerCase();
  } catch {
    return fallback;
  }
}

function resolveFfmpeg() {
  if (process.env.FFMPEG_PATH && existsSync(process.env.FFMPEG_PATH)) {
    return process.env.FFMPEG_PATH;
  }
  try {
    const installer = require("@ffmpeg-installer/ffmpeg");
    if (installer?.path && existsSync(installer.path)) return installer.path;
  } catch {
    /* optional */
  }
  const fromPath = spawnSync("ffmpeg", ["-version"], { encoding: "utf8" });
  if (fromPath.status === 0) return "ffmpeg";
  const local = process.env.LOCALAPPDATA || "";
  const wingetRoot = join(local, "Microsoft", "WinGet", "Packages");
  if (existsSync(wingetRoot)) {
    try {
      const { readdirSync, statSync } = require("node:fs");
      const stack = [wingetRoot];
      while (stack.length) {
        const dir = stack.pop();
        for (const name of readdirSync(dir)) {
          const p = join(dir, name);
          try {
            if (statSync(p).isDirectory()) {
              if (name === "bin" || name.toLowerCase().includes("ffmpeg")) stack.push(p);
              else if (dir.includes("FFmpeg") || dir.includes("ffmpeg")) stack.push(p);
            } else if (name === "ffmpeg.exe") {
              return p;
            }
          } catch {
            /* ignore */
          }
        }
      }
    } catch {
      /* ignore */
    }
  }
  return null;
}

async function rest(path, init = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: { ...headers, ...(init.headers || {}) },
  });
  if (!res.ok) throw new Error(`REST ${res.status}: ${await res.text()}`);
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

async function download(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status} ${url.slice(0, 120)}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") || "application/octet-stream";
  return { buf, contentType };
}

async function uploadR2(key, buf, contentType) {
  if (DRY_RUN) return `${R2_PUBLIC_URL}/${key}`;
  await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: buf,
      ContentType: contentType,
    }),
  );
  return `${R2_PUBLIC_URL}/${key}`;
}

async function migrateAsset(id, creatorId, kind, url, fallbackExt) {
  if (!url || onR2(url)) return { url, changed: false, missing: false };
  if (!isSupabaseStorage(url) && !url.includes("r2.dev")) {
    // Unknown host — leave as-is
    return { url, changed: false, missing: false };
  }
  let buf;
  let contentType;
  try {
    ({ buf, contentType } = await download(url));
  } catch (e) {
    console.warn(`SKIP ${kind} ${id}: ${e.message}`);
    return { url: null, changed: true, missing: true };
  }
  const hash = createHash("sha1").update(buf).digest("hex").slice(0, 12);
  const ext = extFromUrl(url, fallbackExt);
  const key = `${PREFIX}/${kind}/${creatorId || "unknown"}/${id}-${kind}-${hash}.${ext}`;
  const publicUrl = await uploadR2(key, buf, contentType);
  console.log(`${DRY_RUN ? "WOULD" : "OK"} ${kind} ${id}`);
  return { url: publicUrl, changed: true, missing: false };
}

function ffmpegTail(stderr) {
  const s = String(stderr || "").trim();
  if (!s) return "ffmpeg failed (no stderr)";
  return s.slice(Math.max(0, s.length - 240));
}

function extractFrameFromUrl(ffmpegPath, mediaUrl) {
  const dir = mkdtempSync(join(tmpdir(), "ar-cover-"));
  const outFile = join(dir, "cover.jpg");
  const attempts = [
    ["-y", "-hide_banner", "-loglevel", "error", "-ss", "1", "-i", mediaUrl, "-frames:v", "1", "-q:v", "3", "-vf", "scale=720:-1", outFile],
    ["-y", "-hide_banner", "-loglevel", "error", "-ss", "0.25", "-i", mediaUrl, "-frames:v", "1", "-q:v", "3", "-vf", "scale=720:-1", outFile],
    ["-y", "-hide_banner", "-loglevel", "error", "-i", mediaUrl, "-ss", "0", "-frames:v", "1", "-q:v", "3", "-vf", "scale=720:-1", outFile],
  ];
  try {
    let lastErr = "";
    for (const args of attempts) {
      const r = spawnSync(ffmpegPath, args, { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
      if (existsSync(outFile)) {
        const jpg = readFileSync(outFile);
        if (jpg.length > 500) return jpg;
      }
      lastErr = ffmpegTail(r.stderr) || `exit ${r.status}`;
    }
    throw new Error(lastErr);
  } finally {
    try {
      rmSync(dir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  }
}

function extractFrame(ffmpegPath, mediaBuf, mediaExt) {
  const dir = mkdtempSync(join(tmpdir(), "ar-cover-"));
  const inFile = join(dir, `in.${mediaExt || "mp4"}`);
  const outFile = join(dir, "cover.jpg");
  try {
    writeFileSync(inFile, mediaBuf);
    return extractFrameFromUrl(ffmpegPath, inFile);
  } finally {
    try {
      rmSync(dir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  }
}

async function main() {
  const ffmpegPath = SKIP_FRAMES ? null : resolveFfmpeg();
  console.log({
    supabase: SUPABASE_URL,
    dry: DRY_RUN,
    limit: Number.isFinite(LIMIT) ? LIMIT : "all",
    ffmpeg: ffmpegPath || (SKIP_FRAMES ? "skipped" : "MISSING — video frames will be skipped"),
  });

  const rows = await rest(
    "posts?select=id,creator_id,type,media_url,cover_url,title,is_published&is_published=eq.true&order=created_at.asc",
  );
  console.log(`Published posts: ${rows.length}`);

  let done = 0;
  let patched = 0;
  let frames = 0;
  let errors = 0;
  let needCover = 0;
  let alreadyCovered = 0;

  for (const row of rows) {
    if (done >= LIMIT) break;
    done++;
    try {
      const media = await migrateAsset(row.id, row.creator_id, "media", row.media_url, row.type === "video" ? "mp4" : "mp3");
      const cover = await migrateAsset(row.id, row.creator_id, "covers", row.cover_url, "jpg");

      let coverUrl = cover.missing ? null : cover.url;
      const mediaUrl = media.missing ? row.media_url : media.url;

      if (coverUrl) alreadyCovered++;
      else if (row.type === "video") needCover++;

      // Generate still for videos with no usable cover (prefer streaming URL into ffmpeg)
      if (!coverUrl && row.type === "video" && mediaUrl && ffmpegPath && (onR2(mediaUrl) || isSupabaseStorage(mediaUrl))) {
        try {
          let jpg;
          try {
            jpg = extractFrameFromUrl(ffmpegPath, mediaUrl);
          } catch (streamErr) {
            const { buf } = await download(mediaUrl);
            jpg = extractFrame(ffmpegPath, buf, extFromUrl(mediaUrl, "mp4"));
          }
          const hash = createHash("sha1").update(jpg).digest("hex").slice(0, 12);
          const key = `${PREFIX}/covers/${row.creator_id || "unknown"}/${row.id}-frame-${hash}.jpg`;
          coverUrl = await uploadR2(key, jpg, "image/jpeg");
          frames++;
          console.log(`${DRY_RUN ? "WOULD" : "OK"} frame ${row.id} ${String(row.title || "").slice(0, 40)}`);
        } catch (e) {
          console.warn(`FRAME SKIP ${row.id}: ${e.message}`);
        }
      }

      const patch = {};
      if (media.changed && mediaUrl) patch.media_url = mediaUrl;
      if (coverUrl !== row.cover_url) patch.cover_url = coverUrl;

      if (Object.keys(patch).length) {
        if (!DRY_RUN) {
          await rest(`posts?id=eq.${row.id}`, {
            method: "PATCH",
            body: JSON.stringify(patch),
          });
        }
        patched++;
      }
    } catch (e) {
      errors++;
      console.error(`ERROR ${row.id}: ${e.message}`);
    }
  }

  console.log({ done, patched, frames, alreadyCovered, needCover, errors });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
