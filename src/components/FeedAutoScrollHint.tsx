import { useEffect } from "react";
import { toast } from "sonner";
import { AUTO_SCROLL_HINT_KEY } from "@/lib/feed-preferences";
import { useFeedPreferences } from "@/hooks/useFeedPreferences";

/** One-time nudge so people know auto scroll is on and how to turn it off */
export function FeedAutoScrollHint({ onOpenSettings }: { onOpenSettings: () => void }) {
  const { preferences } = useFeedPreferences();

  useEffect(() => {
    if (!preferences.autoScroll) return;
    if (typeof window === "undefined") return;
    if (localStorage.getItem(AUTO_SCROLL_HINT_KEY)) return;
    localStorage.setItem(AUTO_SCROLL_HINT_KEY, "1");

    toast("Auto scroll is on", {
      description: "Posts advance when they end. Tap the chip at the top anytime to turn it off.",
      duration: 8000,
      action: {
        label: "Settings",
        onClick: onOpenSettings,
      },
    });
  }, [preferences.autoScroll, onOpenSettings]);

  return null;
}
