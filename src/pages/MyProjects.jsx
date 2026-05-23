import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

function statusClass(status) {
  if (status === 'Active') return 'bg-green-100 text-green-700';
  if (status === 'Planning') return 'bg-blue-100 text-blue-700';
  return 'bg-slate-100 text-slate-700';
}

function MyProjects() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">My Projects</h2>
      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        {projects.map((project) => (
          <article key={project.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">{project.name}</h3>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(project.status)}`}>
                {project.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{project.description}</p>
            <p className="mt-3 text-sm text-slate-500">Due: {project.due}</p>

            <div className="mt-3 flex -space-x-2">
              {project.members.map((member) => (
                <span
                  key={member}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-indigo-100 text-xs font-semibold text-indigo-700"
                >
                  {member}
                </span>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.skillsNeeded.map((skill) => (
                <span key={skill} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                  {skill}
                </span>
              ))}
            </div>

            <Link
              to="/find-talent"
              className="mt-4 inline-flex rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600"
            >
              Find talent
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default MyProjects;
