import { projects } from "@/mock/data";
import { sleep } from "@/utils";

export const projectService = {
  async list() {
    await sleep(220);
    return projects;
  },
  async byId(id: string) {
    await sleep(160);
    return projects.find((project) => project.id === id);
  },
};
