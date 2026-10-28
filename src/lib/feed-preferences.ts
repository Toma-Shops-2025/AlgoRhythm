export const FEED_PREFERENCES_KEY = "algorhythm.feedPreferences.v2";
const FEED_PREFERENCES_KEY_V1 = "algorhythm.feedPreferences.v1";
export const FEED_PREFERENCES_EVENT = "algorhythm:feed-preferences";
export const AUTO_SCROLL_HINT_KEY = "algorhythm.autoScrollHintSeen";

export type FeedPreferences = {
  autoScroll: boolean;
  startMuted: boolean;
  playbackSpeed: number;
  /** Show description / pinned comment as on-screen captions when available */
  showCaptions: boolean;
  /** Limit video preload on cellular and when Save-Data is on */
  dataSaver: boolean;
  /** Short vibration when you like a post (mobile) */
  hapticOnLike: boolean;
  /** Swap Home tab: open Discover first, with For You on the second tab */
  startOnDiscover: boolean;
};

export const PLAYBACK_SPEED_OPTIONS = [0.75, 1, 1.25, 1.5, 2] as const;

export const DEFAULT_FEED_PREFERENCES: FeedPreferences = {
  autoScroll: true,
  startMuted: true,
  playbackSpeed: 1,
  showCaptions: true,
  dataSaver: false,
  hapticOnLike: true,
  startOnDiscover: false,
};

function normalizeSpeed(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 1;
  const allowed = PLAYBACK_SPEED_OPTIONS as readonly number[];
  if (allowed.includes(n)) return n;
  return 1;
}

function parsePartial(raw: Partial<FeedPreferences>, defaults: FeedPreferences): FeedPreferences {
  return {
    autoScroll: raw.autoScroll !== undefined ? Boolean(raw.autoScroll) : defaults.autoScroll,
    startMuted: raw.startMuted !== undefined ? raw.startMuted !== false : defaults.startMuted,
    playbackSpeed: normalizeSpeed(raw.playbackSpeed ?? defaults.playbackSpeed),
    showCaptions: raw.showCaptions !== undefined ? Boolean(raw.showCaptions) : defaults.showCaptions,
    dataSaver: Boolean(raw.dataSaver),
    hapticOnLike: raw.hapticOnLike !== undefined ? Boolean(raw.hapticOnLike) : defaults.hapticOnLike,
    startOnDiscover: Boolean(raw.startOnDiscover),
  };
}

function migrateFromV1(): FeedPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(FEED_PREFERENCES_KEY_V1);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<FeedPreferences>;
    localStorage.removeItem(FEED_PREFERENCES_KEY_V1);
    return parsePartial(parsed, {
      ...DEFAULT_FEED_PREFERENCES,
      autoScroll: parsed.autoScroll !== undefined ? Boolean(parsed.autoScroll) : true,
    });
  } catch {
    return null;
  }
}

export function loadFeedPreferences(): FeedPreferences {
  if (typeof window === "undefined") return DEFAULT_FEED_PREFERENCES;
  try {
    const raw = localStorage.getItem(FEED_PREFERENCES_KEY);
    if (!raw) {
      const migrated = migrateFromV1();
      if (migrated) {
        saveFeedPreferences(migrated);
        return migrated;
      }
      return DEFAULT_FEED_PREFERENCES;
    }
    const parsed = JSON.parse(raw) as Partial<FeedPreferences>;
    return parsePartial(parsed, DEFAULT_FEED_PREFERENCES);
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
