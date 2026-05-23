import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/utils";
import type { SidebarNavItem } from "@/components/sidebar/types";
import { SidebarTooltip } from "@/components/sidebar/SidebarTooltip";

const labelVariants: Variants = {
  hidden: { opacity: 0, x: -4 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.18 } },
};

export const SidebarItem = ({ item, compact }: { item: SidebarNavItem; compact: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <SidebarTooltip show={compact && hovered} label={item.label} />
      <NavLink to={item.to} className="group relative block rounded-xl px-3 py-2.5 text-sm">
        {({ isActive }) => (
          <>
            {isActive ? (
              <motion.span
                layoutId="active-nav-pill"
                className={cn(
                  "absolute inset-0 rounded-xl border",
                  "border-[hsl(var(--border))] bg-[hsl(var(--card-hover))]",
                )}
                transition={{ type: "spring", stiffness: 340, damping: 28 }}
              />
            ) : null}

            <motion.span
              whileHover={{ scale: 1.02 }}
              className={cn("relative flex items-center gap-3 text-[hsl(var(--muted-foreground))] transition group-hover:text-[hsl(var(--foreground))]", isActive && "text-[hsl(var(--foreground))]")}
            >
              <motion.span whileHover={{ y: -1 }} className="shrink-0">
                <Icon className="size-4" />
              </motion.span>
              <motion.span variants={labelVariants} initial={compact ? "hidden" : "visible"} animate={compact ? "hidden" : "visible"} className="overflow-hidden whitespace-nowrap">
                {item.label}
              </motion.span>
              {!compact && item.badge ? (
                <span className="ml-auto rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-500">
                  {item.badge}
                </span>
              ) : null}
            </motion.span>
          </>
        )}
      </NavLink>
    </div>
  );
};
