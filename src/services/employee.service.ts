import { employees } from "@/mock/data";
import { sleep } from "@/utils";

export const employeeService = {
  async list() {
    await sleep(250);
    return employees;
  },
  async byId(id: string) {
    await sleep(180);
    return employees.find((e) => e.id === id);
  },
};
