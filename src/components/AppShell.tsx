import { Link, useLocation } from "@tanstack/react-router";
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
      <BottomNav />
    </div>
  );
}

function BottomNav() {
  const location = useLocation();
  const { user } = useAuth();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/85 backdrop-blur-xl">
      <ul className="mx-auto grid max-w-md grid-cols-4 px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map(({ to, label, icon: Icon, primary, authed }) => {
          const target = authed && !user ? "/login" : to;
          const active = location.pathname === to;
          return (
            <li key={to} className="flex">
              <Link
                to={target}
                search={authed && !user ? { redirect: to } : undefined}
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
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}