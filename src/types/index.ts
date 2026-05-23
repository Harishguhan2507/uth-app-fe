export type UserRole = "admin" | "project_manager" | "employee";

export type AvailabilityStatus = "available" | "busy" | "on_leave";
export type SeniorityLevel = "junior" | "mid" | "senior" | "lead";
export type ProjectComplexity = "moderate" | "high" | "critical";
export type ProjectStatus = "planning" | "active" | "at_risk" | "completed";
export type ExperienceBand = "all" | "0_3" | "4_6" | "7_plus";
export type ProjectAssignmentFilter = "all" | "unassigned" | "light" | "balanced" | "heavy";

export interface CertificationDetail {
  name: string;
  issuer: string;
  year: number;
}

export interface ProjectHistoryItem {
  id: string;
  name: string;
  role: string;
  duration: string;
  summary: string;
  impact: string;
  stack: string[];
}

export interface EmployeeStats {
  completedProjects: number;
  certifications: number;
  mentoringHours: number;
  profileCompletion: number;
}

export interface Employee {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  title: string;
  role: string;
  department: string;
  location: string;
  experience: number;
  seniorityLevel: SeniorityLevel;
  skills: string[];
  technologyStack: string[];
  certifications: string[];
  certificationDetails: CertificationDetail[];
  projects: string[];
  currentProjectAssignments: string[];
  currentProjectAllocation: number;
  availability: AvailabilityStatus;
  collaborationScore: number;
  performanceScore: number;
  aiMatchScore: number;
  recentActivity: string;
  bio: string;
  joinedAt: string;
  leadership: boolean;
  projectHistory: ProjectHistoryItem[];
  stats: EmployeeStats;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface TalentMatch {
  employee: Employee;
  matchPercentage: number;
  skillOverlap: string[];
  reasoning: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  level: "info" | "warning" | "critical";
}

export interface Project {
  id: string;
  name: string;
  description: string;
  department: string;
  status: ProjectStatus;
  dueDate: string;
  complexity: ProjectComplexity;
  requiredTechStack: string[];
  requiredRoles: string[];
  currentTeamSize: number;
  targetTeamSize: number;
  businessGoal: string;
  members: string[];
}

export interface TalentFilters {
  search: string;
  skills: string[];
  role: string;
  experience: ExperienceBand;
  availability: "all" | AvailabilityStatus;
  locations: string[];
  technologyStack: string[];
  projectAssignment: ProjectAssignmentFilter;
}

export interface TeamMatchScore {
  techStack: number;
  experience: number;
  performance: number;
  workload: number;
  total: number;
}

export interface TeamCandidate {
  employee: Employee;
  score: TeamMatchScore;
  matchedSkills: string[];
  roleFit: string[];
  reasons: string[];
}

export interface GeneratedTeam {
  lead: TeamCandidate | null;
  developers: TeamCandidate[];
  rankedCandidates: TeamCandidate[];
  missingSkills: string[];
  coveragePercentage: number;
  averageExperience: number;
  totalAllocation: number;
}
