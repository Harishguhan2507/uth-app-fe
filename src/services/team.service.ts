import { employees, projects } from "@/mock/data";
import { sleep } from "@/utils";
import type { CreateTeamPayload, Team, TeamMember } from "@/types";

const STORAGE_KEY = "uth_teams";

const toMember = (empId: string): TeamMember | null => {
  const emp = employees.find((e) => e.id === empId);
  if (!emp) return null;
  return { id: emp.id, name: emp.name, avatar: emp.avatar, role: emp.role };
};

const resolveLead = (memberIds: string[]): TeamMember | null => {
  // Pick the member with leadership flag, or highest experience
  const candidates = memberIds
    .map((id) => employees.find((e) => e.id === id))
    .filter(Boolean) as (typeof employees)[number][];

  const lead =
    candidates.find((e) => e.leadership) ??
    candidates.sort((a, b) => b.experience - a.experience)[0] ??
    null;

  return lead ? { id: lead.id, name: lead.name, avatar: lead.avatar, role: lead.role } : null;
};

const resolveMembers = (memberIds: string[]): TeamMember[] =>
  memberIds.map(toMember).filter(Boolean) as TeamMember[];

const load = (): Team[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Team[];
  } catch {
    return [];
  }
};

const save = (teams: Team[]) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));

export const teamService = {
  async listByProject(projectId: string): Promise<Team[]> {
    await sleep(180);
    return load().filter((t) => t.projectId === projectId);
  },

  async create(projectId: string, payload: CreateTeamPayload): Promise<Team> {
    await sleep(320);
    const project = projects.find((p) => p.id === projectId);
    const memberIds = project?.members ?? [];
    const members = resolveMembers(memberIds);
    const teamLead = resolveLead(memberIds);

    const team: Team = {
      id: `team-${Date.now()}`,
      projectId,
      ...payload,
      status: "open",
      teamLead,
      members,
      createdAt: new Date().toISOString(),
    };
    save([...load(), team]);
    return team;
  },

  async update(
    id: string,
    payload: Partial<CreateTeamPayload & { status: Team["status"] }>
  ): Promise<Team> {
    await sleep(240);
    const teams = load().map((t) => (t.id === id ? { ...t, ...payload } : t));
    save(teams);
    return teams.find((t) => t.id === id)!;
  },

  async remove(id: string): Promise<void> {
    await sleep(200);
    save(load().filter((t) => t.id !== id));
  },
};
