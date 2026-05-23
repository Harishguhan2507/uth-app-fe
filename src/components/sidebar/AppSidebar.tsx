import { LayoutDashboard, BrainCircuit, UserSquare2, Settings2, MessagesSquare, BarChart3, History, WalletCards, FolderKanban, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import type { AuthSession } from "@/services/auth.service";
import { cn } from "@/utils";
import type { SidebarNavItem } from "@/components/sidebar/types";
import { SidebarHeader } from "@/components/sidebar/SidebarHeader";
import { SidebarFooter } from "@/components/sidebar/SidebarFooter";
import { SidebarItem } from "@/components/sidebar/SidebarItem";
import { SidebarCollapseButton } from "@/components/sidebar/SidebarCollapseButton";

export const sidebarNavItems: SidebarNavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/talent-search", label: "Find Talent", icon: BrainCircuit, ai: true },
  { to: "/my-projects", label: "My Projects", icon: FolderKanban },
  { to: "/directory", label: "Directory", icon: UserSquare2 },
  { to: "/profile", label: "My Profile", icon: UserRound },
  { to: "/notifications", label: "Notifications", icon: History },
  { to: "/analytics", label: "Analytics", icon: BarChart3, roles: ["admin"] },
  { to: "/insights", label: "Insights", icon: WalletCards, roles: ["admin"] },
  { to: "/chat", label: "Messages", icon: MessagesSquare, badge: "2" },
  { to: "/settings", label: "Settings", icon: Settings2 },
];

export const AppSidebar = ({ compact, onToggleCompact, session, onLogout }: { compact: boolean; onToggleCompact: () => void; session: AuthSession | null; onLogout: () => void }) => {
  const visibleItems = sidebarNavItems.filter(
    (item) => !item.roles || (session && item.roles.includes(session.role))
  );
  const workspaceItems = visibleItems.slice(0, 4);
  const signalItems = visibleItems.slice(4, visibleItems.length - 3);
  const otherItems = visibleItems.slice(visibleItems.length - 3);

  return (
  <motion.aside
    layout
    transition={{ type: "spring", stiffness: 280, damping: 30 }}
    className={cn("sticky top-3 hidden h-[calc(100vh-1.5rem)] rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.78)] p-3 shadow-[var(--shadow-soft)] backdrop-blur md:flex md:flex-col", compact ? "w-20" : "w-[250px]")}>
    <div className="mb-2 flex items-center justify-end">
      <SidebarCollapseButton compact={compact} onToggle={onToggleCompact} />
    </div>

    <SidebarHeader compact={compact} session={session} />

    <div className="space-y-4">
      <div>
        <p className={cn("mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))] transition-all", compact ? "opacity-0" : "opacity-100")}>Workspace</p>
        <div className="space-y-1.5">
          {workspaceItems.map((item) => <SidebarItem key={item.to} item={item} compact={compact} />)}
        </div>
      </div>
      {signalItems.length > 0 && (
        <div>
          <p className={cn("mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))] transition-all", compact ? "opacity-0" : "opacity-100")}>Signals</p>
          <div className="space-y-1.5">
            {signalItems.map((item) => <SidebarItem key={item.to} item={item} compact={compact} />)}
          </div>
        </div>
      )}
      <div>
        <p className={cn("mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))] transition-all", compact ? "opacity-0" : "opacity-100")}>Other</p>
        <div className="space-y-1.5">
          {otherItems.map((item) => <SidebarItem key={item.to} item={item} compact={compact} />)}
        </div>
      </div>
    </div>

    <SidebarFooter compact={compact} onLogout={onLogout} />
  </motion.aside>
  );
};
