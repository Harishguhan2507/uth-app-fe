import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button, Skeleton } from "@/components/ui/primitives";
import { TeamCard } from "./TeamCard";
import { CreateTeamModal } from "./CreateTeamModal";
import { teamService } from "@/services/team.service";
import type { CreateTeamFormValues } from "./teamSchema";
import type { Project, Team } from "@/types";

interface Props {
  project: Project;
}

export const TeamList = ({ project }: Props) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Team | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    try {
      const data = await teamService.listByProject(project.id);
      setTeams(data);
    } finally {
      setLoading(false);
    }
  }, [project.id]);

  useEffect(() => { fetchTeams(); }, [fetchTeams]);

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (team: Team) => { setEditing(team); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditing(null); };

  const handleSubmit = async (values: CreateTeamFormValues) => {
    setSubmitting(true);
    try {
      if (editing) {
        const updated = await teamService.update(editing.id, values);
        setTeams((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
        toast.success("Team updated successfully");
      } else {
        const created = await teamService.create(project.id, values);
        setTeams((prev) => [...prev, created]);
        toast.success("Team created successfully");
      }
      closeModal();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (teamId: string) => {
    await teamService.remove(teamId);
    setTeams((prev) => prev.filter((t) => t.id !== teamId));
    toast.success("Team removed");
  };

  const handleToggleStatus = async (team: Team) => {
    const updated = await teamService.update(team.id, {
      status: team.status === "open" ? "closed" : "open",
    });
    setTeams((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-[0.28em]">
          Teams · {teams.length}
        </h3>
        <Button type="button" onClick={openCreate} className="px-3 py-1.5 text-xs">
          <Plus className="mr-1.5 size-3.5" />
          Create Team
        </Button>
      </div>

      {loading ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[1, 2].map((i) => <Skeleton key={i} className="h-44" />)}
        </div>
      ) : teams.length === 0 ? (
        <div className="mt-3 grid place-items-center rounded-2xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card))] py-10 text-center">
          <p className="text-sm font-medium">No teams yet</p>
          <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
            Create a team to start assigning members to this project.
          </p>
          <Button type="button" onClick={openCreate} className="mt-4 px-4 py-2 text-xs">
            <Plus className="mr-1.5 size-3.5" />
            Create First Team
          </Button>
        </div>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onEdit={openEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}

      <CreateTeamModal
        open={modalOpen}
        project={project}
        editing={editing}
        onClose={closeModal}
        onSubmit={handleSubmit}
        loading={submitting}
      />
    </div>
  );
};

