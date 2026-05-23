import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, LoaderCircle, Users } from "lucide-react";
import { Button, Input } from "@/components/ui/primitives";
import { createTeamSchema, type CreateTeamFormValues } from "./teamSchema";
import type { Project, Team } from "@/types";

interface Props {
  open: boolean;
  project: Project;
  editing?: Team | null;
  onClose: () => void;
  onSubmit: (values: CreateTeamFormValues) => Promise<void>;
  loading: boolean;
}

const WORK_MODES = ["remote", "hybrid", "onsite"] as const;
const AVAILABILITIES = ["immediate", "next_sprint", "next_quarter"] as const;
const AVAILABILITY_LABELS: Record<string, string> = {
  immediate: "Immediate",
  next_sprint: "Next Sprint",
  next_quarter: "Next Quarter",
};

export const CreateTeamModal = ({ open, project, editing, onClose, onSubmit, loading }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateTeamFormValues>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: "",
      description: "",
      requiredSkills: [],
      teamSize: 3,
      projectRole: "",
      workMode: "hybrid",
      availability: "immediate",
    },
  });

  useEffect(() => {
    if (editing) {
      reset({
        name: editing.name,
        description: editing.description,
        requiredSkills: editing.requiredSkills,
        teamSize: editing.teamSize,
        projectRole: editing.projectRole,
        workMode: editing.workMode,
        availability: editing.availability,
      });
    } else {
      reset({
        name: "",
        description: "",
        requiredSkills: [],
        teamSize: 3,
        projectRole: project.requiredRoles[0] ?? "",
        workMode: "hybrid",
        availability: "immediate",
      });
    }
  }, [editing, open, project, reset]);

  const selectedSkills = watch("requiredSkills");

  const toggleSkill = (skill: string) => {
    const current = selectedSkills ?? [];
    setValue(
      "requiredSkills",
      current.includes(skill) ? current.filter((s) => s !== skill) : [...current, skill],
      { shouldValidate: true }
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-3 sm:items-center">
      <div className="max-h-[92vh] w-full max-w-lg overflow-auto rounded-[28px] border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-[var(--shadow-floating)]">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--card)/0.92)] px-5 py-4 backdrop-blur">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
              {editing ? "Edit Team" : "Create Team"}
            </p>
            <h2 className="mt-1 text-xl font-semibold">{project.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[hsl(var(--border))] p-2 transition hover:bg-[hsl(var(--muted))]"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
          {/* Team Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Team Name <span className="text-[hsl(var(--destructive))]">*</span>
            </label>
            <Input {...register("name")} placeholder="e.g. Frontend Strike Team" />
            {errors.name && (
              <p className="mt-1 text-xs text-[hsl(var(--destructive))]">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Description <span className="text-[hsl(var(--destructive))]">*</span>
            </label>
            <textarea
              {...register("description")}
              rows={3}
              placeholder="Describe the team's purpose and goals..."
              className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.75)] px-3 py-2 text-sm outline-none transition placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary)/0.7)] focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.16)]"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-[hsl(var(--destructive))]">{errors.description.message}</p>
            )}
          </div>

          {/* Required Skills */}
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Required Skills <span className="text-[hsl(var(--destructive))]">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {project.requiredTechStack.map((skill) => {
                const active = selectedSkills?.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                      active
                        ? "border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]"
                        : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary)/0.4)] hover:text-[hsl(var(--foreground))]"
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
            {errors.requiredSkills && (
              <p className="mt-1 text-xs text-[hsl(var(--destructive))]">{errors.requiredSkills.message}</p>
            )}
          </div>

          {/* Team Size + Project Role */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Team Size <span className="text-[hsl(var(--destructive))]">*</span>
              </label>
              <Input type="number" min={1} max={50} {...register("teamSize")} />
              {errors.teamSize && (
                <p className="mt-1 text-xs text-[hsl(var(--destructive))]">{errors.teamSize.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Project Role Needed <span className="text-[hsl(var(--destructive))]">*</span>
              </label>
              <select
                {...register("projectRole")}
                className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.75)] px-3 py-2 text-sm outline-none transition focus:border-[hsl(var(--primary)/0.7)] focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.16)]"
              >
                <option value="">Select role...</option>
                {project.requiredRoles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              {errors.projectRole && (
                <p className="mt-1 text-xs text-[hsl(var(--destructive))]">{errors.projectRole.message}</p>
              )}
            </div>
          </div>

          {/* Work Mode */}
          <div>
            <label className="mb-1.5 block text-sm font-medium">Work Mode</label>
            <Controller
              name="workMode"
              control={control}
              render={({ field }) => (
                <div className="flex gap-2">
                  {WORK_MODES.map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => field.onChange(mode)}
                      className={`flex-1 rounded-xl border py-2 text-xs font-medium capitalize transition ${
                        field.value === mode
                          ? "border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]"
                          : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              )}
            />
          </div>

          {/* Availability */}
          <div>
            <label className="mb-1.5 block text-sm font-medium">Availability</label>
            <Controller
              name="availability"
              control={control}
              render={({ field }) => (
                <div className="flex gap-2">
                  {AVAILABILITIES.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => field.onChange(a)}
                      className={`flex-1 rounded-xl border py-2 text-xs font-medium transition ${
                        field.value === a
                          ? "border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]"
                          : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
                      }`}
                    >
                      {AVAILABILITY_LABELS[a]}
                    </button>
                  ))}
                </div>
              )}
            />
          </div>

          {/* Auto-assign note */}
          <div className="flex items-start gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.6)] p-3">
            <Users className="mt-0.5 size-4 shrink-0 text-[hsl(var(--primary))]" />
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Team lead and members will be auto-assigned from the project's existing roster based on leadership and experience.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[hsl(var(--border))] px-4 py-2 text-sm font-medium transition hover:bg-[hsl(var(--muted))]"
            >
              Cancel
            </button>
            <Button type="submit" disabled={loading}>
              {loading && <LoaderCircle className="mr-2 size-4 animate-spin" />}
              {editing ? "Save Changes" : "Create Team"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
