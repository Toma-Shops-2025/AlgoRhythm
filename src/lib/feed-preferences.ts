export const FEED_PREFERENCES_KEY = "algorhythm.feedPreferences.v1";
export const FEED_PREFERENCES_EVENT = "algorhythm:feed-preferences";

export type FeedPreferences = {
  /** Advance to the next post when the current track/video ends */
  autoScroll: boolean;
  /** Open the feed with sound off until the viewer unmutes */
  startMuted: boolean;
  /** HTMLMediaElement playback rate */
  playbackSpeed: number;
};

export const PLAYBACK_SPEED_OPTIONS = [0.75, 1, 1.25, 1.5, 2] as const;

export const DEFAULT_FEED_PREFERENCES: FeedPreferences = {
  autoScroll: false,
  startMuted: true,
  playbackSpeed: 1,
};

function normalizeSpeed(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 1;
  const allowed = PLAYBACK_SPEED_OPTIONS as readonly number[];
  if (allowed.includes(n)) return n;
  return 1;
}

export function loadFeedPreferences(): FeedPreferences {
  if (typeof window === "undefined") return DEFAULT_FEED_PREFERENCES;
  try {
    const raw = localStorage.getItem(FEED_PREFERENCES_KEY);
    if (!raw) return DEFAULT_FEED_PREFERENCES;
    const parsed = JSON.parse(raw) as Partial<FeedPreferences>;
    return {
      autoScroll: Boolean(parsed.autoScroll),
      startMuted: parsed.startMuted !== false,
      playbackSpeed: normalizeSpeed(parsed.playbackSpeed),
    };
  } catch {
    return DEFAULT_FEED_PREFERENCES;
  }
}

export function saveFeedPreferences(next: FeedPreferences): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(FEED_PREFERENCES_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(FEED_PREFERENCES_EVENT, { detail: next }));
}

export function patchFeedPreferences(patch: Partial<FeedPreferences>): FeedPreferences {
  const merged = { ...loadFeedPreferences(), ...patch };
  saveFeedPreferences(merged);
  return merged;
}
