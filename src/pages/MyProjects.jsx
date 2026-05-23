import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { employees } from "../data/employees";

function statusClass(status) {
  if (status === "Active")
    return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";
  if (status === "Planning")
    return "bg-blue-100 text-blue-700 dark:bg-sky-500/10 dark:text-sky-400";
  return "bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400";
}

// Score each employee against a project's required skills
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

// Pick 1 TL (highest experience + score) and up to 4 devs
function buildTeam(skillsNeeded) {
  const scored = employees
    .map((emp) => ({
      ...emp,
      ...scoreEmployee(emp, skillsNeeded),
    }))
    .sort((a, b) => b.total - a.total || b.experience - a.experience);

  // TL = highest experience among top scorers
  const lead = [...scored].sort(
    (a, b) => b.experience - a.experience || b.total - a.total,
  )[0];
  const devs = scored.filter((e) => e.id !== lead.id).slice(0, 4);
  return { lead, devs };
}

function GeneratedTeam({ team, skillsNeeded }) {
  const { lead, devs } = team;
  const allMembers = [lead, ...devs];
  const coveredSkills = new Set(
    allMembers.flatMap((m) => m.skills.map((s) => s.toLowerCase())),
  );
  const missingSkills = skillsNeeded.filter(
    (s) => !coveredSkills.has(s.toLowerCase()),
  );

  return (
    <div className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50/60 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/5">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎉</span>
          <h4 className="font-semibold text-slate-900 dark:text-slate-100">
            Your New Team
          </h4>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${missingSkills.length === 0 ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400" : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"}`}
        >
          {Math.round(
            ((skillsNeeded.length - missingSkills.length) /
              Math.max(1, skillsNeeded.length)) *
              100,
          )}
          % skill coverage
        </span>
      </div>

      {/* Team Lead */}
      <div className="mt-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          👑 Team Lead
        </p>
        <div className="flex items-center gap-3 rounded-xl border border-indigo-200 bg-white p-3 dark:border-indigo-500/20 dark:bg-slate-800/60">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
            {lead.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              {lead.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lead.role} · {lead.experience} yrs
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {lead.matched.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-base font-bold text-indigo-600 dark:text-indigo-400">
              {lead.total}%
            </p>
            <p className="text-[10px] text-slate-400">match</p>
          </div>
        </div>
      </div>

      {/* Developers */}
      <div className="mt-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          💻 Developers
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {devs.map((dev) => (
            <div
              key={dev.id}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800/60"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                {dev.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate dark:text-slate-100">
                  {dev.name}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {dev.role} · {dev.experience} yrs
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {dev.matched.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-600 dark:border-slate-600 dark:text-slate-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {dev.total}%
                </p>
                <p className="text-[10px] text-slate-400">match</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coverage note */}
      <div className="mt-3 flex items-start gap-2 rounded-lg border border-slate-200 bg-white/70 p-2.5 dark:border-slate-700 dark:bg-slate-800/40">
        <span className="mt-0.5 text-sm">
          {missingSkills.length === 0 ? "✅" : "⚠️"}
        </span>
        <p className="text-xs text-slate-600 dark:text-slate-400">
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
      const team = buildTeam(skillsNeeded);
      setTeams((prev) => ({ ...prev, [projectId]: team }));
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
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
        My Projects
      </h2>
      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        {projects.map((project) => {
          const isGenerating = generating[project.id] ?? false;
          const team = teams[project.id] ?? null;

          return (
            <article
              key={project.id}
              className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/60"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {project.name}
                </h3>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(project.status)}`}
                >
                  {project.status}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {project.description}
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-500">
                Due: {project.due}
              </p>

              {/* Member initials */}
              <div className="mt-3 flex -space-x-2">
                {project.members.map((member) => (
                  <span
                    key={member}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-indigo-100 text-xs font-semibold text-indigo-700 dark:border-slate-800 dark:bg-indigo-500/20 dark:text-indigo-300"
                  >
                    {member}
                  </span>
                ))}
              </div>

              {/* Skills needed */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.skillsNeeded.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to="/find-talent"
                  className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Find Talent
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    handleCreateTeam(project.id, project.skillsNeeded)
                  }
                  disabled={isGenerating}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-600 disabled:opacity-60"
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
                    className="inline-flex items-center rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
                  >
                    Disband
                  </button>
                )}
              </div>

              {/* Loading state */}
              {isGenerating && (
                <div className="mt-4 rounded-xl border border-dashed border-indigo-300 bg-indigo-50/50 p-5 text-center dark:border-indigo-500/20 dark:bg-indigo-500/5">
                  <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    Matching skills...
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Scoring {employees.length} employees against required skills
                  </p>
                </div>
              )}

              {/* Generated team */}
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
