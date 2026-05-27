import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

// Public page required by Google Play's Data Safety policy: anyone (signed in
// or not) must be able to find clear instructions for deleting their account.
export const Route = createFileRoute("/account-deletion")({
  head: () => ({
    meta: [
      { title: "Delete your AlgoRhythm account" },
      { name: "description", content: "Instructions for permanently deleting your AlgoRhythm account and all associated data." },
      { property: "og:title", content: "Delete your AlgoRhythm account" },
      { property: "og:description", content: "How to permanently delete your AlgoRhythm account." },
      { property: "og:url", content: "https://myalgorhythm.online/account-deletion" },
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/account-deletion" }],
  }),
  component: AccountDeletionPage,
});

function AccountDeletionPage() {
  return (
    <AppShell>
      <article className="mx-auto max-w-2xl px-5 pt-6 pb-24">
        <h1 className="text-2xl tracking-tight text-gradient-gold">Delete your AlgoRhythm account</h1>
        <p className="mt-2 text-sm text-foreground/90">
          You can permanently delete your AlgoRhythm account and all associated data at any time.
        </p>

        <Section title="Delete from inside the app">
          <ol>
            <li>Open AlgoRhythm and sign in.</li>
            <li>Go to <Link to="/me" className="text-gold">Me</Link> → scroll to the bottom.</li>
            <li>Tap <strong>Delete my account</strong> and confirm.</li>
          </ol>
          <p>The deletion is immediate. You'll be signed out and your data removed.</p>
        </Section>

        <Section title="Delete by email">
          If you can't access your account, email <a className="text-gold" href="mailto:contactus@myalgorhythm.online?subject=Account%20Deletion%20Request">contactus@myalgorhythm.online</a> from the address on your account with the subject <strong>"Account Deletion Request"</strong>. We process requests within 7 days.
        </Section>

        <Section title="What gets deleted">
          <ul>
            <li>Your profile (handle, display name, avatar, bio, links).</li>
            <li>All posts you created, including the audio/video files.</li>
            <li>Your comments, likes, follows, and follower relationships.</li>
            <li>Your account credentials and authentication records.</li>
            <li>Any blocks you've created.</li>
          </ul>
        </Section>

        <Section title="What we may retain">
          <ul>
            <li><strong>Payment records</strong> — tip and subscription transaction history is retained for up to 7 years as required by tax and financial regulations. These records are tied to your previous user ID but do not include profile information.</li>
            <li><strong>Moderation records</strong> — if your account was actioned for policy violations, we retain a minimal record (user ID, date, reason) to prevent ban evasion.</li>
            <li><strong>Backups</strong> — encrypted backups are purged on a rolling 30-day schedule.</li>
          </ul>
        </Section>

        <Section title="Cancel subscriptions first">
          Deleting your account does NOT automatically cancel active paid subscriptions to creators or AlgoRhythm Pro. Please cancel them from your account page first, or email us and we'll handle it together.
        </Section>

        <p className="mt-8 text-xs text-muted-foreground">
          See also: <Link to="/privacy" className="text-gold">Privacy Policy</Link> · <Link to="/contact" className="text-gold">Contact</Link>
        </p>
      </article>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 text-sm text-foreground/90 space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1">
      <h2 className="text-base font-medium text-gold">{title}</h2>
      {children}
    </section>
  );
}