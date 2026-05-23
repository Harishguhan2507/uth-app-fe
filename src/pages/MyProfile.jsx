import { employees } from '../data/employees';

function MyProfile() {
  const me = employees[0];

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-semibold text-indigo-700">
              {me.initials}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Demo PM</h2>
              <p className="text-sm text-slate-600">Product Manager · Product</p>
              <p className="text-sm text-slate-500">8 years experience</p>
            </div>
          </div>
          <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Edit profile
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-base font-semibold text-slate-900">Skills</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {['Roadmapping', 'Stakeholder Mgmt', 'AI Products', 'SQL', 'Agile'].map((skill) => (
            <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-base font-semibold text-slate-900">Past projects</h3>
        <div className="mt-3 space-y-3">
          {me.pastProjects.map((project) => (
            <div key={project.name} className="flex items-center justify-between rounded-lg border border-slate-100 p-3">
              <div>
                <p className="text-sm font-semibold text-slate-800">{project.name}</p>
                <p className="text-xs text-slate-500">Collaborators: {project.collaborators.join(', ')}</p>
              </div>
              <div className="flex -space-x-2">
                {project.collaborators.slice(0, 3).map((name) => (
                  <span
                    key={name}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-indigo-100 text-[10px] font-semibold text-indigo-700"
                  >
                    {name
                      .split(' ')
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join('')}
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
