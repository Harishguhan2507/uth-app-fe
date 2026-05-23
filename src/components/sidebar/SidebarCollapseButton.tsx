import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SidebarCollapseButton = ({ compact, onToggle }: { compact: boolean; onToggle: () => void }) => (
  <motion.button
    type="button"
    onClick={onToggle}
    whileTap={{ scale: 0.95 }}
    className="inline-flex items-center rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.7)] p-1.5 text-[hsl(var(--muted-foreground))] transition hover:text-[hsl(var(--foreground))]"
    aria-label={compact ? "Expand sidebar" : "Collapse sidebar"}
  >
    <motion.span animate={{ rotate: compact ? 180 : 0 }} transition={{ duration: 0.24 }}>
      {compact ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
    </motion.span>
  </motion.button>
);