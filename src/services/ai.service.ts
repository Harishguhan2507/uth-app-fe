import { employees } from "@/mock/data";
import { sleep } from "@/utils";
import type { TalentMatch } from "@/types";

const normalize = (value: string) => value.toLowerCase();

export const aiService = {
  async talentSearch(query: string): Promise<TalentMatch[]> {
    await sleep(700);
    const keywords = query.toLowerCase().split(/\s+/).filter(Boolean);

    return employees
      .map((employee) => {
        const overlap = employee.skills.filter((skill) => keywords.some((k) => normalize(skill).includes(k)));
        const matchPercentage = Math.min(98, Math.round((overlap.length / Math.max(1, employee.skills.length)) * 75 + employee.collaborationScore * 0.25));
        return {
          employee,
          skillOverlap: overlap,
          matchPercentage,
          reasoning: [
            `Strong ${employee.skills.slice(0, 2).join(" + ")} expertise`,
            `Worked on ${employee.projects[0]} and ${employee.projects[1]}`,
            employee.availability === "immediate" ? "Available immediately" : `Availability: ${employee.availability.replace("_", " ")}`,
            `Collaboration score: ${employee.collaborationScore}`,
          ],
        } satisfies TalentMatch;
      })
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 8);
  },

  async teamRecommendation(projectDescription: string, selectedIds: string[]) {
    await sleep(800);
    const team = employees.filter((e) => selectedIds.includes(e.id));
    const missingSkills = ["Kubernetes", "MLOps", "GraphQL"].filter((skill) => !team.some((m) => m.skills.includes(skill))).slice(0, 2);
    return {
      chemistryScore: 72 + Math.min(24, team.length * 3),
      projectSuccess: 74 + Math.min(20, team.length * 2),
      risks: team.filter((m) => m.role.includes("Lead")).length > 1 ? ["Risk: Multiple dominant leaders detected"] : ["Leadership structure looks stable"],
      balance: `Excellent frontend/backend balance for ${projectDescription || "target project"}`,
      missingSkills,
      why: "Why: Recommendation is based on skill overlap, availability, and prior collaboration outcomes.",
    };
  },

  async chat(prompt: string) {
    await sleep(500);
    const p = prompt.toLowerCase();
    if (p.includes("react")) return "Found 9 React engineers; 4 are available immediately. Top picks: Employee 3, 7, 14.";
    if (p.includes("ml")) return "Strongest ML engineers: Employee 5, 11, 20 based on match score + recent ML project history.";
    return "Suggested team for AI dashboard project: 1 frontend lead, 2 full-stack engineers, 1 ML engineer, 1 data engineer. Why: highest cross-functional success trend.";
  },
};