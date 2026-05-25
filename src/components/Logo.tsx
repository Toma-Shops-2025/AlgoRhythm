import logoSrc from "@/assets/logo.png";
import { cn } from "@/lib/utils";

export function LogoMark({ className, size = 36 }: { className?: string; size?: number }) {
  return (
    <img
      src={logoSrc}
      alt="AlgoRhythm"
      width={size}
      height={size}
      className={cn("select-none", className)}
      draggable={false}
    />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LogoMark size={28} />
      <span className="font-display text-xl tracking-tight text-gradient-gold" style={{ fontFamily: "var(--font-display)" }}>
        AlgoRhythm
      </span>
    </div>
  );
}

export function Watermark({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none flex items-center gap-1.5 opacity-70", className)}>
      <LogoMark size={18} />
      <span
        className="text-[11px] uppercase tracking-[0.2em] text-gold"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        AlgoRhythm
      </span>
    </div>
  );
}