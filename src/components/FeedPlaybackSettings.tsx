import { useState } from "react";
import { ArrowDownToLine, Gauge, Volume2, VolumeX } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { PLAYBACK_SPEED_OPTIONS } from "@/lib/feed-preferences";
import { useFeedPreferences } from "@/hooks/useFeedPreferences";
import { toast } from "sonner";

type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function FeedPlaybackSettingsSheet({ open, onOpenChange }: SheetProps) {
  const { preferences, setPreference } = useFeedPreferences();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl border-border bg-card pb-[var(--safe-area-inset-bottom)]">
        <SheetHeader>
          <SheetTitle className="text-left">Playback & feed</SheetTitle>
          <SheetDescription className="text-left">
            Hands-free scrolling, sound, and speed — saved on this device.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-1">
          <SettingRow
            icon={<ArrowDownToLine className="h-5 w-5 text-gold" />}
            title="Auto scroll"
            description="Jump to the next post when the current one ends"
            control={
              <Switch
                checked={preferences.autoScroll}
                onCheckedChange={(on) => {
                  setPreference("autoScroll", on);
                  toast.success(on ? "Auto scroll on" : "Auto scroll off");
                }}
                aria-label="Auto scroll"
              />
            }
          />
          <SettingRow
            icon={preferences.startMuted ? <VolumeX className="h-5 w-5 text-gold" /> : <Volume2 className="h-5 w-5 text-gold" />}
            title="Start muted"
            description="New posts play silently until you turn sound up"
            control={
              <Switch
                checked={preferences.startMuted}
                onCheckedChange={(on) => setPreference("startMuted", on)}
                aria-label="Start muted"
              />
            }
          />
          <div className="rounded-xl border border-border bg-background/40 px-4 py-3">
            <div className="flex items-center gap-3">
              <Gauge className="h-5 w-5 shrink-0 text-gold" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Playback speed</p>
                <p className="text-xs text-muted-foreground">Applies to the post you&apos;re watching</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {PLAYBACK_SPEED_OPTIONS.map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => setPreference("playbackSpeed", speed)}
                  className={cn(
                    "min-w-[3rem] rounded-full px-3 py-1.5 text-sm font-medium tabular-nums transition-colors",
                    preferences.playbackSpeed === speed
                      ? "bg-gradient-gold text-primary-foreground shadow-glow"
                      : "bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  {speed}×
                </button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SettingRow({
  icon,
  title,
  description,
  control,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/10">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {control}
    </div>
  );
}

/** Floating chip on the main feed — opens the playback sheet */
export function FeedPlaybackSettingsTrigger({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { preferences } = useFeedPreferences();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-md transition-colors",
          preferences.autoScroll
            ? "border-gold/60 bg-gold/20 text-gold shadow-glow"
            : "border-white/25 bg-black/45 text-white/90",
          className,
        )}
        aria-label="Playback and feed settings"
      >
        <ArrowDownToLine className="h-3.5 w-3.5" />
        {preferences.autoScroll ? "Auto scroll on" : "Auto scroll"}
      </button>
      <FeedPlaybackSettingsSheet open={open} onOpenChange={setOpen} />
    </>
  );
}

/** Profile / Me page — always-visible preferences block */
export function FeedPreferencesCard() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { preferences, setPreference } = useFeedPreferences();

  return (
    <section className="mt-5 overflow-hidden rounded-xl border border-gold/35 bg-gradient-to-br from-gold/12 via-card to-card">
      <div className="border-b border-gold/20 px-4 py-3">
        <h2 className="text-sm font-semibold tracking-tight">Playback & feed</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          TikTok-style auto scroll and more — synced on this device.
        </p>
      </div>
      <div className="space-y-0 divide-y divide-border/60 px-4">
        <div className="flex items-center justify-between gap-3 py-3">
          <div>
            <p className="text-sm font-medium">Auto scroll</p>
            <p className="text-xs text-muted-foreground">Next post when this one ends</p>
          </div>
          <Switch
            checked={preferences.autoScroll}
            onCheckedChange={(on) => {
              setPreference("autoScroll", on);
              toast.success(on ? "Auto scroll on" : "Auto scroll off");
            }}
            aria-label="Auto scroll"
            className="data-[state=checked]:bg-gold"
          />
        </div>
        <div className="flex items-center justify-between gap-3 py-3">
          <div>
            <p className="text-sm font-medium">Start muted</p>
            <p className="text-xs text-muted-foreground">Tap volume to unmute</p>
          </div>
          <Switch
            checked={preferences.startMuted}
            onCheckedChange={(on) => setPreference("startMuted", on)}
            aria-label="Start muted"
          />
        </div>
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex w-full items-center justify-between py-3 text-left text-sm text-gold"
        >
          <span>Speed &amp; more options</span>
          <span className="text-xs tabular-nums text-muted-foreground">{preferences.playbackSpeed}×</span>
        </button>
      </div>
      <FeedPlaybackSettingsSheet open={sheetOpen} onOpenChange={setSheetOpen} />
    </section>
  );
}
