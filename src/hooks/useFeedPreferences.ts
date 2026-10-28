import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_FEED_PREFERENCES,
  FEED_PREFERENCES_EVENT,
  type FeedPreferences,
  loadFeedPreferences,
  patchFeedPreferences,
  saveFeedPreferences,
} from "@/lib/feed-preferences";

export function useFeedPreferences() {
  const [preferences, setPreferences] = useState<FeedPreferences>(() =>
    typeof window !== "undefined" ? loadFeedPreferences() : DEFAULT_FEED_PREFERENCES,
  );

  useEffect(() => {
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<FeedPreferences>).detail;
      if (detail) setPreferences(detail);
      else setPreferences(loadFeedPreferences());
    };
    window.addEventListener(FEED_PREFERENCES_EVENT, onChange);
    return () => window.removeEventListener(FEED_PREFERENCES_EVENT, onChange);
  }, []);

  const setPreference = useCallback(<K extends keyof FeedPreferences>(key: K, value: FeedPreferences[K]) => {
    const next = patchFeedPreferences({ [key]: value });
    setPreferences(next);
    return next;
  }, []);

  const replacePreferences = useCallback((next: FeedPreferences) => {
    saveFeedPreferences(next);
    setPreferences(next);
  }, []);

  return { preferences, setPreference, replacePreferences };
}
