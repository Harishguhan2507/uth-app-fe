import { Monitor, Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const options = [
  { key: "light", label: "Light", icon: Sun },
  { key: "dark", label: "Dark", icon: Moon },
  { key: "system", label: "System", icon: Monitor },
] as const;

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const applyTheme = (next: "light" | "dark" | "system") => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    setTheme(next);
    window.setTimeout(() => root.classList.remove("theme-transition"), 380);
  };

  if (!mounted) {
    return <div className="h-9 w-36 rounded-full glass" aria-hidden />;
  }

  return (
    <div className="relative flex h-9 items-center rounded-full p-1 glass" role="radiogroup" aria-label="Theme selector">
      <AnimatePresence>
        <motion.div
          key={theme}
          layout
          className="absolute inset-y-1 rounded-full bg-[hsl(var(--primary)/0.2)] shadow-[var(--shadow-glow)]"
          style={{ width: "calc(33.333% - 0.35rem)", left: theme === "dark" ? "calc(33.333% + 0.17rem)" : theme === "system" ? "calc(66.666% + 0.16rem)" : "0.17rem" }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
        />
      </AnimatePresence>
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = theme === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => applyTheme(opt.key)}
            className="relative z-10 flex w-12 items-center justify-center rounded-full text-[hsl(var(--muted-foreground))] transition hover:text-[hsl(var(--foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary)/0.45)]"
            title={opt.label}
          >
            <motion.span animate={{ rotate: active ? 0 : opt.key === resolvedTheme ? -8 : 0, scale: active ? 1.05 : 1 }} transition={{ duration: 0.22 }}>
              <Icon className="size-4" />
            </motion.span>
          </button>
        );
      })}
    </div>
  );
};