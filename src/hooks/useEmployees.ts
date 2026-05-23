import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { employeeService } from "@/services/employee.service";

export const useEmployees = () => {
  const query = useQuery({ queryKey: ["employees"], queryFn: employeeService.list });
  const byDepartment = useMemo(() => {
    if (!query.data) return [] as { department: string; total: number }[];
    const map = new Map<string, number>();
    query.data.forEach((e) => map.set(e.department, (map.get(e.department) ?? 0) + 1));
    return Array.from(map.entries()).map(([department, total]) => ({ department, total }));
  }, [query.data]);
  return { ...query, byDepartment };
};