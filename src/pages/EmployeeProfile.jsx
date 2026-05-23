import { useParams } from "react-router-dom";
import { employees } from "../data/employees";

function availabilityClass(status) {
  if (status === "Available now") return "bg-green-100 text-green-700";
  if (status === "Part-time") return "bg-yellow-100 text-yellow-700";
  return "bg-slate-100 text-slate-700";
}

function EmployeeProfile() {
  const { id } = useParams();
  const employee = employees.find((item) => String(item.id) === id);

  if (!employee) {
    return <p className="text-sm text-slate-600">Employee not found.</p>;
  }
  const prof =
    employee.skillProficiency ??
    employee.skills?.map((s) => ({ name: s, years: 1 })) ??
    [];
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
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-indigo-100 text-3xl font-bold text-indigo-700">
              {employee.initials}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {employee.name}
              </h1>
              <p className="text-sm text-slate-600">
                {employee.role} · {employee.department}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Employee ID:{" "}
                <span className="font-medium text-slate-900">
                  {employee.id}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-600">Experience</div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
              {employee.experience} yrs
            </div>
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${availabilityClass(employee.availability)}`}
            >
              {employee.availability}
            </span>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-base font-semibold text-slate-900">
          Skill Proficiency
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Bar chart shows years of experience per skill.
        </p>

        <div className="mt-4 space-y-3">
          {prof.map((p, idx) => {
            const percent = Math.round((p.years / maxYears) * 100);
            const gradient = gradients[idx % gradients.length];
            return (
              <div key={p.name} className="flex items-center gap-4">
                <div className="w-36 text-sm font-medium text-slate-700">
                  {p.name}
                </div>
                <div className="flex-1 h-4 rounded-full bg-slate-100/60 p-[2px]">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r ${gradient} shadow-sm`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="ml-3 w-20 text-sm font-semibold text-slate-700 text-right">
                  {p.years} yr{p.years > 1 ? "s" : ""}
                  <div className="text-xs text-slate-500">{percent}%</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-base font-semibold text-slate-900">
          Past projects
        </h2>
        <div className="mt-3 space-y-3">
          {employee.pastProjects.map((project) => (
            <div
              key={project.name}
              className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {project.name}
                </p>
                <p className="text-xs text-slate-500">
                  Collaborators: {project.collaborators.join(", ")}
                </p>
              </div>
              <div className="flex -space-x-2">
                {project.collaborators.slice(0, 3).map((name) => (
                  <span
                    key={name}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-indigo-100 text-[10px] font-semibold text-indigo-700"
                  >
                    {name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex gap-3">
        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          Request collaboration
        </button>
        <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          Message
        </button>
      </div>
    </div>
  );
}

export default EmployeeProfile;
