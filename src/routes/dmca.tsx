import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/dmca")({
  head: () => ({
    meta: [
      { title: "DMCA & Content Policy — AlgoRhythm" },
      { name: "description", content: "How to report copyright infringement or other policy violations on AlgoRhythm." },
      { property: "og:title", content: "DMCA & Content Policy — AlgoRhythm" },
      { property: "og:description", content: "Report copyright infringement on AlgoRhythm." },
      { property: "og:url", content: "https://myalgorhythm.online/dmca" },
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/dmca" }],
  }),
  component: DmcaPage,
});

function DmcaPage() {
  return (
    <AppShell>
      <article className="mx-auto max-w-2xl px-5 pt-6 pb-24">
        <h1 className="text-2xl tracking-tight text-gradient-gold">DMCA & Content Policy</h1>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Last updated: May 27, 2026</p>

        <p className="mt-6 text-sm text-foreground/90">
          AlgoRhythm respects intellectual property rights and expects users to do the same. If you believe content on AlgoRhythm infringes your copyright, or violates our{" "}
          <Link to="/terms" className="text-gold">Terms of Service</Link>, please send a notice to{" "}
          <a className="text-gold" href="mailto:contactus@myalgorhythm.online">contactus@myalgorhythm.online</a>.
        </p>

        <Section title="What to include in a DMCA notice">
          <ul>
            <li>Your full legal name, address, phone number, and email.</li>
            <li>Identification of the copyrighted work (or a representative list).</li>
            <li>The exact URL(s) on AlgoRhythm of the allegedly infringing material.</li>
            <li>A statement that you have a good-faith belief the use is not authorized by the owner, agent, or law.</li>
            <li>A statement, under penalty of perjury, that the information is accurate and you are the owner or authorized to act on the owner&apos;s behalf.</li>
            <li>Your physical or electronic signature.</li>
          </ul>
          <p>Incomplete notices may not be actionable.</p>
        </Section>

        <Section title="Counter-notice">
          If your content was removed and you believe it was a mistake or misidentification, you may send a counter-notice including the items above plus a statement, under penalty of perjury, that the content was removed by mistake or misidentification, and your consent to jurisdiction of the federal court in your district.
        </Section>

        <Section title="Repeat infringers">
          Accounts that receive repeated valid copyright notices, or that repeatedly violate our Terms, will be terminated.
        </Section>

        <Section title="Other content reports">
          To report harassment, non-consensual imagery, impersonation, or other policy violations, email{" "}
          <a className="text-gold" href="mailto:contactus@myalgorhythm.online">contactus@myalgorhythm.online</a> with links and a brief description. We review reports as quickly as we can.
        </Section>

        <Section title="AI & rights">
          You must own or be licensed for any samples, vocals, beats, images, or likenesses used as inputs to AI features on AlgoRhythm. Generating content that mimics a real artist&apos;s voice or likeness without consent is prohibited.
        </Section>

        <p className="mt-8 text-xs text-muted-foreground">
          See also: <Link to="/privacy" className="text-gold">Privacy</Link> ·{" "}
          <Link to="/terms" className="text-gold">Terms</Link>
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
