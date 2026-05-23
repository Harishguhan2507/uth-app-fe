import { Link } from 'react-router-dom';

function matchClass(match) {
  if (match >= 90) return 'bg-emerald-500/10 text-emerald-500';
  if (match >= 70) return 'bg-sky-500/10 text-sky-500';
  return 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]';
}

function availDot(status) {
  if (status === 'Available now') return 'bg-emerald-500';
  if (status === 'Part-time') return 'bg-amber-500';
  return 'bg-[hsl(var(--muted-foreground))]';
}

function EmployeeCard({ employee }) {
  return (
    <article className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-floating)]">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.12)] text-sm font-semibold text-[hsl(var(--primary))]">
          {employee.initials}
        </div>

        <div className="min-w-[220px] flex-1">
          <p className="font-semibold text-[hsl(var(--foreground))]">{employee.name}</p>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            {employee.role} · {employee.experience} yrs
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {employee.skills.slice(0, 5).map((skill) => (
              <span key={skill} className="rounded-full border border-[hsl(var(--border))] px-2.5 py-1 text-xs text-[hsl(var(--muted-foreground))]">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="text-sm text-[hsl(var(--muted-foreground))]">
          <p>{employee.department}</p>
          <p className="mt-1 flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${availDot(employee.availability)}`} />
            {employee.availability}
          </p>
        </div>

        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${matchClass(employee.match)}`}>
          {employee.match}%
        </span>

        <div className="flex gap-2">
          <Link
            to={`/profile/${employee.id}`}
            className="rounded-lg border border-[hsl(var(--border))] px-3 py-2 text-xs font-medium text-[hsl(var(--foreground))] transition hover:bg-[hsl(var(--muted))]"
          >
            View profile
          </Link>
          <button className="rounded-lg bg-[hsl(var(--primary))] px-3 py-2 text-xs font-medium text-white transition hover:brightness-110">
            Request collaboration
          </button>
        </div>
      </div>
    </article>
  );
}

export default EmployeeCard;
