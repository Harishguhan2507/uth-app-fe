import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { employees } from "../data/employees";

function Directory() {
  const [term, setTerm] = useState("");

  const filtered = useMemo(() => {
    const query = term.toLowerCase();
    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query) ||
        employee.skills.join(" ").toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query),
    );
  }, [term]);

  const departments = useMemo(() => {
    const map = new Map();
    filtered.forEach((employee) => {
      const department = employee.department || "Unknown";
      const entries = map.get(department) ?? [];
      entries.push(employee);
      map.set(department, entries);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Employee directory
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Team flowchart view
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Filter employees by name, skill, or department and browse them in
              a department-centered flow layout.
            </p>
          </div>
          <div className="w-full max-w-md">
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search by name, skill, or department"
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>
      </div>

      {departments.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {departments.map(([department, members]) => (
            <div
              key={department}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    Department
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">
                    {department}
                  </h2>
                </div>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {members.length} members
                </div>
              </div>

              <div className="rounded-4xl border border-slate-200 bg-slate-50 p-6">
                <div className="mx-auto flex w-fit flex-col items-center gap-4">
                  <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 text-center shadow-sm">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                      Team hub
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {department}
                    </p>
                  </div>
                  <div className="h-8 w-px rounded-full bg-slate-200" />
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {members.map((employee) => (
                    <Link
                      key={employee.id}
                      to={`/profile/${employee.id}`}
                      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-slate-300"
                    >
                      <div className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-slate-200" />
                      <div className="relative pt-6">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-900">
                              {employee.name}
                            </p>
                            <p className="text-sm text-slate-500">
                              {employee.role}
                            </p>
                          </div>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                            {employee.availability}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                          {employee.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-slate-200 px-2 py-1"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
          No employees found. Try a broader search or clear your search term.
        </div>
      )}
    </div>
  );
}

export default Directory;
