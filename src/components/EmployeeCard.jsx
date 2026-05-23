import { Link } from 'react-router-dom';

function matchClass(match) {
  if (match >= 90) return 'bg-green-100 text-green-700';
  if (match >= 70) return 'bg-blue-100 text-blue-700';
  return 'bg-slate-100 text-slate-700';
}

function availDot(status) {
  if (status === 'Available now') return 'bg-green-500';
  if (status === 'Part-time') return 'bg-yellow-500';
  return 'bg-slate-400';
}

function EmployeeCard({ employee }) {
  return (
    <article className="w-full rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
          {employee.initials}
        </div>

        <div className="min-w-[220px] flex-1">
          <p className="font-semibold text-slate-900">{employee.name}</p>
          <p className="text-sm text-slate-500">
            {employee.role} · {employee.experience} yrs
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {employee.skills.slice(0, 5).map((skill) => (
              <span key={skill} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="text-sm text-slate-600">
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
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            View profile
          </Link>
          <button className="rounded-lg bg-indigo-500 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-600">
            Request collaboration
          </button>
        </div>
      </div>
    </article>
  );
}

export default EmployeeCard;
