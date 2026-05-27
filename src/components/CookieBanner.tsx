import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const KEY = "ar_cookie_consent_v1";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  const set = (value: "all" | "essential") => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: value, t: Date.now() }));
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-gold/30 bg-card/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
        <p className="text-xs text-foreground/90 sm:flex-1">
          We use essential cookies to run AlgoRhythm and optional analytics cookies to improve it.
          Read our <Link to="/privacy" className="text-gold underline">Privacy Policy</Link>.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button size="sm" variant="outline" onClick={() => set("essential")}>
            Essential only
          </Button>
          <Button
            size="sm"
            onClick={() => set("all")}
            className="bg-gradient-gold text-primary-foreground"
          >
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}

export function getCookieConsent(): "all" | "essential" | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.v ?? null;
  } catch {
    return null;
  }
}