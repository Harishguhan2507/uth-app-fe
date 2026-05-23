import { employees, projects } from "@/mock/data";
import { sleep } from "@/utils";
import { createTalentMatches, generateTeam } from "@/utils/talent";

export const aiService = {
  async talentSearch(query: string) {
    await sleep(260);
    return createTalentMatches(employees, query);
  },

  async teamRecommendation(projectId: string) {
    await sleep(320);
    const project = projects.find((entry) => entry.id === projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    return generateTeam(employees, project);
  },

  async chat(prompt: string) {
    await sleep(220);
    const p = prompt.toLowerCase();
    if (p.includes("react")) {
      const matches = createTalentMatches(employees, "react typescript");
      return `Found ${matches.length} React-aligned profiles. Top available picks: ${matches.filter((item) => item.employee.availability === "available").slice(0, 3).map((item) => item.employee.name).join(", ")}.`;
    }
    if (p.includes("ml") || p.includes("ai")) {
      const project = projects.find((entry) => entry.id === "proj-nova");
      const team = project ? generateTeam(employees, project) : null;
      return `Strongest AI/ML recommendation: ${team?.lead?.employee.name ?? "No lead available"} with ${team?.developers.slice(0, 2).map((member) => member.employee.name).join(", ") ?? "no developer matches"} for Nova Analytics.`;
    }
    return "Recommended staffing pattern: 1 lead, 2 senior developers, 1 mid-level specialist, and 1 platform contributor for balanced delivery coverage.";
  },
};
