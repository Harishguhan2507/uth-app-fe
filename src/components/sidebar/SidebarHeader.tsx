import { Power } from "lucide-react";
import { cn } from "@/utils";
import type { AuthSession } from "@/services/auth.service";

const initials = (name?: string) => (name ? name.split(" ").slice(0, 2).map((p) => p[0]).join("").toUpperCase() : "U");

export const SidebarHeader = ({ compact, session }: { compact: boolean; session: AuthSession | null }) => (
  <div className="mb-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3">
    <div className="flex items-center gap-2">
      <div className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ef4444] to-[#991b1b] text-sm font-semibold text-white">
        {initials(session?.name)}
      </div>
      <div className={cn("overflow-hidden transition-all duration-200", compact ? "max-w-0 opacity-0" : "max-w-48 opacity-100")}>
        <p className="truncate text-sm font-semibold leading-4">{session?.name ?? "User"}</p>
        <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Session ends in 9 min</p>
      </div>
      <button className="ml-auto grid size-8 place-items-center rounded-full bg-emerald-100 text-emerald-600">
        <Power size={14} />
      </button>
    </div>
  </div>
);
