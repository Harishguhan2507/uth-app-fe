import { z } from "zod";

export const createTeamSchema = z.object({
  name: z.string().min(2, "Team name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  requiredSkills: z.array(z.string()).min(1, "Select at least one skill"),
  teamSize: z.coerce.number().min(1, "Team size must be at least 1").max(50, "Team size cannot exceed 50"),
  projectRole: z.string().min(2, "Project role is required"),
  workMode: z.enum(["remote", "hybrid", "onsite"]),
  availability: z.enum(["immediate", "next_sprint", "next_quarter"]),
});

export type CreateTeamFormValues = z.infer<typeof createTeamSchema>;
