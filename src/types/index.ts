export type UserRole = "admin" | "project_manager" | "employee";

export interface Employee {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
  department: string;
  experience: number;
  skills: string[];
  certifications: string[];
  projects: string[];
  availability: "immediate" | "2_weeks" | "1_month" | "allocated";
  collaborationScore: number;
  aiMatchScore: number;
  recentActivity: string;
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