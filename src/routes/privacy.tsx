import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — AlgoRhythm" },
      { name: "description", content: "How AlgoRhythm collects, uses, and protects your data." },
      { property: "og:title", content: "Privacy Policy — AlgoRhythm" },
      { property: "og:description", content: "How AlgoRhythm collects, uses, and protects your data." },
      { property: "og:url", content: "https://myalgorhythm.online/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <AppShell>
      <article className="mx-auto max-w-2xl px-5 pt-6 pb-24 prose-legal">
        <h1 className="text-2xl tracking-tight text-gradient-gold">Privacy Policy</h1>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Last updated: May 27, 2026</p>

        <p className="mt-6 text-sm text-foreground/90">
          AlgoRhythm (&quot;we&quot;, &quot;us&quot;) is operated by Timothy Adkins. This policy explains
          what we collect, why, and the choices you have. Questions:{" "}
          <a href="mailto:contactus@myalgorhythm.online" className="text-gold">contactus@myalgorhythm.online</a>.
        </p>

        <Section title="Information we collect">
          <ul>
            <li><b>Account data</b>: email, display name, handle, avatar, and (if you sign in with Google) basic profile info from your Google account.</li>
            <li><b>Content you upload</b>: audio, video, cover images, titles, captions, tags, and any text you submit.</li>
            <li><b>Usage data</b>: posts you view, like, comment on, follow; device, browser, and approximate location derived from IP.</li>
            <li><b>Payments</b>: handled by Stripe. We do not see or store full card numbers; we store transaction IDs and amounts for tips and subscriptions.</li>
          </ul>
        </Section>

        <Section title="How we use your data">
          <ul>
            <li>Provide the service: hosting your posts, the feed, comments, likes, follows, tipping, and Pro subscriptions.</li>
            <li>Process audio with AI providers (e.g. Google Gemini via Lovable AI Gateway) to transcribe lyrics, generate cover art, scene images, and post metadata when you opt in.</li>
            <li>Prevent abuse, enforce our Terms, comply with legal obligations.</li>
            <li>Email you about your account or important changes (no marketing email is sent without consent).</li>
          </ul>
        </Section>

        <Section title="Third parties we share data with">
          <ul>
            <li><b>Supabase</b> — database, auth, file storage.</li>
            <li><b>Stripe</b> — payments, subscriptions, tax forms.</li>
            <li><b>Google / Lovable AI Gateway</b> — AI generation and transcription of content you submit for those features.</li>
            <li><b>Cloudflare / Lovable</b> — hosting and edge delivery.</li>
          </ul>
          <p>We do not sell your personal data.</p>
        </Section>

        <Section title="AI-generated content">
          Audio you submit for lyric transcription is sent to our AI provider only to produce the transcript and is not used by us to train models.
          Cover images and scenes are generated from prompts you supply. You are responsible for content you publish.
        </Section>

        <Section title="Cookies & local storage">
          We use cookies and local storage strictly for sign-in sessions and remembering your preferences. We do not use third-party advertising cookies.
        </Section>

        <Section title="Your rights">
          You can edit or delete your posts at any time. You can permanently delete your account and associated data from{" "}
          <Link to="/me" className="text-gold">your profile settings</Link>. EU/UK/California residents have additional rights (access, correction, portability) — email us to exercise them.
        </Section>

        <Section title="Data retention">
          Account, profile, and post data are kept until you delete them or your account. Payment records are retained as required by tax/accounting law. Backups are purged on a rolling 30-day cycle.
        </Section>

        <Section title="Children">
          AlgoRhythm is not directed to children under 13 (or under 16 in the EEA). Do not use the service if you are under those ages.
        </Section>

        <Section title="Changes">
          We may update this policy. Material changes will be announced in-app or by email. Continued use means you accept the updated policy.
        </Section>

        <p className="mt-8 text-xs text-muted-foreground">
          See also: <Link to="/terms" className="text-gold">Terms of Service</Link> ·{" "}
          <Link to="/dmca" className="text-gold">DMCA / Content Policy</Link>
        </p>
      </article>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 text-sm text-foreground/90 space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:underline-offset-2">
      <h2 className="text-base font-medium text-gold">{title}</h2>
      {children}
    </section>
  );
}
