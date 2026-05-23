import { useMemo, useState } from "react";
import { ArrowRight, Mic, Sparkles, UsersRound, Video } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AnimatedCard, AnimatedPage, FadeIn, FloatingElement, StaggerContainer, useMagnetic } from "@/components/animations";
import { Button } from "@/components/ui/primitives";
import { useChartTheme } from "@/hooks/useChartTheme";
import { useEmployees } from "@/hooks/useEmployees";
import { useProjects } from "@/hooks/useProjects";

const candidates = [
  { name: "Ava Nguyen", role: "Enterprise Sales Lead", score: 92, status: "Approved" },
  { name: "Liam Patel", role: "Account Executive", score: 76, status: "Review" },
  { name: "Maya Solano", role: "Customer Success", score: 64, status: "Rejected" },
  { name: "Ethan Park", role: "Sales Development", score: 84, status: "Approved" },
];

const newUsers = [
  { m: "Jan", a: 18, b: 22 },
  { m: "Feb", a: 22, b: 20 },
  { m: "Mar", a: 24, b: 18 },
  { m: "Apr", a: 21, b: 19 },
  { m: "May", a: 19, b: 22 },
  { m: "Jun", a: 17, b: 23 },
  { m: "Jul", a: 16, b: 20 },
  { m: "Aug", a: 19, b: 17 },
  { m: "Sep", a: 21, b: 15 },
];

const DashboardPage = () => {
  const chart = useChartTheme();
  const { data: employees } = useEmployees();
  const { data: projects } = useProjects();
  const [progress] = useState(62);
  const magnetic = useMagnetic();

  const posterStats = useMemo(() => {
    const availableEmployees = (employees ?? []).filter((employee) => employee.availability === "available").length;
    const activeProjects = (projects ?? []).filter((project) => project.status === "active").length;
    const avgPerformance = employees && employees.length > 0
      ? Math.round(employees.reduce((sum, employee) => sum + employee.performanceScore, 0) / employees.length)
      : 0;

    return [
      { label: "Available Talent", value: `${availableEmployees}+`, accent: "text-cyan-300" },
      { label: "Active Projects", value: `${activeProjects}`, accent: "text-emerald-300" },
      { label: "Avg Performance", value: `${avgPerformance}%`, accent: "text-amber-300" },
    ];
  }, [employees, projects]);

  return (
    <AnimatedPage className="space-y-4">
      <AnimatedCard className="relative overflow-hidden p-6">
        <FloatingElement className="-left-10 top-10 h-40 w-40" />
        <FloatingElement className="right-0 top-0 h-52 w-52 bg-sky-500/15" />
        <div className="relative grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_420px]">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary)/0.28)] bg-[hsl(var(--primary)/0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--foreground))]">
              <Sparkles className="size-3.5 text-[hsl(var(--primary))]" />
              Talent Command Center
            </span>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">Match the right people to the right delivery work before capacity becomes a risk.</h1>
              <p className="max-w-2xl text-sm leading-6 text-[hsl(var(--muted-foreground))] md:text-base">
                Monitor staffing availability, generate project teams, and act on live delivery signals from one workspace. The hero section extends the current dashboard without changing the underlying layout structure.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" {...magnetic}>
                Explore Find Talent
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button type="button" className="border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card-hover))]">
                Create Team
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {posterStats.map((stat) => (
                <FadeIn key={stat.label}>
                  <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">{stat.label}</p>
                    <p className={`mt-2 text-3xl font-semibold ${stat.accent}`}>{stat.value}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-[hsl(var(--border))] bg-[linear-gradient(145deg,hsl(var(--primary)/0.18),hsl(var(--secondary)/0.14),hsl(var(--card)))] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Allocation Snapshot</p>
                <h2 className="mt-2 text-2xl font-semibold">This week’s staffing pulse</h2>
              </div>
              <UsersRound className="size-5 text-[hsl(var(--primary))]" />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Bench-ready specialists</p>
                <p className="mt-2 text-3xl font-semibold">14</p>
                <p className="mt-1 text-xs text-[hsl(var(--success))]">+4 from last week</p>
              </div>
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Projects needing leads</p>
                <p className="mt-2 text-3xl font-semibold">3</p>
                <p className="mt-1 text-xs text-[hsl(var(--accent))]">Focus on critical delivery</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={newUsers}>
                  <defs>
                    <linearGradient id="posterGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={chart.grid} />
                  <XAxis dataKey="m" stroke={chart.axis} />
                  <YAxis stroke={chart.axis} />
                  <Tooltip contentStyle={{ background: chart.tooltipBg, border: `1px solid ${chart.tooltipBorder}`, borderRadius: "12px" }} />
                  <Area type="monotone" dataKey="a" stroke="#38bdf8" fill="url(#posterGradient)" strokeWidth={3} />
                  <Line type="monotone" dataKey="b" stroke="#2563eb" strokeWidth={2.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </AnimatedCard>

      <AnimatedCard className="rounded-2xl p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.35em] text-[hsl(var(--muted-foreground))]">TODAY OVERVIEW</p>
            <h2 className="mt-1 text-4xl font-semibold tracking-tight">Live interviews feed</h2>
            <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Track live interview sessions, candidate progress, and AI scoring cues with instant insights.</p>
          </div>
          <p className="text-xs font-semibold tracking-[0.35em] text-[hsl(var(--primary))]">UPDATED 2M AGO</p>
        </div>
      </AnimatedCard>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
        <AnimatedCard className="p-4">
          <div className="rounded-[28px] border border-slate-800/80 bg-[radial-gradient(circle_at_50%_20%,#31418a_0%,#172554_38%,#0f172a_100%)] p-5 text-white">
            <div className="mb-6 flex items-center justify-between">
              <span className="rounded-full border border-white/20 px-3 py-1 text-[11px] tracking-[0.2em]">LIVE</span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-[11px] tracking-[0.2em]">RECORDING</span>
            </div>
            <p className="text-[11px] tracking-[0.3em] text-white/70">INTERVIEW QUESTION</p>
            <h2 className="mt-2 text-4xl font-semibold">Tell us about yourself</h2>
            <p className="mt-1 text-lg text-white/80">Ava Nguyen · Enterprise Sales Lead</p>
            <div className="mt-6 h-3 rounded-full bg-white/15">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-violet-400" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-right text-sm tracking-[0.3em] text-white/80">{progress}% DONE</p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold">Ava Nguyen</p>
              <p className="text-xs tracking-[0.25em] text-[hsl(var(--muted-foreground))]">ENTERPRISE SALES LEAD</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-xl border border-[hsl(var(--border))] px-4 py-2 text-sm text-[hsl(var(--foreground))]"><Mic className="mr-1 inline size-4" /> Mute</button>
              <button className="rounded-xl border border-[hsl(var(--border))] px-4 py-2 text-sm text-[hsl(var(--foreground))]"><Video className="mr-1 inline size-4" /> Video</button>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button type="button" className="border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card-hover))]">Replay</Button>
            <Button type="button" className="border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card-hover))]">Notes</Button>
            <Button type="button">Share Insights</Button>
          </div>
        </AnimatedCard>

        <AnimatedCard className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-3xl font-semibold">Candidate Queue</h3>
            <p className="text-xs tracking-[0.35em] text-[hsl(var(--muted-foreground))]">REAL-TIME</p>
          </div>

          <StaggerContainer className="space-y-3">
            {candidates.map((candidate) => (
              <FadeIn key={candidate.name}>
                <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{candidate.name}</p>
                      <p className="text-xs tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{candidate.role.toUpperCase()}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.22em] ${candidate.status === "Approved" ? "bg-emerald-500/10 text-emerald-500" : candidate.status === "Review" ? "bg-amber-500/10 text-amber-500" : "bg-rose-500/10 text-rose-500"}`}>{candidate.status.toUpperCase()}</span>
                  </div>
                  <p className="mt-2 text-xs tracking-[0.3em] text-[hsl(var(--muted-foreground))]">SCORE {candidate.score}%</p>
                  <div className="mt-1 h-2 rounded-full bg-[hsl(var(--muted))]">
                    <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: `${candidate.score}%` }} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </StaggerContainer>

          <div className="mt-4 rounded-2xl border border-[hsl(var(--border))] p-3">
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={newUsers}>
                <CartesianGrid stroke={chart.grid} />
                <XAxis dataKey="m" stroke={chart.axis} />
                <YAxis stroke={chart.axis} />
                <Tooltip contentStyle={{ background: chart.tooltipBg, border: `1px solid ${chart.tooltipBorder}`, borderRadius: "12px" }} />
                <Line dataKey="a" stroke="#06b6d4" strokeWidth={3} dot={false} />
                <Line dataKey="b" stroke="#8b5cf6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>
      </div>
    </AnimatedPage>
  );
};

export default DashboardPage;

