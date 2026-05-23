import { Link } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

export const SidebarFooter = ({ compact, onLogout }: { compact: boolean; onLogout: () => void }) => (
  <div className="mt-auto space-y-2">
    <Link to="/settings" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[hsl(var(--muted-foreground))] transition hover:bg-[hsl(var(--card-hover))] hover:text-[hsl(var(--foreground))]">
      <Settings className="size-4 shrink-0" />
      <span className={cn("overflow-hidden whitespace-nowrap transition-all duration-200", compact ? "max-w-0 opacity-0" : "max-w-40 opacity-100")}>Settings</span>
    </Link>

    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onLogout}
      className={cn("flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-[hsl(var(--muted-foreground))] transition hover:bg-[hsl(var(--card-hover))] hover:text-[hsl(var(--foreground))]")}
    >
      <LogOut className="size-4 shrink-0" />
      <span className={cn("overflow-hidden whitespace-nowrap transition-all duration-200", compact ? "max-w-0 opacity-0" : "max-w-20 opacity-100")}>Log out</span>
    </motion.button>
  </div>
);
