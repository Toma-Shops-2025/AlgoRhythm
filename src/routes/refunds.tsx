import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/refunds")({
  head: () => ({
    meta: [
      { title: "Refund Policy — AlgoRhythm" },
      { name: "description", content: "Refund and cancellation policy for AlgoRhythm Pro subscriptions, creator subscriptions, and tips." },
      { property: "og:title", content: "Refund Policy — AlgoRhythm" },
      { property: "og:description", content: "How refunds and cancellations work on AlgoRhythm." },
      { property: "og:url", content: "https://myalgorhythm.online/refunds" },
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/refunds" }],
  }),
  component: RefundsPage,
});

function RefundsPage() {
  return (
    <AppShell>
      <article className="mx-auto max-w-2xl px-5 pt-6 pb-24">
        <h1 className="text-2xl tracking-tight text-gradient-gold">Refund & Cancellation Policy</h1>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Last updated: May 27, 2026</p>

        <Section title="AlgoRhythm Pro subscriptions">
          <ul>
            <li>Cancel anytime in your <Link to="/me" className="text-gold">account</Link> → Manage subscription. You keep Pro access until the end of the current billing period.</li>
            <li>We don't pro-rate refunds for partial months or unused yearly time.</li>
            <li>If you were billed by mistake (duplicate charge, billing after cancellation), email <a className="text-gold" href="mailto:contactus@myalgorhythm.online">contactus@myalgorhythm.online</a> within 14 days for a full refund.</li>
          </ul>
        </Section>

        <Section title="Creator subscriptions">
          <ul>
            <li>You can cancel a creator subscription at any time from your account page. Access continues until the end of the paid month.</li>
            <li>Creator subscriptions are non-refundable except in cases of fraud, billing error, or content that violates our <Link to="/guidelines" className="text-gold">Community Guidelines</Link>.</li>
          </ul>
        </Section>

        <Section title="Tips">
          <p>Tips are <strong>final and non-refundable</strong>. Tips are gifts sent directly to creators and are not subject to cancellation. Exceptions:</p>
          <ul>
            <li>Unauthorized charge / payment fraud — contact us within 14 days.</li>
            <li>The recipient creator account is terminated for policy violations before the tip is processed.</li>
          </ul>
        </Section>

        <Section title="EU/UK consumers">
          If you're a consumer in the EU or UK, you may have a 14-day right of withdrawal on subscription purchases under the Consumer Rights Directive. By starting to use the digital service immediately at checkout, you waive this right — but you can still cancel future renewals at any time.
        </Section>

        <Section title="How to request a refund">
          Email <a className="text-gold" href="mailto:contactus@myalgorhythm.online">contactus@myalgorhythm.online</a> from the address on your account. Include the date, amount, and what you'd like refunded. We respond within 3 business days.
        </Section>

        <Section title="Chargebacks">
          We prefer working directly with you. Filing a chargeback without first contacting us may result in account suspension while the dispute is investigated.
        </Section>

        <p className="mt-8 text-xs text-muted-foreground">
          See also: <Link to="/terms" className="text-gold">Terms</Link> · <Link to="/payouts" className="text-gold">Creator Payouts</Link> · <Link to="/contact" className="text-gold">Contact</Link>
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
