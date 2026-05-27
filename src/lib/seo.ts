export const SITE_URL = "https://myalgorhythm.online";
export const SITE_NAME = "AlgoRhythm";

export function absUrl(path: string): string {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function clamp(str: string | null | undefined, max: number): string {
  const s = (str ?? "").replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + "…";
}

export function buildPostTitle(title: string, handle?: string | null): string {
  const base = handle ? `${title} — @${handle} on ${SITE_NAME}` : `${title} — ${SITE_NAME}`;
  return clamp(base, 60);
}

export function buildPostDescription(args: {
  description?: string | null;
  type: "audio" | "video";
  handle?: string | null;
  tags?: string[] | null;
}): string {
  if (args.description && args.description.trim().length > 0) {
    return clamp(args.description, 155);
  }
  const tagStr = (args.tags ?? []).slice(0, 5).map((t) => `#${t}`).join(" ");
  const who = args.handle ? `by @${args.handle}` : "by an independent creator";
  return clamp(`AI-made ${args.type} ${who} on ${SITE_NAME}. ${tagStr}`.trim(), 155);
}

export function buildProfileTitle(displayName: string, handle: string): string {
  return clamp(`${displayName} (@${handle}) — AI music on ${SITE_NAME}`, 60);
}

export function buildProfileDescription(args: {
  displayName: string;
  handle: string;
  bio?: string | null;
  postCount?: number | null;
}): string {
  if (args.bio && args.bio.trim().length > 0) return clamp(args.bio, 155);
  const n = args.postCount ?? 0;
  return clamp(
    `AI-made music & videos by ${args.displayName} (@${args.handle}) on ${SITE_NAME}.${n ? ` ${n} posts.` : ""}`,
    155,
  );
}