import { addDays, formatISO } from "date-fns";
import type { Employee, NotificationItem, Project } from "@/types";

const stackCatalog = {
  frontend: ["React", "TypeScript", "GraphQL", "AWS"],
  angular: ["Angular", "TypeScript", "Node.js", "AWS"],
  vue: ["Vue", "TypeScript", "GraphQL", "Node.js"],
  backend: ["Node.js", "Java", "Spring Boot", "AWS"],
  python: ["Python", "AI/ML", "AWS", "GraphQL"],
  platform: ["DevOps", "AWS", "Node.js", "Python"],
  enterprise: ["Java", "Spring Boot", "AWS", "GraphQL"],
  data: ["Python", "AI/ML", "GraphQL", "AWS"],
} as const;

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Angular Developer",
  "Vue Developer",
  "Python Developer",
  "DevOps Engineer",
  "ML Engineer",
  "Data Engineer",
  "QA Engineer",
];

const departments = ["Engineering", "Data & AI", "Platform", "Product Engineering", "Cloud Operations"];
const locations = ["Chennai, India", "Bengaluru, India", "Hyderabad, India", "Pune, India", "Remote"];
const availabilityCycle: Employee["availability"][] = ["available", "busy", "on_leave", "available", "busy", "available"];
const seniorityCycle: Employee["seniorityLevel"][] = ["junior", "mid", "senior", "mid", "lead", "senior"];

const people = [
  ["Aarav", "Sharma"], ["Diya", "Reddy"], ["Nikhil", "Patel"], ["Meera", "Iyer"], ["Arjun", "Kapoor"], ["Ananya", "Nair"],
  ["Rohan", "Gupta"], ["Kavya", "Menon"], ["Vikram", "Joshi"], ["Sneha", "Bose"], ["Aditya", "Rao"], ["Ishita", "Sethi"],
  ["Rahul", "Verma"], ["Priyanka", "Das"], ["Kiran", "Mohan"], ["Neha", "Kulkarni"], ["Siddharth", "Jain"], ["Pooja", "Krishnan"],
  ["Varun", "Malhotra"], ["Harini", "Subramanian"], ["Aman", "Tiwari"], ["Shreya", "Pillai"], ["Karthik", "V"], ["Madhavi", "R"],
  ["Jebaraj", "S"], ["Santhia", "M"], ["Meenakshi", "K"], ["Aneesh", "R"], ["Priya", "L"], ["Divya", "N"],
  ["Rahul", "S"], ["Keerthana", "B"], ["Sanjay", "Prasad"], ["Lavanya", "I"], ["Gokul", "Raj"], ["Monisha", "P"],
  ["Yash", "Agarwal"], ["Bhavya", "Singh"], ["Farhan", "Ali"], ["Nandhini", "C"], ["Tarun", "Balaji"], ["Ritika", "Mehta"],
];

const specialtyCycle = [
  "frontend", "backend", "python", "angular", "vue", "platform", "enterprise", "data",
] as const;

const roleOverride: Record<number, string> = {
  4: "Engineering Lead",
  10: "Technical Lead",
  16: "Platform Lead",
  22: "Engineering Manager",
  26: "Senior Frontend Engineer",
  27: "ML Engineer",
  32: "Principal Engineer",
  38: "Solution Architect",
};

const departmentOverride: Record<number, string> = {
  7: "Design Systems",
  21: "Security Engineering",
  27: "Data & AI",
};

const getHistory = (name: string, stack: readonly string[], role: string, offset: number) => {
  const base = [
    {
      id: `${name.toLowerCase().replace(/\s+/g, "-")}-insights`,
      name: "Talent Insights Hub",
      role,
      duration: "2025 - Present",
      summary: "Built staffing insights workflows across delivery, skills, and project capacity.",
      impact: "Reduced talent allocation turnaround by 32%.",
      stack: [...stack],
    },
    {
      id: `${name.toLowerCase().replace(/\s+/g, "-")}-workspace`,
      name: "Delivery Workspace Revamp",
      role,
      duration: "2024 - 2025",
      summary: "Improved team collaboration, visibility, and staffing recommendations.",
      impact: `Raised internal satisfaction by ${18 + offset}% in quarterly feedback.`,
      stack: [...stack].reverse(),
    },
  ];
  return base;
};

export const employees: Employee[] = people.map(([first, last], index) => {
  const id = `emp-${index + 1}`;
  const safeFirst = first ?? "Employee";
  const safeLast = last ?? `${index + 1}`;
  const name = `${safeFirst} ${safeLast}`;
  const specialty = specialtyCycle[index % specialtyCycle.length] ?? "frontend";
  const role = roleOverride[index] ?? roles[index % roles.length] ?? "Full Stack Developer";
  const stack = stackCatalog[specialty];
  const experience = 2 + (index % 10) + (seniorityCycle[index % seniorityCycle.length] === "lead" ? 4 : 0);
  const performanceScore = 74 + ((index * 7) % 24);
  const allocation = availabilityCycle[index % availabilityCycle.length] === "available"
    ? 10 + ((index * 9) % 45)
    : availabilityCycle[index % availabilityCycle.length] === "busy"
      ? 60 + ((index * 5) % 35)
      : 0;
  const currentProjects = allocation === 0
    ? []
    : [`Project ${String.fromCharCode(65 + (index % 8))}`, index % 3 === 0 ? "Internal AI Accelerator" : "Client Delivery Pod"];

  return {
    id,
    name,
    avatar: `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
    email: `${safeFirst.toLowerCase()}.${String(safeLast).toLowerCase().replace(/[^a-z]/g, "")}@uth.com`,
    phone: `+91 9${String(100000000 + index * 7381).slice(0, 9)}`,
    title: role,
    role,
    department: departmentOverride[index] ?? departments[index % departments.length] ?? "Engineering",
    location: locations[index % locations.length] ?? "Remote",
    experience,
    seniorityLevel: seniorityCycle[index % seniorityCycle.length] ?? "mid",
    skills: [...stack],
    technologyStack: [...stack],
    certifications: [
      `${stack[0]} Advanced Practitioner`,
      `${stack[1]} Delivery Specialist`,
    ],
    certificationDetails: [
      { name: `${stack[0]} Advanced Practitioner`, issuer: "Open Learning Guild", year: 2024 - (index % 3) },
      { name: `${stack[1]} Delivery Specialist`, issuer: "Cloud Academy", year: 2023 - (index % 2) },
    ],
    projects: currentProjects,
    currentProjectAssignments: currentProjects,
    currentProjectAllocation: allocation,
    availability: availabilityCycle[index % availabilityCycle.length] ?? "available",
    collaborationScore: 72 + ((index * 5) % 26),
    performanceScore,
    aiMatchScore: 70 + ((index * 11) % 25),
    recentActivity: `Delivered ${stack[0]} accelerator improvements for ${currentProjects[0] ?? "bench initiatives"}.`,
    bio: `${role} focused on shipping resilient products across ${stack.slice(0, 3).join(", ")} with strong collaboration across design, engineering, and delivery teams.`,
    joinedAt: `${2018 + (index % 7)}-0${(index % 8) + 1}-15`,
    leadership: role.includes("Lead") || role.includes("Manager") || role.includes("Architect"),
    projectHistory: getHistory(name, stack, role, index % 11),
    stats: {
      completedProjects: 4 + (index % 7),
      certifications: 2 + (index % 4),
      mentoringHours: 18 + (index % 9) * 6,
      profileCompletion: 72 + ((index * 3) % 27),
    },
  };
});

export const projects: Project[] = [
  {
    id: "proj-vision",
    name: "Vision Match Studio",
    description: "AI-assisted staffing cockpit for enterprise delivery teams.",
    department: "Product Engineering",
    status: "active",
    dueDate: "2026-08-12",
    complexity: "critical",
    requiredTechStack: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    requiredRoles: ["Technical Lead", "Frontend Developer", "Backend Developer", "Full Stack Developer"],
    currentTeamSize: 3,
    targetTeamSize: 5,
    businessGoal: "Launch a unified staffing console for talent discovery and delivery planning.",
    members: ["emp-5", "emp-12", "emp-27"],
  },
  {
    id: "proj-nova",
    name: "Project Nova Analytics",
    description: "Delivery health analytics with ML-driven demand forecasting.",
    department: "Data & AI",
    status: "planning",
    dueDate: "2026-09-28",
    complexity: "high",
    requiredTechStack: ["Python", "AI/ML", "AWS", "GraphQL"],
    requiredRoles: ["Engineering Lead", "ML Engineer", "Data Engineer", "Python Developer"],
    currentTeamSize: 2,
    targetTeamSize: 5,
    businessGoal: "Automate demand forecasting and improve allocation planning accuracy.",
    members: ["emp-8", "emp-28"],
  },
  {
    id: "proj-orbit",
    name: "Orbit Commerce Platform",
    description: "Customer portal modernization with Angular and Java services.",
    department: "Engineering",
    status: "at_risk",
    dueDate: "2026-07-18",
    complexity: "critical",
    requiredTechStack: ["Angular", "TypeScript", "Java", "Spring Boot", "AWS"],
    requiredRoles: ["Solution Architect", "Angular Developer", "Backend Developer", "DevOps Engineer"],
    currentTeamSize: 4,
    targetTeamSize: 5,
    businessGoal: "Stabilize the commerce platform ahead of regional rollout.",
    members: ["emp-4", "emp-18", "emp-33", "emp-39"],
  },
  {
    id: "proj-skyline",
    name: "Skyline Experience Hub",
    description: "Multi-channel experience layer for operations and support teams.",
    department: "Product Engineering",
    status: "active",
    dueDate: "2026-10-09",
    complexity: "moderate",
    requiredTechStack: ["Vue", "TypeScript", "Node.js", "GraphQL"],
    requiredRoles: ["Technical Lead", "Vue Developer", "Full Stack Developer", "QA Engineer"],
    currentTeamSize: 3,
    targetTeamSize: 5,
    businessGoal: "Ship a fast internal operations workspace with lower support overhead.",
    members: ["emp-11", "emp-24", "emp-37"],
  },
  {
    id: "proj-atlas",
    name: "Atlas Cloud Foundation",
    description: "Platform enablement program for cloud reliability and secure deployments.",
    department: "Cloud Operations",
    status: "planning",
    dueDate: "2026-11-21",
    complexity: "high",
    requiredTechStack: ["DevOps", "AWS", "Python", "Node.js"],
    requiredRoles: ["Platform Lead", "DevOps Engineer", "Backend Developer", "Python Developer"],
    currentTeamSize: 1,
    targetTeamSize: 5,
    businessGoal: "Improve deployment reliability and reduce release recovery time.",
    members: ["emp-17"],
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Capacity window opened",
    message: "Five React engineers have moved below 40% allocation for August delivery planning.",
    date: formatISO(addDays(new Date(), -1)),
    level: "info",
  },
  {
    id: "n2",
    title: "Project staffing risk",
    message: "Orbit Commerce Platform is missing one available backend specialist with Spring Boot depth.",
    date: formatISO(addDays(new Date(), -2)),
    level: "warning",
  },
  {
    id: "n3",
    title: "Delivery continuity alert",
    message: "Two ML specialists moved to on-leave status during Nova planning. Regenerate the suggested team.",
    date: formatISO(addDays(new Date(), -3)),
    level: "critical",
  },
];
