import type { LucideIcon } from "lucide-react";

export interface SidebarNavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  ai?: boolean;
  badge?: string;
}
