import { useMemo } from "react";
import { useThemeStore } from "@/store/theme.store";

const read = (name: string, fallback: string) => {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
};

export const useChartTheme = () => {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  return useMemo(() => ({
    grid: read("--chart-grid", isDark ? "rgba(148,163,184,.15)" : "rgba(15,23,42,.13)"),
    axis: read("--chart-axis", isDark ? "rgba(203,213,225,.7)" : "rgba(30,41,59,.65)"),
    tooltipBg: read("--chart-tooltip-bg", isDark ? "rgba(15,23,42,.94)" : "rgba(255,255,255,.95)"),
    tooltipBorder: read("--chart-tooltip-border", isDark ? "rgba(148,163,184,.32)" : "rgba(148,163,184,.45)"),
    primary: "hsl(var(--primary))",
    success: "hsl(var(--success))",
    accent: "hsl(var(--accent))",
    secondary: "hsl(var(--secondary))",
  }), [isDark]);
};
