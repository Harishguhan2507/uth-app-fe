import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  LoaderCircle,
  Users,
  Crown,
  Code2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { useEmployees } from "@/hooks/useEmployees";
import {
  AnimatedCard,
  AnimatedPage,
  FadeIn,
  StaggerContainer,
} from "@/components/animations";
import { Button, Skeleton } from "@/components/ui/primitives";
import { generateTeam } from "@/utils/talent";
import type { GeneratedTeam, Project } from "@/types";

const STATUS_STYLES: Record<Project["status"], string> = {
  planning: "bg-sky-500/10 text-sky-500",
  active: "bg-emerald-500/10 text-emerald-500",
  at_risk: "bg-amber-500/10 text-amber-500",
  completed: "bg-slate-500/10 text-slate-500",
};

const MyProjectsPage = () => {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: employees, isLoading: employeesLoading } = useEmployees();

  // per-project state: generating flag + generated team
  const [generating, setGenerating] = useState<Record<string, boolean>>({});
  const [teams, setTeams] = useState<Record<string, GeneratedTeam>>({});

  const handleCreateTeam = (projectId: string) => {
    if (!employees) return;
    const project = projects?.find((p) => p.id === projectId);
    if (!project) return;

    setGenerating((prev) => ({ ...prev, [projectId]: true }));

    // simulate async feel, then run deterministic logic
    setTimeout(() => {
      const team = generateTeam(employees, project);
      setTeams((prev) => ({ ...prev, [projectId]: team }));
      setGenerating((prev) => ({ ...prev, [projectId]: false }));
    }, 900);
  };

  const handleDisband = (projectId: string) => {
    setTeams((prev) => {
      const next = { ...prev };
      delete next[projectId];
      return next;
    });
  };

  if (projectsLoading || employeesLoading) {
    return (
      <div className="grid gap-4 xl:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    );
  }

  if (!projects?.length) {
    return (
      <div className="grid place-items-center py-24 text-center">
        <FolderKanban className="mx-auto size-10 text-[hsl(var(--muted-foreground))]" />
        <p className="mt-4 font-semibold">No projects found</p>
        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
          Projects will appear here once assigned.
        </p>
      </div>
    );
  }

  return (
    <AnimatedPage className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[hsl(var(--muted-foreground))]">
          Workspace
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          My Projects
        </h1>
        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
          Find talent or auto-build a matched team for each project.
        </p>
      </div>

      <StaggerContainer className="space-y-4">
        {projects.map((project) => {
          const isGenerating = generating[project.id] ?? false;
          const team = teams[project.id] ?? null;

          return (
            <FadeIn key={project.id}>
              <AnimatedCard className="p-5">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FolderKanban className="size-4 shrink-0 text-[hsl(var(--primary))]" />
                    <h2 className="text-xl font-semibold">{project.name}</h2>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[project.status]}`}
                  >
                    {project.status.replace("_", " ")}
                  </span>
                </div>

                <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                  {project.description}
                </p>

                {/* Meta */}
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.72)] p-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                      Complexity
                    </p>
                    <p className="mt-1.5 font-semibold capitalize">
                      {project.complexity}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.72)] p-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                      Team
                    </p>
                    <p className="mt-1.5 font-semibold">
                      {project.currentTeamSize} / {project.targetTeamSize}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.72)] p-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                      Due
                    </p>
                    <p className="mt-1.5 font-semibold">{project.dueDate}</p>
                  </div>
                </div>

                {/* Stack */}
                <div className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
                    Required Stack
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.requiredTechStack.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-[hsl(var(--border))] px-2.5 py-0.5 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    to="/find-talent"
                    className="inline-flex items-center rounded-xl border border-[hsl(var(--border))] px-4 py-2 text-sm font-semibold transition hover:bg-[hsl(var(--muted))]"
                  >
                    Find Talent
                  </Link>
                  <Button
                    type="button"
                    onClick={() => handleCreateTeam(project.id)}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <LoaderCircle className="mr-2 size-4 animate-spin" />
                        Building Team...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 size-4" />
                        {team ? "Rebuild Team" : "Create Team"}
                      </>
                    )}
                  </Button>
                </div>

                {/* Generated Team Result */}
                {isGenerating && (
                  <div className="mt-5 rounded-2xl border border-dashed border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.05)] p-6 text-center">
                    <LoaderCircle className="mx-auto size-8 animate-spin text-[hsl(var(--primary))]" />
                    <p className="mt-3 text-sm font-medium">
                      Matching skills to your project requirements...
                    </p>
                    <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                      Scoring {employees?.length ?? 0} employees by skill fit,
                      experience & availability
                    </p>
                  </div>
                )}

                {!isGenerating && team && (
                  <GeneratedTeamPanel
                    team={team}
                    project={project}
                    onDisband={() => handleDisband(project.id)}
                    onRebuild={() => handleCreateTeam(project.id)}
                  />
                )}
              </AnimatedCard>
            </FadeIn>
          );
        })}
      </StaggerContainer>
    </AnimatedPage>
  );
};

/* ── Inline generated team display ── */
interface PanelProps {
  team: GeneratedTeam;
  project: Project;
  onDisband: () => void;
  onRebuild: () => void;
}

const GeneratedTeamPanel = ({
  team,
  project,
  onDisband,
  onRebuild,
}: PanelProps) => (
  <div className="mt-5 space-y-4">
    {/* Section header */}
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Users className="size-4 text-[hsl(var(--primary))]" />
        <h3 className="font-semibold">Your New Team</h3>
      </div>
      <div className="flex items-center gap-2">
        {/* Coverage badge */}
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${team.coveragePercentage >= 80 ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}
        >
          {team.coveragePercentage}% skill coverage
        </span>
        <button
          type="button"
          onClick={onRebuild}
          title="Rebuild team"
          className="rounded-lg border border-[hsl(var(--border))] p-1.5 transition hover:bg-[hsl(var(--muted))]"
        >
          <Pencil className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={onDisband}
          title="Disband team"
          className="rounded-lg border border-[hsl(var(--border))] p-1.5 text-[hsl(var(--destructive))] transition hover:bg-[hsl(var(--destructive)/0.1)]"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>
    </div>

    {/* Stats row */}
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.72)] p-3 text-center">
        <p className="text-2xl font-semibold">{team.coveragePercentage}%</p>
        <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
          Coverage
        </p>
      </div>
      <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.72)] p-3 text-center">
        <p className="text-2xl font-semibold">{team.averageExperience}</p>
        <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
          Avg Yrs
        </p>
      </div>
      <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.72)] p-3 text-center">
        <p className="text-2xl font-semibold">{1 + team.developers.length}</p>
        <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
          Members
        </p>
      </div>
    </div>

    {/* Team Lead */}
    {team.lead && (
      <div className="rounded-2xl border border-[hsl(var(--primary)/0.25)] bg-[hsl(var(--primary)/0.07)] p-4">
        <div className="mb-3 flex items-center gap-1.5">
          <Crown className="size-3.5 text-[hsl(var(--primary))]" />
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--primary))]">
            Team Lead
          </p>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={team.lead.employee.avatar}
            alt={team.lead.employee.name}
            className="size-12 rounded-2xl border border-[hsl(var(--border))]"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold">{team.lead.employee.name}</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              {team.lead.employee.role} · {team.lead.employee.experience} yrs ·{" "}
              {team.lead.employee.department}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {team.lead.matchedSkills.map((s) => (
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
            <p className="text-lg font-semibold">
              {Math.round(team.lead.score.total * 100)}%
            </p>
            <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
              match
            </p>
          </div>
        </div>
      </div>
    )}

    {/* Developers */}
    {team.developers.length > 0 && (
      <div>
        <div className="mb-2 flex items-center gap-1.5">
          <Code2 className="size-3.5 text-[hsl(var(--muted-foreground))]" />
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
            Developers
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {team.developers.map((dev) => (
            <div
              key={dev.employee.id}
              className="flex items-center gap-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.72)] p-3"
            >
              <img
                src={dev.employee.avatar}
                alt={dev.employee.name}
                className="size-10 rounded-xl border border-[hsl(var(--border))]"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {dev.employee.name}
                </p>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))] truncate">
                  {dev.employee.role}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {dev.matchedSkills.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[hsl(var(--border))] px-1.5 py-0.5 text-[10px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold">
                  {Math.round(dev.score.total * 100)}%
                </p>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
                  match
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Missing skills / coverage note */}
    <div className="flex items-start gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.5)] p-3">
      {team.missingSkills.length === 0 ? (
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
      ) : (
        <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-500" />
      )}
      <p className="text-xs text-[hsl(var(--muted-foreground))]">
        {team.missingSkills.length === 0
          ? `Full skill coverage for ${project.name}. Team is ready to start.`
          : `Missing skills: ${team.missingSkills.join(", ")}. Consider hiring or upskilling.`}
      </p>
    </div>
  </div>
);

export default MyProjectsPage;
