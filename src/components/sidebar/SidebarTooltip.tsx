import { motion, type Variants } from "framer-motion";
import { cn } from "@/utils";

const tooltipVariants: Variants = {
  hidden: { opacity: 0, x: -4, scale: 0.98 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.18 } },
};

export const SidebarTooltip = ({ show, label }: { show: boolean; label: string }) => (
  <motion.div
    initial="hidden"
    animate={show ? "visible" : "hidden"}
    variants={tooltipVariants}
    className={cn("pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-40 -translate-y-1/2 whitespace-nowrap rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--glass-bg-strong))] px-2.5 py-1 text-xs text-[hsl(var(--foreground))] shadow-[var(--shadow-floating)]")}
  >
    {label}
  </motion.div>
);