import { useState } from "react";
import { Mic, Video } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AnimatedCard, AnimatedPage } from "@/components/animations";
import { Button } from "@/components/ui/primitives";
import { useChartTheme } from "@/hooks/useChartTheme";

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
  const [progress] = useState(62);

  return (
    <AnimatedPage className="space-y-4">
      <AnimatedCard className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.35em] text-[#9ca3af]">TODAY OVERVIEW</p>
            <h1 className="mt-1 text-5xl font-semibold tracking-tight text-[#111827]">Live interviews feed</h1>
            <p className="mt-2 text-sm text-[#6b7280]">Track live interview sessions, candidate progress, and AI scoring cues with instant insights.</p>
          </div>
          <p className="text-xs font-semibold tracking-[0.35em] text-[#6366f1]">UPDATED 2M AGO</p>
        </div>
      </AnimatedCard>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
        <AnimatedCard className="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div className="rounded-[28px] border border-[#1f2a44] bg-[radial-gradient(circle_at_50%_20%,#2f3b7a_0%,#0f1b3a_40%,#0a1228_100%)] p-5 text-white">
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

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-[#111827]">Ava Nguyen</p>
              <p className="text-xs tracking-[0.25em] text-[#9ca3af]">ENTERPRISE SALES LEAD</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-xl border border-[#e5e7eb] px-4 py-2 text-sm text-[#374151]"><Mic className="mr-1 inline size-4" /> Mute</button>
              <button className="rounded-xl border border-[#e5e7eb] px-4 py-2 text-sm text-[#374151]"><Video className="mr-1 inline size-4" /> Video</button>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button className="border-[#e5e7eb] bg-white text-[#374151]">Replay</Button>
            <Button className="border-[#e5e7eb] bg-white text-[#374151]">Notes</Button>
            <Button>Share Insights</Button>
          </div>
        </AnimatedCard>

        <AnimatedCard className="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-3xl font-semibold text-[#111827]">Candidate Queue</h3>
            <p className="text-xs tracking-[0.35em] text-[#9ca3af]">REAL-TIME</p>
          </div>

          <div className="space-y-3">
            {candidates.map((c) => (
              <div key={c.name} className="rounded-2xl border border-[#eceff3] bg-[#fbfcff] p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#111827]">{c.name}</p>
                    <p className="text-xs tracking-[0.2em] text-[#9ca3af]">{c.role.toUpperCase()}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.22em] ${c.status === "Approved" ? "bg-emerald-100 text-emerald-600" : c.status === "Review" ? "bg-amber-100 text-amber-600" : "bg-rose-100 text-rose-600"}`}>{c.status.toUpperCase()}</span>
                </div>
                <p className="mt-2 text-xs tracking-[0.3em] text-[#6b7280]">SCORE {c.score}%</p>
                <div className="mt-1 h-2 rounded-full bg-[#edf1f5]"><div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: `${c.score}%` }} /></div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-[#eceff3] p-3">
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
            <div className="mt-2">
              <ResponsiveContainer width="100%" height={90}>
                <AreaChart data={newUsers}>
                  <defs>
                    <linearGradient id="revx" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="b" stroke="#8b5cf6" fill="url(#revx)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </AnimatedPage>
  );
};

export default DashboardPage;
