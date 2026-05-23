import { Pencil, Trash2, Users } from "lucide-react";
import type { Team } from "@/types";

interface Props {
  team: Team;
  onEdit: (team: Team) => void;
  onDelete: (teamId: string) => void;
  onToggleStatus: (team: Team) => void;
}

const STATUS_STYLES: Record<Team["status"], string> = {
  open: "bg-emerald-500/10 text-emerald-500",
  closed: "bg-slate-500/10 text-slate-500",
};

const WORK_MODE_STYLES: Record<Team["workMode"], string> = {
  remote: "bg-sky-500/10 text-sky-500",
  hybrid: "bg-violet-500/10 text-violet-500",
  onsite: "bg-amber-500/10 text-amber-500",
};

export const TeamCard = ({ team, onEdit, onDelete, onToggleStatus }: Props) => (
  <article className="group rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-floating)] hover:-translate-y-0.5">
    {/* Top row */}
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="truncate font-semibold">{team.name}</h3>
        <p className="mt-0.5 line-clamp-2 text-xs text-[hsl(var(--muted-foreground))]">{team.description}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[team.status]}`}>
          {team.status}
        </span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${WORK_MODE_STYLES[team.workMode]}`}>
          {team.workMode}
        </span>
      </div>
    </div>

    {/* Team Lead */}
    <div className="mt-3 flex items-center gap-2.5">
      {team.teamLead ? (
        <>
          <img
            src={team.teamLead.avatar}
            alt={team.teamLead.name}
            className="size-8 rounded-xl border border-[hsl(var(--border))]"
          />
          <div>
            <p className="text-xs font-medium">{team.teamLead.name}</p>
            <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Team Lead · {team.teamLead.role}</p>
          </div>
        </>
      ) : (
        <p className="text-xs text-[hsl(var(--muted-foreground))]">No lead assigned</p>
      )}
    </div>

    {/* Member avatars */}
    {team.members.length > 0 && (
      <div className="mt-3 flex items-center gap-2">
        <div className="flex -space-x-2">
          {team.members.slice(0, 5).map((m) => (
            <img
              key={m.id}
              src={m.avatar}
              alt={m.name}
              title={m.name}
              className="size-7 rounded-full border-2 border-[hsl(var(--card))]"
            />
          ))}
          {team.members.length > 5 && (
            <span className="flex size-7 items-center justify-center rounded-full border-2 border-[hsl(var(--card))] bg-[hsl(var(--muted))] text-[10px] font-semibold text-[hsl(var(--muted-foreground))]">
              +{team.members.length - 5}
            </span>
          )}
        </div>
        <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
          <Users className="size-3" />
          {team.members.length} / {team.teamSize}
        </span>
      </div>
    )}

    {/* Skills */}
    <div className="mt-3 flex flex-wrap gap-1.5">
      {team.requiredSkills.map((skill) => (
        <span
          key={skill}
          className="rounded-full border border-[hsl(var(--border))] px-2.5 py-0.5 text-[11px] text-[hsl(var(--muted-foreground))]"
        >
          {skill}
        </span>
      ))}
    </div>

    {/* Footer */}
    <div className="mt-4 flex items-center justify-between gap-2">
      <button
        type="button"
        onClick={() => onToggleStatus(team)}
        className="rounded-lg border border-[hsl(var(--border))] px-3 py-1.5 text-xs font-medium transition hover:bg-[hsl(var(--muted))]"
      >
        Mark {team.status === "open" ? "Closed" : "Open"}
      </button>
      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={() => onEdit(team)}
          aria-label="Edit team"
          className="rounded-lg border border-[hsl(var(--border))] p-1.5 transition hover:bg-[hsl(var(--muted))]"
        >
          <Pencil className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(team.id)}
          aria-label="Delete team"
          className="rounded-lg border border-[hsl(var(--border))] p-1.5 text-[hsl(var(--destructive))] transition hover:bg-[hsl(var(--destructive)/0.1)]"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>
    </div>
  </article>
);
