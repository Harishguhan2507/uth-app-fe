import type {
  Employee,
  ExperienceBand,
  GeneratedTeam,
  Project,
  ProjectAssignmentFilter,
  TalentFilters,
  TalentMatch,
  TeamCandidate,
  TeamMatchScore,
} from "@/types";

const queryStopWords = new Set(["with", "and", "or", "developer", "developers", "engineer", "engineers", "experience"]);

const queryAliases: Record<string, string[]> = {
  ai: ["ai", "ml", "machine", "learning"],
  frontend: ["frontend", "react", "typescript"],
  backend: ["backend", "node.js", "java", "spring", "python"],
  cloud: ["aws", "devops", "platform"],
  fullstack: ["full stack", "fullstack", "react", "node.js", "typescript"],
};

const complexityTargetExperience: Record<Project["complexity"], number> = {
  moderate: 4,
  high: 6,
  critical: 8,
};

const normalize = (value: string) => value.trim().toLowerCase();

const matchesQuery = (employee: Employee, query: string) => {
  const searchable = normalize([
    employee.name,
    employee.role,
    employee.department,
    employee.location,
    ...employee.skills,
    ...employee.technologyStack,
    ...employee.currentProjectAssignments,
  ].join(" "));
  const terms = query.split(/\s+/).map(normalize).filter((term) => term && !queryStopWords.has(term));

  if (terms.length === 0) {
    return true;
  }

  return terms.every((term) => {
    const aliases = queryAliases[term] ?? [term];
    return aliases.some((alias) => searchable.includes(alias));
  });
};

const matchesExperienceBand = (experience: number, band: ExperienceBand) => {
  if (band === "all") return true;
  if (band === "0_3") return experience <= 3;
  if (band === "4_6") return experience >= 4 && experience <= 6;
  return experience >= 7;
};

const matchesAssignment = (allocation: number, filter: ProjectAssignmentFilter) => {
  if (filter === "all") return true;
  if (filter === "unassigned") return allocation === 0;
  if (filter === "light") return allocation > 0 && allocation < 40;
  if (filter === "balanced") return allocation >= 40 && allocation < 75;
  return allocation >= 75;
};

export const getEmployeeScore = (employee: Employee, project: Project): TeamMatchScore => {
  const requiredSkills = project.requiredTechStack.map(normalize);
  const employeeSkills = employee.technologyStack.map(normalize);
  const skillMatches = requiredSkills.filter((skill) => employeeSkills.includes(skill));
  const techStack = skillMatches.length / Math.max(1, requiredSkills.length);
  const experience = Math.min(employee.experience / complexityTargetExperience[project.complexity], 1);
  const performance = employee.performanceScore / 100;
  const workload = Math.max(0, 1 - employee.currentProjectAllocation / 100);
  const total = Math.round((techStack * 50 + experience * 20 + performance * 20 + workload * 10) * 100) / 100;

  return { techStack, experience, performance, workload, total };
};

const getRoleMatches = (employee: Employee, project: Project) =>
  project.requiredRoles.filter((role) => normalize(employee.role).includes(normalize(role)) || normalize(role).includes(normalize(employee.seniorityLevel)));

const getTeamCandidate = (employee: Employee, project: Project): TeamCandidate => {
  const score = getEmployeeScore(employee, project);
  const matchedSkills = project.requiredTechStack.filter((skill) =>
    employee.technologyStack.map(normalize).includes(normalize(skill)),
  );
  const roleFit = getRoleMatches(employee, project);

  return {
    employee,
    score,
    matchedSkills,
    roleFit,
    reasons: [
      `${matchedSkills.length}/${project.requiredTechStack.length} required technologies matched.`,
      `${employee.experience} years experience with ${employee.currentProjectAllocation}% allocation.`,
      `Performance ${employee.performanceScore} and collaboration ${employee.collaborationScore}.`,
    ],
  };
};

export const createTalentMatches = (employees: Employee[], query: string): TalentMatch[] =>
  employees
    .filter((employee) => matchesQuery(employee, query))
    .map((employee) => {
      const normalizedQueryTerms = query.split(/\s+/).map(normalize).filter(Boolean);
      const skillOverlap = employee.skills.filter((skill) =>
        normalizedQueryTerms.some((term) => normalize(skill).includes(term) || (queryAliases[term] ?? []).some((alias) => normalize(skill).includes(alias))),
      );
      const queryBoost = normalizedQueryTerms.length === 0 ? 0.7 : Math.min(1, skillOverlap.length / Math.max(1, normalizedQueryTerms.length));
      const availabilityBoost = employee.availability === "available" ? 1 : employee.availability === "busy" ? 0.5 : 0.2;
      const workloadBoost = 1 - employee.currentProjectAllocation / 100;
      const matchPercentage = Math.min(99, Math.round(
        queryBoost * 45 +
        (employee.performanceScore / 100) * 20 +
        (employee.experience / 12) * 15 +
        workloadBoost * 10 +
        availabilityBoost * 10,
      ));

      return {
        employee,
        matchPercentage,
        skillOverlap,
        reasoning: [
          `Strong overlap in ${skillOverlap.slice(0, 3).join(", ") || employee.skills.slice(0, 2).join(", ")}.`,
          `${employee.location} · ${employee.department} · ${employee.seniorityLevel} level.`,
          employee.availability === "available"
            ? "Available for new assignments."
            : employee.availability === "busy"
              ? `Currently ${employee.currentProjectAllocation}% allocated.`
              : "Currently on leave and excluded by availability filters.",
          `Recent outcome: ${employee.recentActivity}`,
        ],
      };
    })
    .sort((left, right) => right.matchPercentage - left.matchPercentage);

export const applyTalentFilters = (matches: TalentMatch[], filters: TalentFilters): TalentMatch[] =>
  matches.filter(({ employee }) => {
    const skillOk = filters.skills.length === 0 || filters.skills.every((skill) => employee.skills.includes(skill));
    const roleOk = filters.role === "all" || normalize(employee.role) === normalize(filters.role);
    const experienceOk = matchesExperienceBand(employee.experience, filters.experience);
    const availabilityOk = filters.availability === "all" || employee.availability === filters.availability;
    const locationOk = filters.locations.length === 0 || filters.locations.includes(employee.location);
    const stackOk = filters.technologyStack.length === 0 || filters.technologyStack.every((skill) => employee.technologyStack.includes(skill));
    const assignmentOk = matchesAssignment(employee.currentProjectAllocation, filters.projectAssignment);

    return skillOk && roleOk && experienceOk && availabilityOk && locationOk && stackOk && assignmentOk;
  });

const experienceBandValue = (experience: number) => {
  if (experience <= 3) return "junior";
  if (experience <= 6) return "mid";
  return "senior";
};

const rankTeamLead = (candidates: TeamCandidate[]) =>
  [...candidates]
    .filter(({ employee }) => employee.leadership || employee.seniorityLevel === "lead" || employee.experience >= 8)
    .sort((left, right) => {
      const leftLeadScore = left.score.total + left.employee.experience * 2 + (left.employee.leadership ? 12 : 0) + left.roleFit.length * 5;
      const rightLeadScore = right.score.total + right.employee.experience * 2 + (right.employee.leadership ? 12 : 0) + right.roleFit.length * 5;
      return rightLeadScore - leftLeadScore;
    })[0] ?? null;

const sortDevelopers = (project: Project, teamLeadId: string | null, candidates: TeamCandidate[]) => {
  const pool = [...candidates].filter(({ employee }) => employee.id !== teamLeadId);
  const selected: TeamCandidate[] = [];
  const selectedBands = new Set<string>();

  while (pool.length > 0) {
    pool.sort((left, right) => {
      const leftBand = experienceBandValue(left.employee.experience);
      const rightBand = experienceBandValue(right.employee.experience);
      const leftBalanceBonus = selectedBands.has(leftBand) ? 0 : 4;
      const rightBalanceBonus = selectedBands.has(rightBand) ? 0 : 4;
      const leftRoleBonus = left.roleFit.length * 3 + (project.requiredRoles.some((role) => normalize(left.employee.role).includes(normalize(role))) ? 5 : 0);
      const rightRoleBonus = right.roleFit.length * 3 + (project.requiredRoles.some((role) => normalize(right.employee.role).includes(normalize(role))) ? 5 : 0);

      return (right.score.total + rightBalanceBonus + rightRoleBonus) - (left.score.total + leftBalanceBonus + leftRoleBonus);
    });

    const next = pool.shift();
    if (!next) break;
    selected.push(next);
    selectedBands.add(experienceBandValue(next.employee.experience));
  }

  return selected;
};

export const generateTeam = (employees: Employee[], project: Project): GeneratedTeam => {
  const rankedCandidates = employees
    .filter((employee) => employee.availability === "available")
    .map((employee) => getTeamCandidate(employee, project))
    .filter((candidate) => candidate.matchedSkills.length > 0)
    .sort((left, right) => right.score.total - left.score.total);

  const lead = rankTeamLead(rankedCandidates);
  const developers = sortDevelopers(project, lead?.employee.id ?? null, rankedCandidates).slice(0, 4);
  const selected = [lead, ...developers].filter(Boolean) as TeamCandidate[];
  const selectedSkills = new Set(selected.flatMap((candidate) => candidate.matchedSkills.map(normalize)));
  const missingSkills = project.requiredTechStack.filter((skill) => !selectedSkills.has(normalize(skill)));
  const averageExperience = selected.length === 0
    ? 0
    : Math.round((selected.reduce((sum, candidate) => sum + candidate.employee.experience, 0) / selected.length) * 10) / 10;
  const totalAllocation = selected.reduce((sum, candidate) => sum + candidate.employee.currentProjectAllocation, 0);
  const coveragePercentage = Math.round((1 - missingSkills.length / Math.max(1, project.requiredTechStack.length)) * 100);

  return {
    lead,
    developers,
    rankedCandidates,
    missingSkills,
    coveragePercentage,
    averageExperience,
    totalAllocation,
  };
};
