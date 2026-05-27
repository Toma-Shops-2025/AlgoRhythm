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
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-background/70" />

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
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-card/85 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-gold">
          <Sparkles className="h-3 w-3" /> AI music, made viral
        </div>
        <h1 className="text-gradient-gold text-5xl leading-[1.05] tracking-tight">
          The vertical feed<br />for AI creators.
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-balance text-sm text-muted-foreground">
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
            className="rounded-md border border-border px-5 py-3 text-sm text-foreground hover:border-gold/50"
          >
            Watch the feed
          </a>
        </div>
        <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
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
            className="rounded-xl border border-border/70 bg-card/85 p-5"
          >
            <div className="text-[11px] tracking-[0.2em] text-gold">{f.k}</div>
            <h2 className="mt-2 text-lg">{f.t}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
