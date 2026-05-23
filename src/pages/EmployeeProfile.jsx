import { useParams } from 'react-router-dom';
import { employees } from '../data/employees';

function availabilityClass(status) {
  if (status === 'Available now') return 'bg-green-100 text-green-700';
  if (status === 'Part-time') return 'bg-yellow-100 text-yellow-700';
  return 'bg-slate-100 text-slate-700';
}

function EmployeeProfile() {
  const { id } = useParams();
  const employee = employees.find((item) => String(item.id) === id);

  if (!employee) {
    return <p className="text-sm text-slate-600">Employee not found.</p>;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-700">
          {employee.initials}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{employee.name}</h1>
          <p className="text-slate-600">{employee.role}</p>
          <p className="text-sm text-slate-500">
            {employee.department} · {employee.experience} years experience
          </p>
        </div>
        <span className={`ml-auto rounded-full px-3 py-1 text-sm font-medium ${availabilityClass(employee.availability)}`}>
          {employee.availability}
        </span>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-slate-900">Skills</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {employee.skills.map((skill) => (
            <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-slate-900">Past projects</h2>
        <div className="mt-3 space-y-3">
          {employee.pastProjects.map((project) => (
            <div key={project.name} className="rounded-lg border border-slate-200 p-3">
              <p className="font-medium text-slate-900">{project.name}</p>
              <p className="text-sm text-slate-600">Collaborators: {project.collaborators.join(', ')}</p>
            </div>
          ))}
        </div>
      </section>

      <button className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
        Request collaboration
      </button>
    </div>
  );
}

export default EmployeeProfile;
