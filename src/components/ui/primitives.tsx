import * as React from "react";
import { cn } from "@/utils";

export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("surface rounded-2xl", className)} {...props} />
);

export const Button = ({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn(
      "relative overflow-hidden rounded-xl border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary)/0.45)]",
      "border-[hsl(var(--primary)/0.35)] bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white shadow-[var(--shadow-soft)] hover:brightness-110",
      className,
    )}
    {...props}
  >
    <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.4),transparent_55%)]" />
    <span className="relative">{children}</span>
  </button>
);

export const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "w-full rounded-xl border px-3 py-2 text-sm outline-none ring-0 transition",
      "border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]",
      "focus:border-[hsl(var(--primary)/0.7)] focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.16)]",
      className,
    )}
    {...props}
  />
);

export const Skeleton = ({ className }: { className?: string }) => <div className={cn("shimmer rounded-xl", className)} />;
