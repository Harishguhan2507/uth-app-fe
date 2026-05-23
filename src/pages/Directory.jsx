import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { employees } from '../data/employees';

function Directory() {
  const [term, setTerm] = useState('');

  const filtered = useMemo(() => {
    const query = term.toLowerCase();
    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query) ||
        employee.skills.join(' ').toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query),
    );
  }, [term]);

  const departments = useMemo(() => {
    const map = new Map();
    filtered.forEach((employee) => {
      const department = employee.department || 'Unknown';
      const entries = map.get(department) ?? [];
      entries.push(employee);
      map.set(department, entries);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[var(--shadow-soft)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
              Employee directory
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
              Team flowchart view
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-[hsl(var(--muted-foreground))]">
              Filter employees by name, skill, or department and browse them in a department-centered flow layout.
            </p>
          </div>
          <div className="w-full max-w-md">
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search by name, skill, or department"
              className="w-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-sm text-[hsl(var(--foreground))] outline-none transition placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary)/0.6)] focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]"
            />
          </div>
        </div>
      </div>

      {departments.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {departments.map(([department, members]) => (
            <div key={department} className="rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[var(--shadow-soft)]">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Department</p>
                  <h2 className="mt-2 text-xl font-semibold text-[hsl(var(--foreground))]">{department}</h2>
                </div>
                <div className="rounded-full bg-[hsl(var(--muted))] px-3 py-1 text-xs font-semibold text-[hsl(var(--muted-foreground))]">
                  {members.length} members
                </div>
              </div>

              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.5)] p-6">
                <div className="mx-auto flex w-fit flex-col items-center gap-4">
                  <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-6 py-4 text-center shadow-[var(--shadow-soft)]">
                    <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Team hub</p>
                    <p className="mt-2 text-sm font-semibold text-[hsl(var(--foreground))]">{department}</p>
                  </div>
                  <div className="h-8 w-px rounded-full bg-[hsl(var(--border))]" />
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {members.map((employee) => (
                    <Link
                      key={employee.id}
                      to={`/profile/${employee.id}`}
                      className="group relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 transition hover:-translate-y-0.5 hover:border-[hsl(var(--primary)/0.4)] hover:shadow-[var(--shadow-floating)]"
                    >
                      <div className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-[hsl(var(--border))]" />
                      <div className="relative pt-6">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold text-[hsl(var(--foreground))]">{employee.name}</p>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">{employee.role}</p>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-xs font-medium ${employee.availability === 'Available now' ? 'bg-emerald-500/10 text-emerald-500' : employee.availability === 'Part-time' ? 'bg-amber-500/10 text-amber-500' : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]'}`}>
                            {employee.availability}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {employee.skills.slice(0, 3).map((skill) => (
                            <span key={skill} className="rounded-full border border-[hsl(var(--border))] px-2 py-1 text-xs text-[hsl(var(--muted-foreground))]">
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
        <div className="rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 text-center text-sm text-[hsl(var(--muted-foreground))] shadow-[var(--shadow-soft)]">
          No employees found. Try a broader search or clear your search term.
        </div>
      )}
    </div>
  );
}

export default Directory;

