import { LayoutDashboard, BrainCircuit, UserSquare2, Settings2, MessagesSquare, BarChart3, History, WalletCards, CircleHelp } from "lucide-react";
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
  { to: "/notifications", label: "History", icon: History },
  { to: "/analytics", label: "Analysis", icon: BarChart3 },
  { to: "/insights", label: "Finances", icon: WalletCards },
  { to: "/chat", label: "Messages", icon: MessagesSquare, badge: "2" },
  { to: "/directory", label: "Documents", icon: UserSquare2 },
  { to: "/talent-search", label: "Products", icon: BrainCircuit, ai: true },
  { to: "/team-builder", label: "Help", icon: CircleHelp },
  { to: "/settings", label: "Settings", icon: Settings2 },
];

export const AppSidebar = ({ compact, onToggleCompact, session, onLogout }: { compact: boolean; onToggleCompact: () => void; session: AuthSession | null; onLogout: () => void }) => (
  <motion.aside
    layout
    transition={{ type: "spring", stiffness: 280, damping: 30 }}
    className={cn("sticky top-3 hidden h-[calc(100vh-1.5rem)] rounded-3xl border border-[#e5e7eb] bg-[#f8fafc] p-3 shadow-sm md:flex md:flex-col", compact ? "w-20" : "w-[250px]")}
  >
    <div className="mb-2 flex items-center justify-end">
      <SidebarCollapseButton compact={compact} onToggle={onToggleCompact} />
    </div>

    <SidebarHeader compact={compact} session={session} />

    <div className="space-y-4">
      <div>
        <p className={cn("mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9ca3af] transition-all", compact ? "opacity-0" : "opacity-100")}>Banking</p>
        <div className="space-y-1.5">
          {sidebarNavItems.slice(0, 4).map((item) => (
            <SidebarItem key={item.to} item={item} compact={compact} />
          ))}
        </div>
      </div>
      <div>
        <p className={cn("mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9ca3af] transition-all", compact ? "opacity-0" : "opacity-100")}>Services</p>
        <div className="space-y-1.5">
          {sidebarNavItems.slice(4, 7).map((item) => (
            <SidebarItem key={item.to} item={item} compact={compact} />
          ))}
        </div>
      </div>
      <div>
        <p className={cn("mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9ca3af] transition-all", compact ? "opacity-0" : "opacity-100")}>Other</p>
        <div className="space-y-1.5">
          {sidebarNavItems.slice(7).map((item) => (
            <SidebarItem key={item.to} item={item} compact={compact} />
          ))}
        </div>
      </div>
    </div>

    <SidebarFooter compact={compact} onLogout={onLogout} />
  </motion.aside>
);