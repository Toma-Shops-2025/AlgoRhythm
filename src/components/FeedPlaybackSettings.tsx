import { useState } from "react";
import {
  ArrowDownToLine,
  Compass,
  Gauge,
  Smartphone,
  Subtitles,
  Vibrate,
  Volume2,
  VolumeX,
  Wifi,
} from "lucide-react";
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
      <SheetContent
        side="bottom"
        className="max-h-[90dvh] overflow-y-auto rounded-t-2xl border-border bg-card pb-[var(--safe-area-inset-bottom)]"
      >
        <SheetHeader>
          <SheetTitle className="text-left">Playback & feed</SheetTitle>
          <SheetDescription className="text-left">
            Saved on this device. Auto scroll is on by default — turn it off anytime below.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-2">
          <SettingRow
            icon={<ArrowDownToLine className="h-5 w-5 text-gold" />}
            title="Auto scroll"
            description="On by default. Next post when this one ends"
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
          <SettingRow
            icon={<Subtitles className="h-5 w-5 text-gold" />}
            title="Captions"
            description="Show caption & pinned comments on posts when available"
            control={
              <Switch
                checked={preferences.showCaptions}
                onCheckedChange={(on) => setPreference("showCaptions", on)}
                aria-label="Captions"
              />
            }
          />
          <SettingRow
            icon={<Wifi className="h-5 w-5 text-gold" />}
            title="Data saver"
            description="Use less mobile data — lighter video preload on cellular"
            control={
              <Switch
                checked={preferences.dataSaver}
                onCheckedChange={(on) => setPreference("dataSaver", on)}
                aria-label="Data saver"
              />
            }
          />
          <SettingRow
            icon={<Vibrate className="h-5 w-5 text-gold" />}
            title="Haptic on like"
            description="Short buzz when you tap the heart"
            control={
              <Switch
                checked={preferences.hapticOnLike}
                onCheckedChange={(on) => setPreference("hapticOnLike", on)}
                aria-label="Haptic on like"
              />
            }
          />
          <SettingRow
            icon={<Compass className="h-5 w-5 text-gold" />}
            title="Start on Discover"
            description="Home tab opens Discover; For You moves to the second icon"
            control={
              <Switch
                checked={preferences.startOnDiscover}
                onCheckedChange={(on) => {
                  setPreference("startOnDiscover", on);
                  toast.message(on ? "Home opens Discover" : "Home opens For You feed");
                }}
                aria-label="Start on Discover"
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
        {preferences.autoScroll ? "Auto scroll on" : "Auto scroll off"}
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
          Auto scroll is <span className="text-gold font-medium">on by default</span>. Change anything
          here or tap the chip on the feed.
        </p>
      </div>
      <div className="space-y-0 divide-y divide-border/60 px-4">
        <PreferenceToggle
          title="Auto scroll"
          description="Turn off if you prefer to swipe yourself"
          checked={preferences.autoScroll}
          onCheckedChange={(on) => {
            setPreference("autoScroll", on);
            toast.success(on ? "Auto scroll on" : "Auto scroll off");
          }}
          highlight
        />
        <PreferenceToggle
          title="Captions"
          description="Post text & pinned comments on screen"
          checked={preferences.showCaptions}
          onCheckedChange={(on) => setPreference("showCaptions", on)}
        />
        <PreferenceToggle
          title="Data saver"
          description="Less preload on mobile data"
          checked={preferences.dataSaver}
          onCheckedChange={(on) => setPreference("dataSaver", on)}
        />
        <PreferenceToggle
          title="Haptic on like"
          description="Vibration when you heart a track"
          checked={preferences.hapticOnLike}
          onCheckedChange={(on) => setPreference("hapticOnLike", on)}
        />
        <PreferenceToggle
          title="Start on Discover"
          description="Swap Home & Discover tabs"
          checked={preferences.startOnDiscover}
          onCheckedChange={(on) => setPreference("startOnDiscover", on)}
        />
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex w-full items-center justify-between py-3 text-left text-sm text-gold"
        >
          <span className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            All playback options
          </span>
          <span className="text-xs tabular-nums text-muted-foreground">{preferences.playbackSpeed}×</span>
        </button>
      </div>
      <FeedPlaybackSettingsSheet open={sheetOpen} onOpenChange={setSheetOpen} />
    </section>
  );
}

function PreferenceToggle({
  title,
  description,
  checked,
  onCheckedChange,
  highlight,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (on: boolean) => void;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={title}
        className={highlight ? "data-[state=checked]:bg-gold" : undefined}
      />
    </div>
  );
}
