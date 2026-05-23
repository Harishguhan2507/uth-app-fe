import { useEffect, useMemo, useState } from "react";
import { LoaderCircle, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import { aiService } from "@/services/ai.service";
import { availabilityLabel } from "@/utils";
import type { GeneratedTeam, Project } from "@/types";

interface TeamCreationModalProps {
  open: boolean;
  projectId: string | null;
  projects: Project[];
  existingTeam?: GeneratedTeam | undefined;
  onClose: () => void;
  onTeamCreated: (projectId: string, team: GeneratedTeam) => void;
}

const statusTone: Record<Project["status"], string> = {
  planning: "bg-sky-500/10 text-sky-500",
  active: "bg-emerald-500/10 text-emerald-500",
  at_risk: "bg-amber-500/10 text-amber-500",
  completed: "bg-slate-500/10 text-slate-500",
};

export const TeamCreationModal = ({ open, projectId, projects, existingTeam, onClose, onTeamCreated }: TeamCreationModalProps) => {
  const [selectedProjectId, setSelectedProjectId] = useState(projectId ?? projects[0]?.id ?? "");
  const [loading, setLoading] = useState(false);
  const [generatedTeam, setGeneratedTeam] = useState<GeneratedTeam | null>(existingTeam ?? null);

  useEffect(() => {
    setSelectedProjectId(projectId ?? projects[0]?.id ?? "");
  }, [projectId, projects]);

  useEffect(() => {
    setGeneratedTeam(existingTeam ?? null);
  }, [existingTeam, projectId]);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [projects, selectedProjectId],
  );

  if (!open || !selectedProject) {
    return null;
  }

  const generateTeam = async () => {
    setLoading(true);
    try {
      const team = await aiService.teamRecommendation(selectedProject.id);
      setGeneratedTeam(team);
      onTeamCreated(selectedProject.id, team);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-3 sm:items-center">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-auto rounded-[28px] border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-[var(--shadow-floating)]">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] px-5 py-4 backdrop-blur">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Create Team</p>
            <h2 className="mt-1 text-2xl font-semibold">Automatic team generation</h2>
            <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">Select a project and generate one lead plus four developers using availability, skill match, performance, and workload.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl border border-[hsl(var(--border))] p-2">
            <X className="size-4" />
          </button>
        </div>

        <div className="grid gap-5 p-5 lg:grid-cols-[320px_minmax(0,1fr)]">
          <section className="space-y-4">
            <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
              <label className="text-sm font-medium">Project</label>
              <select
                value={selectedProjectId}
                onChange={(event) => setSelectedProjectId(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-sm"
              >
                {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
              </select>
            </div>

            <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold">{selectedProject.name}</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone[selectedProject.status]}`}>{selectedProject.status.replace("_", " ")}</span>
              </div>
              <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{selectedProject.description}</p>
              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <p className="font-medium">Required roles</p>
                  <p className="text-[hsl(var(--muted-foreground))]">{selectedProject.requiredRoles.join(", ")}</p>
                </div>
                <div>
                  <p className="font-medium">Tech stack</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedProject.requiredTechStack.map((skill) => (
                      <span key={skill} className="rounded-full border border-[hsl(var(--border))] px-2.5 py-1 text-xs">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="font-medium">Complexity</p>
                    <p className="text-[hsl(var(--muted-foreground))]">{selectedProject.complexity}</p>
                  </div>
                  <div>
                    <p className="font-medium">Current team</p>
                    <p className="text-[hsl(var(--muted-foreground))]">{selectedProject.currentTeamSize}/{selectedProject.targetTeamSize}</p>
                  </div>
                </div>
              </div>
              <Button type="button" onClick={generateTeam} disabled={loading} className="mt-4 w-full">
                {loading ? <LoaderCircle className="mr-2 size-4 animate-spin" /> : <Sparkles className="mr-2 size-4" />}
                {generatedTeam ? "Regenerate team" : "Generate team"}
              </Button>
            </div>
          </section>

          <section className="space-y-4">
            {!generatedTeam ? (
              <div className="grid min-h-[360px] place-items-center rounded-2xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-center">
                <div>
                  <Sparkles className="mx-auto size-10 text-[hsl(var(--primary))]" />
                  <h3 className="mt-4 text-xl font-semibold">No team generated yet</h3>
                  <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Generate a team to review the selected lead, recommended developers, and coverage metrics.</p>
                </div>
              </div>
            ) : null}

            {generatedTeam ? (
              <>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Coverage</p>
                    <p className="mt-2 text-3xl font-semibold">{generatedTeam.coveragePercentage}%</p>
                  </div>
                  <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Avg Experience</p>
                    <p className="mt-2 text-3xl font-semibold">{generatedTeam.averageExperience} yrs</p>
                  </div>
                  <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Combined Allocation</p>
                    <p className="mt-2 text-3xl font-semibold">{generatedTeam.totalAllocation}%</p>
                  </div>
                </div>

                {generatedTeam.lead ? (
                  <div className="rounded-[28px] border border-[hsl(var(--primary)/0.26)] bg-[linear-gradient(135deg,hsl(var(--primary)/0.12),hsl(var(--secondary)/0.08))] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Selected Team Lead</p>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <img src={generatedTeam.lead.employee.avatar} alt={generatedTeam.lead.employee.name} className="size-16 rounded-3xl border border-[hsl(var(--border))]" />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{generatedTeam.lead.employee.name}</h3>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">{generatedTeam.lead.employee.role} · {generatedTeam.lead.employee.experience} yrs · {availabilityLabel(generatedTeam.lead.employee.availability)}</p>
                        <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                          Match score {generatedTeam.lead.score.total} · Tech {(generatedTeam.lead.score.techStack * 100).toFixed(0)}% · Performance {generatedTeam.lead.employee.performanceScore}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="grid gap-3 xl:grid-cols-2">
                  {generatedTeam.developers.map((candidate) => (
                    <article key={candidate.employee.id} className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                      <div className="flex items-center gap-3">
                        <img src={candidate.employee.avatar} alt={candidate.employee.name} className="size-12 rounded-2xl border border-[hsl(var(--border))]" />
                        <div>
                          <p className="font-semibold">{candidate.employee.name}</p>
                          <p className="text-sm text-[hsl(var(--muted-foreground))]">{candidate.employee.role}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        {candidate.matchedSkills.map((skill) => (
                          <span key={skill} className="rounded-full border border-[hsl(var(--border))] px-2 py-1">{skill}</span>
                        ))}
                      </div>
                      <div className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">
                        <p>Score {candidate.score.total} · {candidate.employee.experience} yrs · {candidate.employee.currentProjectAllocation}% allocation</p>
                        <p className="mt-1">Performance {candidate.employee.performanceScore} · Collaboration {candidate.employee.collaborationScore}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                  <p className="font-semibold">Coverage notes</p>
                  <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                    Missing skills: {generatedTeam.missingSkills.length > 0 ? generatedTeam.missingSkills.join(", ") : "None"}
                  </p>
                </div>
              </>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
};

