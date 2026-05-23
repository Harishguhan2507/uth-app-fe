import { Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

const headerMap = {
  "/dashboard": { title: "Dashboard", subtitle: "Today overview" },
  "/find-talent": {
    title: "Find Talent",
    subtitle: "AI-assisted talent discovery",
  },
  "/my-projects": {
    title: "My Projects",
    subtitle: "Track project staffing status",
  },
  "/profile": {
    title: "My Profile",
    subtitle: "Your expertise and availability",
  },
  "/directory": {
    title: "Directory",
    subtitle: "Organisation-wide talent directory",
  },
  "/ai-features": {
    title: "AI Features",
    subtitle: "Platform intelligence modules",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Preferences and account controls",
  },
};

function TopHeader() {
  const { pathname } = useLocation();
  const key = pathname.startsWith("/profile/") ? "/profile" : pathname;
  const header = headerMap[key] || {
    title: "CollabX",
    subtitle: "Talent & Resource Platform",
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h1 className="text-[15px] font-semibold text-slate-900">
          {header.title}
        </h1>
        <p className="text-xs text-slate-500">{header.subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden w-[360px] items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 md:flex">
          <Search size={15} className="text-slate-400" />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            placeholder="Search candidates, talent, skills…"
          />
        </div>
        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </div>
    </header>
  );
}

export default TopHeader;
