import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Mail, AlertTriangle, ShieldAlert, FileText, CreditCard } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Support — AlgoRhythm" },
      { name: "description", content: "Get in touch with AlgoRhythm support, report abuse, or send a copyright notice." },
      { property: "og:title", content: "Contact & Support — AlgoRhythm" },
      { property: "og:description", content: "Contact AlgoRhythm support." },
      { property: "og:url", content: "https://myalgorhythm.online/contact" },
    ],
    links: [{ rel: "canonical", href: "https://myalgorhythm.online/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <AppShell>
      <article className="mx-auto max-w-2xl px-5 pt-6 pb-24">
        <h1 className="text-2xl tracking-tight text-gradient-gold">Contact & Support</h1>
        <p className="mt-2 text-sm text-foreground/90">
          The fastest way to reach us is by email. We respond within 3 business days, usually much sooner.
        </p>

        <div className="mt-6 grid gap-3">
          <Card icon={Mail} title="General support" desc="Questions, bugs, account help.">
            <a className="text-gold" href="mailto:contactus@myalgorhythm.online">contactus@myalgorhythm.online</a>
          </Card>
          <Card icon={ShieldAlert} title="Report abuse or harmful content" desc="In-app: tap ⋮ on any post or profile. Urgent (CSAM, threats, doxxing):">
            <a className="text-gold" href="mailto:contactus@myalgorhythm.online?subject=URGENT%20Trust%20%26%20Safety">contactus@myalgorhythm.online</a>
            <span className="text-muted-foreground"> (subject: URGENT)</span>
          </Card>
          <Card icon={FileText} title="Copyright (DMCA)" desc="See requirements on our DMCA page.">
            <Link to="/dmca" className="text-gold">DMCA & Content Policy →</Link>
          </Card>
          <Card icon={CreditCard} title="Billing & refunds" desc="Subscriptions, tips, refund requests.">
            <a className="text-gold" href="mailto:contactus@myalgorhythm.online?subject=Billing">contactus@myalgorhythm.online</a>
            <span className="text-muted-foreground"> · </span>
            <Link to="/refunds" className="text-gold">Refund policy →</Link>
          </Card>
          <Card icon={AlertTriangle} title="Security disclosure" desc="Found a vulnerability? Please disclose responsibly.">
            <a className="text-gold" href="mailto:contactus@myalgorhythm.online?subject=Security">contactus@myalgorhythm.online</a>
          </Card>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          AlgoRhythm — a publication by an independent operator. For legal notices, mail address provided on request.
        </p>
      </article>
    </AppShell>
  );
}

function Card({ icon: Icon, title, desc, children }: {
  icon: typeof Mail; title: string; desc: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-card p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-gold" />
        <h2 className="text-sm font-medium">{title}</h2>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
      <div className="mt-2 text-sm">{children}</div>
    </div>
  );
}
