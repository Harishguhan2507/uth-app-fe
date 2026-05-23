import { employees } from "../data/employees";

function MyProfile() {
  const me = employees[0];
  const prof = me.skillProficiency ?? me.skills?.map((s) => ({ name: s, years: 1 })) ?? [];
  const maxYears = Math.max(1, ...prof.map((p) => p.years));
  const gradients = [
    "from-indigo-500 to-pink-500",
    "from-emerald-400 to-teal-500",
    "from-yellow-400 to-orange-500",
    "from-purple-500 to-violet-500",
    "from-sky-400 to-indigo-500",
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[var(--shadow-soft)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-[hsl(var(--primary)/0.12)] text-3xl font-semibold text-[hsl(var(--primary))]">
              {me.initials}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[hsl(var(--foreground))]">{me.name}</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{me.role} · {me.department}</p>
              <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                Employee ID: <span className="font-medium text-[hsl(var(--foreground))]">{me.id}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-[hsl(var(--muted-foreground))]">Experience</div>
            <div className="rounded-full bg-[hsl(var(--muted))] px-3 py-1 text-sm font-semibold text-[hsl(var(--foreground))]">
              {me.experience} yrs
            </div>
            <button className="rounded-lg border border-[hsl(var(--border))] px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] transition hover:bg-[hsl(var(--muted))]">
              Edit profile
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[var(--shadow-soft)]">
        <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">Skill Proficiency</h3>
        <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Easy to compare skills — shows years experience.</p>
        <div className="mt-4 space-y-3">
          {prof.map((p, idx) => {
            const percent = Math.round((p.years / maxYears) * 100);
            const gradient = gradients[idx % gradients.length];
            return (
              <div key={p.name} className="flex items-center gap-4">
                <div className="w-36 text-sm font-medium text-[hsl(var(--foreground))]">{p.name}</div>
                <div className="flex-1 h-4 rounded-full bg-[hsl(var(--muted))] p-[2px]">
                  <div className={`h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r ${gradient}`} style={{ width: `${percent}%` }} />
                </div>
                <div className="ml-3 w-20 text-right text-sm font-semibold text-[hsl(var(--foreground))]">
                  {p.years} yr{p.years > 1 ? "s" : ""}
                  <div className="text-xs text-[hsl(var(--muted-foreground))]">{percent}%</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[var(--shadow-soft)]">
        <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">Past projects</h3>
        <div className="mt-3 space-y-3">
          {me.pastProjects.map((project) => (
            <div key={project.name} className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-3">
              <div>
                <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{project.name}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Collaborators: {project.collaborators.join(", ")}</p>
              </div>
              <div className="flex -space-x-2">
                {project.collaborators.slice(0, 3).map((name) => (
                  <span key={name} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[hsl(var(--card))] bg-[hsl(var(--primary)/0.12)] text-[10px] font-semibold text-[hsl(var(--primary))]">
                    {name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MyProfile;
