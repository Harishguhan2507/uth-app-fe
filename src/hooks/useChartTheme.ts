import { useTheme } from "next-themes";
import { useMemo } from "react";

const read = (name: string, fallback: string) => {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
};

export const useChartTheme = () => {
  const { resolvedTheme } = useTheme();

  return useMemo(() => ({
    grid: read("--chart-grid", resolvedTheme === "dark" ? "rgba(148,163,184,.15)" : "rgba(15,23,42,.13)"),
    axis: read("--chart-axis", resolvedTheme === "dark" ? "rgba(203,213,225,.7)" : "rgba(30,41,59,.65)"),
    tooltipBg: read("--chart-tooltip-bg", resolvedTheme === "dark" ? "rgba(15,23,42,.94)" : "rgba(255,255,255,.95)"),
    tooltipBorder: read("--chart-tooltip-border", resolvedTheme === "dark" ? "rgba(148,163,184,.32)" : "rgba(148,163,184,.45)"),
    primary: "hsl(var(--primary))",
    success: "hsl(var(--success))",
    accent: "hsl(var(--accent))",
    secondary: "hsl(var(--secondary))",
  }), [resolvedTheme]);
};