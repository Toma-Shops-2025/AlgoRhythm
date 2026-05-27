import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — AlgoRhythm" },
      { name: "description", content: "The rules for using AlgoRhythm — accounts, content, payments, and AI-generated media." },
      { property: "og:title", content: "Terms of Service — AlgoRhythm" },
      { property: "og:description", content: "Rules for using AlgoRhythm." },
      { property: "og:url", content: "https://myalgorhythm.online/terms" },
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <AppShell>
      <article className="mx-auto max-w-2xl px-5 pt-6 pb-24">
        <h1 className="text-2xl tracking-tight text-gradient-gold">Terms of Service</h1>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Last updated: May 27, 2026</p>

        <p className="mt-6 text-sm text-foreground/90">
          These Terms govern your use of AlgoRhythm, operated by Timothy Adkins (&quot;we&quot;). By using
          AlgoRhythm you agree to these Terms. If you don&apos;t agree, don&apos;t use the service.
        </p>

        <Section title="Accounts">
          You must be 13+ (16+ in the EEA) to create an account. You&apos;re responsible for your credentials and everything posted under your account. One person per account; no impersonation.
        </Section>

        <Section title="Your content">
          You keep ownership of audio, video, images, and text you upload. By posting, you grant us a worldwide, non-exclusive, royalty-free license to host, store, reproduce, transcode, display, and stream your content for the purpose of operating and promoting the service. This license ends when you delete the content, except for copies retained in backups for a limited time.
        </Section>

        <Section title="AI-generated content">
          AlgoRhythm offers AI features (lyric transcription, cover art, music-video scenes, post metadata). You are responsible for the prompts you submit and the outputs you publish. Do not use AI features to generate content that infringes someone else&apos;s rights or violates the rules below.
        </Section>

        <Section title="Acceptable use — you may NOT post">
          <ul>
            <li>Content you don&apos;t have rights to (samples, beats, vocals, images, voice clones, or trademarks you don&apos;t own or have licensed).</li>
            <li>Sexual content involving minors, or any content that exploits minors.</li>
            <li>Non-consensual intimate imagery, doxxing, threats, harassment, or incitement to violence.</li>
            <li>Hate speech, illegal content, malware, spam, or schemes to defraud users.</li>
            <li>Voice or likeness of a real person without their consent.</li>
            <li>Attempts to scrape, reverse engineer, or disrupt the service.</li>
          </ul>
        </Section>

        <Section title="Payments, tips & subscriptions">
          Tips and Pro subscriptions are processed by Stripe. Subscriptions renew automatically until canceled in your billing portal. Tips are non-refundable except where required by law. Platform fees and creator payouts are disclosed at checkout. Taxes may apply based on your location.
        </Section>

        <Section title="Termination">
          You can delete your account at any time from{" "}
          <Link to="/me" className="text-gold">your profile</Link>. We may suspend or terminate accounts that violate these Terms or applicable law, with or without notice.
        </Section>

        <Section title="Disclaimers">
          AlgoRhythm is provided &quot;as is&quot;. We don&apos;t warrant the service will be uninterrupted, error-free, or that AI outputs will be accurate, lawful, or fit for any purpose. To the maximum extent allowed by law, we disclaim all implied warranties.
        </Section>

        <Section title="Limitation of liability">
          To the fullest extent permitted by law, our total liability for any claim arising out of or relating to the service is limited to the greater of (a) the amount you paid us in the 12 months before the claim or (b) USD $100.
        </Section>

        <Section title="Indemnity">
          You agree to indemnify Timothy Adkins and AlgoRhythm from any claim arising out of your content or your violation of these Terms.
        </Section>

        <Section title="Governing law">
          These Terms are governed by the laws of the United States and the state of the operator&apos;s residence, without regard to conflict-of-laws rules. Disputes will be resolved in the courts located there, unless you have non-waivable rights to your local courts.
        </Section>

        <Section title="Changes">
          We may update these Terms. Material changes will be announced in-app. Continued use after changes means you accept the new Terms.
        </Section>

        <p className="mt-8 text-xs text-muted-foreground">
          Contact: <a className="text-gold" href="mailto:contactus@myalgorhythm.online">contactus@myalgorhythm.online</a> ·{" "}
          <Link to="/privacy" className="text-gold">Privacy</Link> ·{" "}
          <Link to="/dmca" className="text-gold">DMCA</Link>
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