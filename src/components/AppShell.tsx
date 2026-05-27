import { Plus, User, Search, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

type NavItem = {
  to: string;
  label: string;
  icon: typeof Home;
  primary?: boolean;
  authed?: boolean;
};

const items: NavItem[] = [
  { to: "/", label: "Feed", icon: Home },
  { to: "/discover", label: "Discover", icon: Search },
  { to: "/upload", label: "Post", icon: Plus, primary: true, authed: true },
  { to: "/me", label: "Me", icon: User, authed: true },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      <main className="pb-20">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 px-5 py-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <a href="/terms" className="hover:text-foreground">Terms</a>
        <a href="/privacy" className="hover:text-foreground">Privacy</a>
        <a href="/guidelines" className="hover:text-foreground">Guidelines</a>
        <a href="/dmca" className="hover:text-foreground">DMCA</a>
        <a href="/refunds" className="hover:text-foreground">Refunds</a>
        <a href="/payouts" className="hover:text-foreground">Payouts</a>
        <a href="/contact" className="hover:text-foreground">Contact</a>
      </div>
    </footer>
  );
}

function BottomNav() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const { user } = useAuth();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/85 backdrop-blur-xl">
      <ul className="mx-auto grid max-w-md grid-cols-4 px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map(({ to, label, icon: Icon, primary, authed }) => {
          let target = authed && !user ? "/login" : to;
          if (to === "/" && user) target = "/feed";
          const active = pathname === to;
          return (
            <li key={to} className="flex">
              <a
                href={target}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-1 py-3 text-[10px] uppercase tracking-[0.18em] transition-colors",
                  active ? "text-gold" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {primary ? (
                  <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-gold text-primary-foreground shadow-[0_0_24px_-4px_var(--gold)]">
                    <Icon className="h-5 w-5" />
                  </span>
                ) : (
                  <Icon className="h-5 w-5" />
                )}
                <span>{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}