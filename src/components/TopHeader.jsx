import { Bell, Moon, Search, Sun } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useThemeStore } from "../store/theme.store";

const headerMap = {
  "/dashboard": { title: "Dashboard", subtitle: "Today overview" },
  "/find-talent": { title: "Find Talent", subtitle: "AI-assisted talent discovery" },
  "/my-projects": { title: "My Projects", subtitle: "Track project staffing status" },
  "/profile": { title: "My Profile", subtitle: "Your expertise and availability" },
  "/directory": { title: "Directory", subtitle: "Organisation-wide talent directory" },
  "/ai-features": { title: "AI Features", subtitle: "Platform intelligence modules" },
  "/settings": { title: "Settings", subtitle: "Preferences and account controls" },
};

function ThemeBtn() {
  const { theme, toggle } = useThemeStore();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-lg border border-[hsl(var(--border))] p-2 text-[hsl(var(--foreground))] transition hover:bg-[hsl(var(--muted))]"
    >
      {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-400" />}
    </button>
  );
}

function TopHeader() {
  const { pathname } = useLocation();
  const key = pathname.startsWith("/profile/") ? "/profile" : pathname;
  const header = headerMap[key] || { title: "CollabX", subtitle: "Talent & Resource Platform" };

  return (
    <header className="flex h-14 items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] px-6">
      <div>
        <h1 className="text-[15px] font-semibold text-[hsl(var(--foreground))]">{header.title}</h1>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">{header.subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden w-[360px] items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-3 py-2 md:flex">
          <Search size={15} className="text-[hsl(var(--muted-foreground))]" />
          <input
            className="w-full bg-transparent text-sm text-[hsl(var(--foreground))] outline-none placeholder:text-[hsl(var(--muted-foreground))]"
            placeholder="Search candidates, talent, skills…"
          />
        </div>
        <button className="relative rounded-lg border border-[hsl(var(--border))] p-2 text-[hsl(var(--foreground))] transition hover:bg-[hsl(var(--muted))]">
          <Bell size={16} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <ThemeBtn />
      </div>
    </header>
  );
}

export default TopHeader;
