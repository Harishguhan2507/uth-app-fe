import {
  BookUser,
  Briefcase,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { employees } from "../data/employees";

const mainItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  {
    label: "Find Talent",
    to: "/find-talent",
    icon: Search,
    badge: employees.length,
  },
  { label: "My Projects", to: "/my-projects", icon: Briefcase },
  { label: "My Profile", to: "/profile", icon: User },
  { label: "Directory", to: "/directory", icon: BookUser },
];

// const aiItems = [{ label: 'AI Features', to: '/ai-features', icon: Sparkles }];

function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("uth_user") || "{}");
  const initials = user.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "PM";

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-indigo-500 text-white"
        : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("uth_user");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[220px] flex-col bg-slate-900 p-4">
      <div>
        <h1 className="text-xl font-semibold text-white">CollabX</h1>
        <p className="mt-1 text-xs text-slate-500">
          Talent & Resource Platform
        </p>
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {user.name || "Demo PM"}
            </p>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <p className="text-xs text-slate-400">{user.role || "PM"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Main
        </p>
        <nav className="space-y-1">
          {mainItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} className={navClass}>
                <Icon size={16} />
                <span className="flex-1">{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-slate-200">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mt-5">
        {/* <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
          AI Tools
        </p> */}
        <nav className="space-y-1">
          {/* {aiItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} className={navClass}>
                <Icon size={16} />
                {item.label}
              </NavLink>
            );
          })} */}
        </nav>
      </div>

      <div className="mt-auto space-y-1">
        <NavLink to="/settings" className={navClass}>
          <Settings size={16} />
          Settings
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-slate-200"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
