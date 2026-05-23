import { addDays, formatISO } from "date-fns";
import type { Employee, NotificationItem } from "@/types";

const skillsPool = [
  "React", "TypeScript", "Node.js", "Python", "ML", "Data Engineering", "AWS", "Terraform", "UI/UX", "Product Strategy",
  "SQL", "GraphQL", "Next.js", "Java", "Kubernetes", "Prompt Engineering", "MLOps", "PowerBI", "Figma", "Go"
];

const departments = ["Engineering", "Data", "Operations", "Product", "Design", "Security"];

export const employees: Employee[] = Array.from({ length: 28 }).map((_, i) => {
  const primary = skillsPool[i % skillsPool.length]!;
  const secondary = skillsPool[(i + 3) % skillsPool.length]!;
  const tertiary = skillsPool[(i + 7) % skillsPool.length]!;
  const availabilityOptions: Employee["availability"][] = ["immediate", "2_weeks", "1_month", "allocated"];

  return {
    id: `emp-${i + 1}`,
    name: `Employee ${i + 1}`,
    avatar: `https://api.dicebear.com/9.x/lorelei/svg?seed=emp-${i + 1}`,
    email: `employee${i + 1}@uth.com`,
    role: i % 7 === 0 ? "Lead Engineer" : i % 5 === 0 ? "ML Engineer" : "Software Engineer",
    department: departments[i % departments.length]!,
    experience: 2 + (i % 11),
    skills: [primary, secondary, tertiary],
    certifications: [`${primary} Professional`, `${secondary} Associate`],
    projects: [`Project ${String.fromCharCode(65 + (i % 6))}`, `Initiative ${i % 10}`],
    availability: availabilityOptions[i % availabilityOptions.length]!,
    collaborationScore: 70 + (i % 28),
    aiMatchScore: 65 + (i % 35),
    recentActivity: `Completed ${secondary} certification`,
  };
});

export const notifications: NotificationItem[] = [
  { id: "n1", title: "New AI recommendation", message: "Team Alpha has a better ML fit with Employee 7", date: formatISO(addDays(new Date(), -1)), level: "info" },
  { id: "n2", title: "Skill shortage detected", message: "Data Engineering capacity dropped in Product org", date: formatISO(addDays(new Date(), -2)), level: "warning" },
  { id: "n3", title: "Team risk detected", message: "Multiple dominant leaders in Team Pulse", date: formatISO(addDays(new Date(), -3)), level: "critical" },
];
