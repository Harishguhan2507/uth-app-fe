import { useMemo } from 'react';
import { AlertTriangle, Briefcase, UserCheck, Users } from 'lucide-react';
import AIInsightBox from '../components/AIInsightBox';
import MetricCard from '../components/MetricCard';
import SkillBar from '../components/SkillBar';
import { employees } from '../data/employees';
import { projects, recentRequests } from '../data/projects';

const demandBars = [
  { label: 'Python', value: 87, colorClass: 'bg-indigo-500' },
  { label: 'React', value: 74, colorClass: 'bg-blue-500' },
  { label: 'ML', value: 68, colorClass: 'bg-violet-500' },
  { label: 'SQL', value: 55, colorClass: 'bg-sky-500' },
  { label: 'Node.js', value: 42, colorClass: 'bg-cyan-500' },
  { label: 'Power BI', value: 33, colorClass: 'bg-emerald-500' },
];

function matchClass(match) {
  if (match >= 90) return 'bg-emerald-500/10 text-emerald-500';
  if (match >= 70) return 'bg-sky-500/10 text-sky-500';
  return 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]';
}

function statusClass(status) {
  return status === 'Approved'
    ? 'bg-emerald-500/10 text-emerald-500'
    : 'bg-amber-500/10 text-amber-500';
}

function Dashboard() {
  const topMatches = [...employees].sort((a, b) => b.match - a.match).slice(0, 4);

  const stats = useMemo(() => {
    const totalEmployees = employees.length;
    const availableNow = employees.filter((e) => e.availability === 'Available now').length;
    const activeProjects = projects.filter((p) => p.status === 'Active').length;

    // Skills needed across all projects that no employee covers
    const allEmployeeSkills = new Set(employees.flatMap((e) => e.skills.map((s) => s.toLowerCase())));
    const allNeededSkills = [...new Set(projects.flatMap((p) => p.skillsNeeded.map((s) => s.toLowerCase())))];
    const skillGaps = allNeededSkills.filter((s) => !allEmployeeSkills.has(s)).length;

    return { totalEmployees, availableNow, activeProjects, skillGaps };
  }, []);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-4">
        <MetricCard title="Total Employees" value={stats.totalEmployees} changeText={`${stats.totalEmployees} in the system`} icon={Users} iconClass="bg-violet-500/10 text-violet-500" />
        <MetricCard title="Available Now" value={stats.availableNow} changeText={`${stats.availableNow} of ${stats.totalEmployees} available`} icon={UserCheck} iconClass="bg-emerald-500/10 text-emerald-500" />
        <MetricCard title="Active Projects" value={stats.activeProjects} changeText={`${projects.length} total projects`} icon={Briefcase} iconClass="bg-sky-500/10 text-sky-500" />
        <MetricCard title="Skill Gaps" value={stats.skillGaps} changeText="skills not covered by team" icon={AlertTriangle} iconClass="bg-amber-500/10 text-amber-500" />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-[var(--shadow-soft)]">
          <h2 className="text-base font-semibold text-[hsl(var(--foreground))]">Top talent matches</h2>
          <div className="mt-3">
            <AIInsightBox text="3 people developed skills relevant to your upcoming Q3 AI project — none in Engineering." />
          </div>
          <div className="mt-4 space-y-3">
            {topMatches.map((person) => (
              <div key={person.id} className="flex items-center gap-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.12)] text-xs font-semibold text-[hsl(var(--primary))]">
                  {person.initials}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{person.name}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{person.role}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {person.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="rounded-full border border-[hsl(var(--border))] px-2 py-0.5 text-[11px] text-[hsl(var(--muted-foreground))]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <span className={`inline-flex h-2.5 w-2.5 rounded-full ${person.availability === 'Available now' ? 'bg-emerald-500' : 'bg-[hsl(var(--muted-foreground))]'}`} />
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${matchClass(person.match)}`}>
                  {person.match}%
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-[var(--shadow-soft)]">
          <h2 className="text-base font-semibold text-[hsl(var(--foreground))]">Skills in demand</h2>
          <div className="mt-4 space-y-3">
            {demandBars.map((bar) => (
              <SkillBar key={bar.label} label={bar.label} value={bar.value} colorClass={bar.colorClass} />
            ))}
          </div>
          <div className="mt-5 border-t border-[hsl(var(--border))] pt-4">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Recent requests</h3>
            <div className="mt-3 space-y-2">
              {recentRequests.slice(0, 2).map((row, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg bg-[hsl(var(--muted))] px-3 py-2">
                  <p className="text-sm text-[hsl(var(--foreground))]">
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

