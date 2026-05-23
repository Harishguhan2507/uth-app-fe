import { useEffect, useMemo, useState } from "react";
import { Award, BriefcaseBusiness, CalendarRange, CheckCircle2, Mail, MapPin, PencilLine, Phone, ShieldCheck, Sparkles, UserCircle2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEmployees } from "@/hooks/useEmployees";
import { useAuthStore } from "@/store/auth.store";
import { availabilityLabel } from "@/utils";
import { AnimatedCard, AnimatedPage, FadeIn, StaggerContainer } from "@/components/animations";
import { Button, Card, Input } from "@/components/ui/primitives";

const profileByRole = {
  admin: "emp-5",
  project_manager: "emp-27",
  employee: "emp-11",
} as const;

const availabilityTone = {
  available: "bg-emerald-500/10 text-emerald-500",
  busy: "bg-amber-500/10 text-amber-500",
  on_leave: "bg-rose-500/10 text-rose-500",
} as const;

const ProfilePage = () => {
  const { id } = useParams();
  const session = useAuthStore((state) => state.session);
  const { data } = useEmployees();
  const employeeId = id ?? (session ? profileByRole[session.role] : "emp-11");
  const employee = useMemo(() => data?.find((entry) => entry.id === employeeId), [data, employeeId]);
  const [editingOverview, setEditingOverview] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [draftTitle, setDraftTitle] = useState(employee?.title ?? "");
  const [draftBio, setDraftBio] = useState(employee?.bio ?? "");

  useEffect(() => {
    if (!employee) return;
    setDraftTitle(employee.title);
    setDraftBio(employee.bio);
  }, [employee]);

  if (!employee) {
    return <Card className="p-4">Employee not found.</Card>;
  }

  const saveOverview = () => {
    setEditingOverview(false);
    setEditingBio(false);
  };

  return (
    <AnimatedPage className="space-y-4">
      <AnimatedCard className="overflow-hidden p-5">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_360px]">
          <div className="space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={employee.avatar} alt={employee.name} className="size-24 rounded-[28px] border border-[hsl(var(--border))] bg-[hsl(var(--card-hover))]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))]">My Profile</p>
                  <h1 className="mt-1 text-3xl font-semibold">{employee.name}</h1>
                  {editingOverview ? (
                    <div className="mt-2 max-w-sm">
                      <Input value={draftTitle} onChange={(event) => setDraftTitle(event.target.value)} />
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{draftTitle || employee.title}</p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                    <span className="inline-flex items-center gap-1"><MapPin className="size-4" /> {employee.location}</span>
                    <span className="inline-flex items-center gap-1"><BriefcaseBusiness className="size-4" /> {employee.department}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${availabilityTone[employee.availability]}`}>{availabilityLabel(employee.availability)}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" onClick={() => setEditingOverview((current) => !current)} className="border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card-hover))]">
                  <PencilLine className="mr-2 size-4" />
                  {editingOverview ? "Close edit" : "Edit overview"}
                </Button>
                {(editingOverview || editingBio) ? <Button type="button" onClick={saveOverview}>Save changes</Button> : null}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Experience</p>
                <p className="mt-2 text-3xl font-semibold">{employee.experience} yrs</p>
              </div>
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Performance</p>
                <p className="mt-2 text-3xl font-semibold">{employee.performanceScore}</p>
              </div>
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Allocation</p>
                <p className="mt-2 text-3xl font-semibold">{employee.currentProjectAllocation}%</p>
              </div>
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Profile completion</p>
                <p className="mt-2 text-3xl font-semibold">{employee.stats.profileCompletion}%</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[hsl(var(--primary)/0.24)] bg-[linear-gradient(140deg,hsl(var(--primary)/0.12),hsl(var(--secondary)/0.08),hsl(var(--card)))] p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">Profile completion</p>
            <div className="mt-3 h-3 rounded-full bg-[hsl(var(--muted))]">
              <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500" style={{ width: `${employee.stats.profileCompletion}%` }} />
            </div>
            <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">Add more certifications, project outcomes, and mentoring highlights to increase profile discoverability.</p>
            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3">
                <p className="text-sm font-medium">Availability status</p>
                <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{availabilityLabel(employee.availability)} with {employee.currentProjectAllocation}% current allocation.</p>
              </div>
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3">
                <p className="text-sm font-medium">Recent activity</p>
                <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{employee.recentActivity}</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_360px]">
        <div className="space-y-4">
          <AnimatedCard className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Professional summary</h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Editable profile overview aligned with the app’s existing card system.</p>
              </div>
              <Button type="button" onClick={() => setEditingBio((current) => !current)} className="border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card-hover))]">Edit summary</Button>
            </div>
            {editingBio ? (
              <textarea
                value={draftBio}
                onChange={(event) => setDraftBio(event.target.value)}
                className="mt-4 min-h-32 w-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 text-sm outline-none focus:border-[hsl(var(--primary)/0.6)]"
              />
            ) : (
              <p className="mt-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{draftBio || employee.bio}</p>
            )}
          </AnimatedCard>

          <AnimatedCard className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Skills</h2>
              <span className="text-sm text-[hsl(var(--muted-foreground))]">{employee.skills.length} highlighted skills</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {employee.skills.map((skill) => (
                <span key={skill} className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-sm">{skill}</span>
              ))}
            </div>
          </AnimatedCard>

          <AnimatedCard className="p-5">
            <div className="flex items-center gap-2">
              <CalendarRange className="size-4 text-[hsl(var(--primary))]" />
              <h2 className="text-lg font-semibold">Experience timeline</h2>
            </div>
            <StaggerContainer className="mt-4 space-y-3">
              {employee.projectHistory.map((item) => (
                <FadeIn key={item.id}>
                  <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.role}</p>
                      </div>
                      <span className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">{item.duration}</span>
                    </div>
                    <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">{item.summary}</p>
                    <p className="mt-2 text-sm font-medium">{item.impact}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.stack.map((skill) => (
                        <span key={skill} className="rounded-full border border-[hsl(var(--border))] px-2.5 py-1 text-xs">{skill}</span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </StaggerContainer>
          </AnimatedCard>

          <AnimatedCard className="p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-[hsl(var(--secondary))]" />
              <h2 className="text-lg font-semibold">Certifications</h2>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {employee.certificationDetails.map((certification) => (
                <div key={certification.name} className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                  <p className="font-semibold">{certification.name}</p>
                  <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{certification.issuer}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">{certification.year}</p>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>

        <div className="space-y-4">
          <AnimatedCard className="p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-[hsl(var(--primary))]" />
              <h2 className="text-lg font-semibold">Quick stats</h2>
            </div>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">Completed projects</p>
                <p className="mt-2 text-2xl font-semibold">{employee.stats.completedProjects}</p>
              </div>
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">Mentoring hours</p>
                <p className="mt-2 text-2xl font-semibold">{employee.stats.mentoringHours}</p>
              </div>
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">Certifications</p>
                <p className="mt-2 text-2xl font-semibold">{employee.stats.certifications}</p>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="p-5">
            <div className="flex items-center gap-2">
              <UserCircle2 className="size-4 text-[hsl(var(--secondary))]" />
              <h2 className="text-lg font-semibold">Contact</h2>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <p className="inline-flex items-center gap-2 text-[hsl(var(--muted-foreground))]"><Mail className="size-4" /> {employee.email}</p>
              <p className="inline-flex items-center gap-2 text-[hsl(var(--muted-foreground))]"><Phone className="size-4" /> {employee.phone}</p>
              <p className="inline-flex items-center gap-2 text-[hsl(var(--muted-foreground))]"><MapPin className="size-4" /> {employee.location}</p>
            </div>
          </AnimatedCard>

          <AnimatedCard className="p-5">
            <div className="flex items-center gap-2">
              <Award className="size-4 text-[hsl(var(--accent))]" />
              <h2 className="text-lg font-semibold">Project history</h2>
            </div>
            <div className="mt-4 space-y-3">
              {employee.projectHistory.map((project) => (
                <div key={project.id} className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                  <p className="font-semibold">{project.name}</p>
                  <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{project.summary}</p>
                </div>
              ))}
            </div>
          </AnimatedCard>

          <AnimatedCard className="p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-[hsl(var(--success))]" />
              <h2 className="text-lg font-semibold">Current focus</h2>
            </div>
            <div className="mt-4 space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
              <p>{employee.currentProjectAssignments.join(", ") || "Bench allocation available for upcoming workstreams."}</p>
              <p>Joined {employee.joinedAt}</p>
              <p className="capitalize">{employee.seniorityLevel} level</p>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ProfilePage;

