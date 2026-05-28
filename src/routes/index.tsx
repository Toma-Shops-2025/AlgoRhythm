import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Wordmark } from "@/components/Logo";
import { Sparkles } from "lucide-react";
import bgLoop from "@/assets/bg-loop.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:url", content: "https://myalgorhythm.online/" },
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <AppShell>
      <video
        src={bgLoop.url}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover opacity-20"
      />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-background/55" />

      <header className="flex items-center justify-between px-5 pt-6">
        <Wordmark />
        <a
          href="/login"
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold"
        >
          Sign in
        </a>
      </header>

      <section className="px-6 pt-16 pb-10 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gold/60 bg-card/90 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-gold-soft">
          <Sparkles className="h-3 w-3" /> AI music, made viral
        </div>
        <h1 className="text-gradient-gold text-5xl leading-[1.05] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
          The vertical feed<br />for AI creators.
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-balance text-sm text-foreground/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
          Post your AI-made tracks and music videos. Get discovered. Earn from the people who love it.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="/signup"
            className="rounded-md bg-gradient-gold px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_30px_-6px_var(--gold)]"
          >
            Create your profile
          </a>
          <a
            href="/feed"
            className="rounded-md border border-gold/40 bg-card/70 backdrop-blur-sm px-5 py-3 text-sm text-foreground hover:border-gold/70"
          >
            Watch the feed
          </a>
        </div>
        <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-foreground/70">
          No account needed to browse
        </p>
      </section>

      <section className="mx-auto grid max-w-md gap-3 px-5 pb-12">
        {[
          { k: "01", t: "Audio + video, one feed", d: "Tracks auto-render a gold visualizer so they feel native next to videos." },
          { k: "02", t: "Built to go viral", d: "A discovery algorithm that rewards new creators, not just established names." },
          { k: "03", t: "Monetize from day one", d: "Tips, subscriptions, boosts, and sponsor matches — built in." },
        ].map((f) => (
          <article
            key={f.k}
            className="rounded-xl border border-gold/20 bg-card/95 p-5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)]"
          >
            <div className="text-[11px] tracking-[0.2em] text-gold-soft">{f.k}</div>
            <h2 className="mt-2 text-lg text-foreground">{f.t}</h2>
            <p className="mt-1 text-sm text-foreground/80">{f.d}</p>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
