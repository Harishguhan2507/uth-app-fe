import type { AppUser } from "@/types";

export const APP_NAME = "UTH-Match";
export const STORAGE_KEYS = {
  auth: "uth_auth",
  theme: "uth_theme",
} as const;

export const MOCK_USERS: AppUser[] = [
  { id: "u1", name: "Admin User", email: "admin@uth.com", password: "123456", role: "admin" },
  { id: "u2", name: "Project Manager", email: "pm@uth.com", password: "123456", role: "project_manager" },
  { id: "u3", name: "Employee User", email: "employee@uth.com", password: "123456", role: "employee" },
];

export const NAV_BY_ROLE = {
  admin: ["/dashboard", "/talent-search", "/team-builder", "/directory", "/profile", "/insights", "/analytics", "/notifications", "/settings"],
  project_manager: ["/dashboard", "/talent-search", "/team-builder", "/directory", "/profile", "/chat", "/notifications", "/settings"],
  employee: ["/dashboard", "/directory", "/profile", "/chat", "/notifications", "/settings"],
} as const;
