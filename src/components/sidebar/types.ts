import type { LucideIcon } from "lucide-react";
import type { UserRole } from "@/types";

export interface SidebarNavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  ai?: boolean;
  badge?: string;
  roles?: UserRole[];
}
