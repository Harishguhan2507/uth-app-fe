import { useMemo, useState } from "react";
import { FolderKanban, Sparkles, Users } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { useEmployees } from "@/hooks/useEmployees";
import { AnimatedCard, AnimatedPage, FadeIn, StaggerContainer } from "@/components/animations";
import { Button, Skeleton } from "@/components/ui/primitives";
import { TeamCreationModal } from "@/components/TeamCreationModal";
import { availabilityLabel } from "@/utils";
import type { GeneratedTeam, Project } from "@/types";

const statusTone: Record<Project["status"], string> = {
  planning: "bg-sky-500/10 text-sky-500",
  active: "bg-emerald-500/10 text-emerald-500",
  at_risk: "bg-amber-500/10 text-amber-500",
  completed: "bg-slate-500/10 text-slate-500",
};

const TeamBuilderPage = () => {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: employees, isLoading: employeesLoading } = useEmployees();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [teamsByProject, setTeamsByProject] = useState<Record<string, GeneratedTeam>>({});

  const stats = useMemo(() => {
    const availableEmployees = (employees ?? []).filter((employee) => employee.availability === "available");
    const averageAllocation = availableEmployees.length === 0
      ? 0
      : Math.round(availableEmployees.reduce((sum, employee) => sum + employee.currentProjectAllocation, 0) / availableEmployees.length);

    return {
      openProjects: (projects ?? []).filter((project) => project.status !== "completed").length,
      availableEmployees: availableEmployees.length,
      averageAllocation,
    };
  }, [employees, projects]);

  const openModal = (projectId: string | null) => {
    setSelectedProjectId(projectId ?? projects?.[0]?.id ?? null);
    setModalOpen(true);
  };

  if (projectsLoading || employeesLoading) {
    return <div className="grid gap-3">{Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-40" />)}</div>;
  }

  return (
    <AnimatedPage className="space-y-4">
      <AnimatedCard className="overflow-hidden p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[hsl(var(--muted-foreground))]">My Projects</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">Create balanced delivery teams with one click.</h1>
            <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">
              Review project demand, open the team generator, and assign an available lead plus four developers based on skill fit, experience, performance, and workload.
            </p>
          </div>
          <Button type="button" onClick={() => openModal(null)}>
            <Sparkles className="mr-2 size-4" />
            Create Team
          </Button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Open projects</p>
            <p className="mt-2 text-3xl font-semibold">{stats.openProjects}</p>
          </div>
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Available specialists</p>
            <p className="mt-2 text-3xl font-semibold">{stats.availableEmployees}</p>
          </div>
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Avg allocation</p>
            <p className="mt-2 text-3xl font-semibold">{stats.averageAllocation}%</p>
          </div>
        </div>
      </AnimatedCard>

      <StaggerContainer className="grid gap-4 xl:grid-cols-2">
        {projects?.map((project) => {
          const generatedTeam = teamsByProject[project.id];

          return (
            <FadeIn key={project.id}>
              <AnimatedCard className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <FolderKanban className="size-4 text-[hsl(var(--primary))]" />
                      <h2 className="text-xl font-semibold">{project.name}</h2>
                    </div>
                    <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{project.description}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone[project.status]}`}>{project.status.replace("_", " ")}</span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Complexity</p>
                    <p className="mt-2 font-semibold capitalize">{project.complexity}</p>
                  </div>
                  <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Team demand</p>
                    <p className="mt-2 font-semibold">{project.currentTeamSize}/{project.targetTeamSize}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium">Required stack</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.requiredTechStack.map((skill) => (
                      <span key={skill} className="rounded-full border border-[hsl(var(--border))] px-2.5 py-1 text-xs">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium">Required roles</p>
                  <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{project.requiredRoles.join(", ")}</p>
                </div>

                {generatedTeam ? (
                  <div className="mt-4 rounded-2xl border border-[hsl(var(--primary)/0.24)] bg-[hsl(var(--primary)/0.08)] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Latest generated team</p>
                        <p className="mt-1 font-semibold">{generatedTeam.coveragePercentage}% coverage · {generatedTeam.averageExperience} avg yrs</p>
                      </div>
                      <Users className="size-5 text-[hsl(var(--primary))]" />
                    </div>
                    <div className="mt-3 space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                      <p>Lead: {generatedTeam.lead?.employee.name ?? "No lead match found"}</p>
                      <p>Developers: {generatedTeam.developers.map((candidate) => `${candidate.employee.name} (${availabilityLabel(candidate.employee.availability)})`).join(", ")}</p>
                    </div>
                  </div>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button type="button" onClick={() => openModal(project.id)}>Create Team</Button>
                  <Button type="button" onClick={() => openModal(project.id)} className="border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card-hover))]">
                    View Team Plan
                  </Button>
                </div>
              </AnimatedCard>
            </FadeIn>
          );
        })}
      </StaggerContainer>

      <TeamCreationModal
        open={modalOpen}
        projectId={selectedProjectId}
        projects={projects ?? []}
        existingTeam={selectedProjectId ? teamsByProject[selectedProjectId] : undefined}
        onClose={() => setModalOpen(false)}
        onTeamCreated={(projectId, team) => setTeamsByProject((current) => ({ ...current, [projectId]: team }))}
      />
    </AnimatedPage>
  );
};

export default TeamBuilderPage;

