import { employees } from "@/mock/data";
import { sleep } from "@/utils";

export const employeeService = {
  async list() {
    await sleep(500);
    return employees;
  },
  async byId(id: string) {
    await sleep(300);
    return employees.find((e) => e.id === id);
  },
};