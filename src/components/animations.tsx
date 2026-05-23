import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/primitives";
import { cn } from "@/utils";

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 18, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, filter: "blur(6px)", transition: { duration: 0.22 } },
};

export const listVariants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const itemVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32 } },
};

export const AnimatedPage = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.section variants={pageVariants} initial="initial" animate="animate" exit="exit" className={className}>{children}</motion.section>
);

export const StaggerContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div variants={listVariants} initial="initial" animate="animate" className={className}>{children}</motion.div>
);

export const FadeIn = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div variants={itemVariants} className={className}>{children}</motion.div>
);

export const AnimatedCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div variants={itemVariants} whileHover={{ y: -4, scale: 1.01 }} transition={{ type: "spring", stiffness: 220, damping: 16 }}>
    <Card className={cn("relative overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-[hsl(var(--primary)/0.22)] before:[mask-image:linear-gradient(120deg,transparent,white,transparent)] before:opacity-0 hover:before:opacity-100 before:transition-opacity", className)}>{children}</Card>
  </motion.div>
);

export const FloatingElement = ({ className }: { className?: string }) => (
  <motion.div
    aria-hidden
    className={cn("absolute rounded-full bg-cyan-400/20 blur-3xl", className)}
    animate={{ y: [0, -16, 0], x: [0, 10, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  />
);

export const AIThinkingLoader = () => (
  <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.12)] px-3 py-1 text-xs text-[hsl(var(--foreground))]">
    <span className="relative flex size-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300" />
      <span className="relative inline-flex size-2 rounded-full bg-cyan-200" />
    </span>
    AI is thinking
  </div>
);

export const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const started = performance.now();
    const duration = 900;
    const run = (ts: number) => {
      const progress = Math.min(1, (ts - started) / duration);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [value, reduced]);

  return <span>{display}{suffix}</span>;
};

export const SkeletonCard = ({ className }: { className?: string }) => <div className={cn("shimmer rounded-2xl", className)} />;

export const useMagnetic = () => {
  return useMemo(
    () => ({
      onMouseMove: (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        target.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
      },
      onMouseLeave: (event: React.MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.style.transform = "translate(0px, 0px)";
      },
    }),
    [],
  );
};
