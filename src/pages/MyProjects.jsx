import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { employees } from "../data/employees";

function statusClass(status) {
  if (status === "Active") return "bg-emerald-500/10 text-emerald-500";
  if (status === "Planning") return "bg-sky-500/10 text-sky-500";
  return "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]";
}

function scoreEmployee(employee, skillsNeeded) {
  const matched = skillsNeeded.filter((skill) =>
    employee.skills.some((s) => s.toLowerCase() === skill.toLowerCase()),
  );
  const skillScore = matched.length / Math.max(1, skillsNeeded.length);
  const expScore = Math.min(employee.experience / 8, 1);
  const availScore =
    employee.availability === "Available now"
      ? 1
      : employee.availability === "Part-time"
        ? 0.5
        : 0.2;
  const total = Math.min(
    100,
    Math.round(skillScore * 60 + expScore * 25 + availScore * 15),
  );
  return { matched, total };
}

function buildTeam(skillsNeeded) {
  const scored = employees
    .map((emp) => ({ ...emp, ...scoreEmployee(emp, skillsNeeded) }))
    .sort((a, b) => b.total - a.total || b.experience - a.experience);
  const lead = [...scored].sort(
    (a, b) => b.experience - a.experience || b.total - a.total,
  )[0];
  const devs = scored.filter((e) => e.id !== lead.id).slice(0, 4);
  return { lead, devs };
}

function GeneratedTeam({ team, skillsNeeded }) {
  const { lead, devs } = team;
  const coveredSkills = new Set(
    [lead, ...devs].flatMap((m) => m.skills.map((s) => s.toLowerCase())),
  );
  const missingSkills = skillsNeeded.filter(
    (s) => !coveredSkills.has(s.toLowerCase()),
  );
  const coverage = Math.round(
    ((skillsNeeded.length - missingSkills.length) /
      Math.max(1, skillsNeeded.length)) *
      100,
  );

  return (
    <div className="mt-5 rounded-xl border border-[hsl(var(--primary)/0.25)] bg-[hsl(var(--primary)/0.05)] p-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎉</span>
          <h4 className="font-semibold text-[hsl(var(--foreground))]">
            Your New Team
          </h4>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${missingSkills.length === 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}
        >
          {coverage}% skill coverage
        </span>
      </div>

      {/* Team Lead */}
      <div className="mt-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--primary))]">
          👑 Team Lead
        </p>
        <div className="flex items-center gap-3 rounded-xl border border-[hsl(var(--primary)/0.2)] bg-[hsl(var(--card))] p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.12)] text-sm font-bold text-[hsl(var(--primary))]">
            {lead.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-[hsl(var(--foreground))]">
              {lead.name}
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              {lead.role} · {lead.experience} yrs
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {lead.matched.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-[hsl(var(--primary)/0.12)] px-2 py-0.5 text-[10px] font-medium text-[hsl(var(--primary))]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-base font-bold text-[hsl(var(--primary))]">
              {lead.total}%
            </p>
            <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
              match
            </p>
          </div>
        </div>
      </div>

      {/* Developers */}
      <div className="mt-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
          💻 Developers
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {devs.map((dev) => (
            <div
              key={dev.id}
              className="flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--muted))] text-xs font-bold text-[hsl(var(--foreground))]">
                {dev.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[hsl(var(--foreground))]">
                  {dev.name}
                </p>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))]">
                  {dev.role} · {dev.experience} yrs
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {dev.matched.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[hsl(var(--border))] px-1.5 py-0.5 text-[10px] text-[hsl(var(--muted-foreground))]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-bold text-[hsl(var(--foreground))]">
                  {dev.total}%
                </p>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
                  match
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coverage note */}
      <div className="mt-3 flex items-start gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-2.5">
        <span className="mt-0.5 text-sm">
          {missingSkills.length === 0 ? "✅" : "⚠️"}
        </span>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          {missingSkills.length === 0
            ? "Full skill coverage achieved. Team is ready to start."
            : `Missing skills: ${missingSkills.join(", ")}. Consider hiring or upskilling.`}
        </p>
      </div>
    </div>
  );
}

function MyProjects() {
  const [teams, setTeams] = useState({});
  const [generating, setGenerating] = useState({});

  const handleCreateTeam = (projectId, skillsNeeded) => {
    setGenerating((prev) => ({ ...prev, [projectId]: true }));
    setTimeout(() => {
      setTeams((prev) => ({ ...prev, [projectId]: buildTeam(skillsNeeded) }));
      setGenerating((prev) => ({ ...prev, [projectId]: false }));
    }, 800);
  };

  const handleDisband = (projectId) => {
    setTeams((prev) => {
      const next = { ...prev };
      delete next[projectId];
      return next;
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
        My Projects
      </h2>
      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        {projects.map((project) => {
          const isGenerating = generating[project.id] ?? false;
          const team = teams[project.id] ?? null;

          return (
            <article
              key={project.id}
              className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">
                  {project.name}
                </h3>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(project.status)}`}
                >
                  {project.status}
                </span>
              </div>

              <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                {project.description}
              </p>
              <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">
                Due: {project.due}
              </p>

              <div className="mt-3 flex -space-x-2">
                {project.members.map((member) => (
                  <span
                    key={member}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[hsl(var(--card))] bg-[hsl(var(--primary)/0.12)] text-xs font-semibold text-[hsl(var(--primary))]"
                  >
                    {member}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.skillsNeeded.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-2.5 py-1 text-xs text-[hsl(var(--muted-foreground))]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to="/find-talent"
                  className="inline-flex items-center rounded-lg border border-[hsl(var(--border))] px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] transition hover:bg-[hsl(var(--muted))]"
                >
                  Find Talent
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    handleCreateTeam(project.id, project.skillsNeeded)
                  }
                  disabled={isGenerating}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-60"
                >
                  {isGenerating ? (
                    <>
                      <svg
                        className="size-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Building...
                    </>
                  ) : (
                    <>{team ? "🔄 Rebuild Team" : "✨ Create Team"}</>
                  )}
                </button>
                {team && (
                  <button
                    type="button"
                    onClick={() => handleDisband(project.id)}
                    className="inline-flex items-center rounded-lg border border-[hsl(var(--destructive)/0.4)] px-3 py-2 text-sm font-medium text-[hsl(var(--destructive))] transition hover:bg-[hsl(var(--destructive)/0.08)]"
                  >
                    Disband
                  </button>
                )}
              </div>

              {isGenerating && (
                <div className="mt-4 rounded-xl border border-dashed border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.05)] p-5 text-center">
                  <p className="text-sm font-medium text-[hsl(var(--primary))]">
                    Matching skills...
                  </p>
                  <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                    Scoring {employees.length} employees against required skills
                  </p>
                </div>
              )}

              {!isGenerating && team && (
                <GeneratedTeam
                  team={team}
                  skillsNeeded={project.skillsNeeded}
                />
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default MyProjects;

