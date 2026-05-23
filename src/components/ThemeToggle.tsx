import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/theme.store";

export const ThemeToggle = () => {
  const { theme, toggle } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-lg border border-[hsl(var(--border))] p-2 transition hover:bg-[hsl(var(--muted))]"
    >
      {isDark
        ? <Sun size={16} className="text-amber-400" />
        : <Moon size={16} className="text-indigo-400" />
      }
    </button>
  );
};
