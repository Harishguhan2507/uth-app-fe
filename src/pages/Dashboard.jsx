import { AlertTriangle, Briefcase, UserCheck, Users } from 'lucide-react';
import AIInsightBox from '../components/AIInsightBox';
import MetricCard from '../components/MetricCard';
import SkillBar from '../components/SkillBar';
import { employees } from '../data/employees';
import { recentRequests } from '../data/projects';

const demandBars = [
  { label: 'Python', value: 87, colorClass: 'bg-indigo-500' },
  { label: 'React', value: 74, colorClass: 'bg-blue-500' },
  { label: 'ML', value: 68, colorClass: 'bg-violet-500' },
  { label: 'SQL', value: 55, colorClass: 'bg-sky-500' },
  { label: 'Node.js', value: 42, colorClass: 'bg-cyan-500' },
  { label: 'Power BI', value: 33, colorClass: 'bg-emerald-500' },
];

function matchClass(match) {
  if (match >= 90) return 'bg-green-100 text-green-700';
  if (match >= 70) return 'bg-blue-100 text-blue-700';
  return 'bg-slate-100 text-slate-700';
}

function statusClass(status) {
  return status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
}

function Dashboard() {
  const topMatches = [...employees].sort((a, b) => b.match - a.match).slice(0, 4);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-4">
        <MetricCard
          title="Total Employees"
          value="248"
          changeText="+12 this quarter"
          icon={Users}
          iconClass="bg-violet-100 text-violet-600"
        />
        <MetricCard
          title="Available Now"
          value="67"
          changeText="+5 from last week"
          icon={UserCheck}
          iconClass="bg-green-100 text-green-600"
        />
        <MetricCard
          title="Active Projects"
          value="34"
          changeText="+2 ongoing"
          icon={Briefcase}
          iconClass="bg-blue-100 text-blue-600"
        />
        <MetricCard
          title="Skill Gaps"
          value="12"
          changeText="-1 after upskilling"
          icon={AlertTriangle}
          iconClass="bg-amber-100 text-amber-600"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-base font-semibold text-slate-900">Top talent matches</h2>
          <div className="mt-3">
            <AIInsightBox text="3 people developed skills relevant to your upcoming Q3 AI project — none in Engineering." />
          </div>

          <div className="mt-4 space-y-3">
            {topMatches.map((person) => (
              <div key={person.id} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                  {person.initials}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{person.name}</p>
                  <p className="text-xs text-slate-500">{person.role}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {person.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <span
                  className={`inline-flex h-2.5 w-2.5 rounded-full ${
                    person.availability === 'Available now' ? 'bg-green-500' : 'bg-slate-400'
                  }`}
                />
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${matchClass(person.match)}`}>
                  {person.match}%
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-base font-semibold text-slate-900">Skills in demand</h2>
          <div className="mt-4 space-y-3">
            {demandBars.map((bar) => (
              <SkillBar key={bar.label} label={bar.label} value={bar.value} colorClass={bar.colorClass} />
            ))}
          </div>

          <div className="mt-5 border-t border-slate-200 pt-4">
            <h3 className="text-sm font-semibold text-slate-900">Recent requests</h3>
            <div className="mt-3 space-y-2">
              {recentRequests.slice(0, 2).map((row, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                  <p className="text-sm text-slate-700">
                    {row.requester} → {row.project}
                  </p>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusClass(row.status)}`}>
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Dashboard;
