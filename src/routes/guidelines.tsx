import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/guidelines")({
  head: () => ({
    meta: [
      { title: "Community Guidelines — AlgoRhythm" },
      { name: "description", content: "The rules of the road for AlgoRhythm — what's allowed, what isn't, and how we keep the platform safe." },
      { property: "og:title", content: "Community Guidelines — AlgoRhythm" },
      { property: "og:description", content: "What's allowed and what isn't on AlgoRhythm." },
      { property: "og:url", content: "https://myalgorhythm.online/guidelines" },
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/guidelines" }],
  }),
  component: GuidelinesPage,
});

function GuidelinesPage() {
  return (
    <AppShell>
      <article className="mx-auto max-w-2xl px-5 pt-6 pb-24">
        <h1 className="text-2xl tracking-tight text-gradient-gold">Community Guidelines</h1>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Last updated: May 27, 2026</p>

        <p className="mt-6 text-sm text-foreground/90">
          AlgoRhythm is a home for AI music creators. To keep it that way, everyone — listener or creator — agrees to these rules. Violations can result in content removal, suspension, or permanent ban.
        </p>

        <Section title="Absolutely not allowed">
          <ul>
            <li><strong>Child sexual abuse material (CSAM).</strong> Any sexualized content involving minors will be removed, the account terminated, and reported to NCMEC and law enforcement.</li>
            <li><strong>Non-consensual intimate content</strong> (including AI-generated nudes of real people).</li>
            <li><strong>AI voice or likeness of real people without consent</strong> — no deepfakes of real artists, public figures, or private individuals.</li>
            <li><strong>Threats of violence, doxxing, or stalking.</strong></li>
            <li><strong>Hate speech</strong> targeting people based on race, ethnicity, religion, gender, sexual orientation, disability, or other protected characteristics.</li>
            <li><strong>Glorification of self-harm, suicide, or eating disorders.</strong></li>
            <li><strong>Sale or promotion of illegal goods</strong> (drugs, weapons, stolen property).</li>
            <li><strong>Copyrighted music or samples</strong> you don't own or aren't licensed for. See our <Link to="/dmca" className="text-gold">DMCA policy</Link>.</li>
          </ul>
        </Section>

        <Section title="Be honest about AI">
          AlgoRhythm is built for AI-made content — disclose the tools you used (Suno, Udio, Riffusion, Runway, Pika, etc.) in your post tags. Don't pass off AI work as fully human-made if asked.
        </Section>

        <Section title="Respect other creators">
          No targeted harassment, brigading, or coordinated downvoting. Disagreement is fine; abuse isn't.
        </Section>

        <Section title="Reporting & enforcement">
          <ul>
            <li>Tap the <strong>⋮ menu</strong> on any post, comment, or profile to report it.</li>
            <li>We review reports as quickly as we can — typically within 24–72 hours.</li>
            <li>Repeat offenders are permanently banned. Account terminations include all content, tips received, and subscriptions.</li>
            <li>If your account was actioned and you believe it was a mistake, email <a className="text-gold" href="mailto:contactus@myalgorhythm.online">contactus@myalgorhythm.online</a>.</li>
          </ul>
        </Section>

        <Section title="Minimum age">
          You must be at least <strong>13 years old</strong> to use AlgoRhythm. To send tips or subscribe, you must be <strong>18 or older</strong> (or the age of majority in your jurisdiction).
        </Section>

        <p className="mt-8 text-xs text-muted-foreground">
          See also: <Link to="/terms" className="text-gold">Terms</Link> · <Link to="/privacy" className="text-gold">Privacy</Link> · <Link to="/dmca" className="text-gold">DMCA</Link> · <Link to="/contact" className="text-gold">Contact</Link>
        </p>
      </article>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 text-sm text-foreground/90 space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
      <h2 className="text-base font-medium text-gold">{title}</h2>
      {children}
    </section>
  );
}
