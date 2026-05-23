import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: projectService.list,
  });
