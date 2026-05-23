import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sparkles, SlidersHorizontal, X, ChevronDown, CircleDot, WandSparkles, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { aiService } from "@/services/ai.service";
import { useDebounce } from "@/hooks/useDebounce";
import { availabilityLabel, cn } from "@/utils";
import { AnimatedCard, AnimatedPage, FadeIn, StaggerContainer } from "@/components/animations";
import { Button, Input, Skeleton } from "@/components/ui/primitives";
import type { TalentMatch } from "@/types";

const topTabs = ["Find talent", "My projects", "My profile", "Directory"];
const skillChips = ["React", "Python", "ML", "SQL", "Node.js", "Power BI", "Azure", "UX"];
const deptChips = ["Engineering", "Data & Analytics", "Design", "Product", "Operations"];

const ringStroke = 2 * Math.PI * 16;

const TalentSearchPage = () => {
  const [query, setQuery] = useState("React developer with ML experience");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["React", "Python", "ML"]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(["Engineering", "Data & Analytics"]);
  const [availableNow, setAvailableNow] = useState(true);
  const [compare, setCompare] = useState<string[]>([]);
  const [shortlist, setShortlist] = useState<TalentMatch[]>([]);

  const debounced = useDebounce(query);
  const search = useQuery({ queryKey: ["talent-search", debounced], queryFn: () => aiService.talentSearch(debounced) });

  const filteredResults = useMemo(() => {
    const rows = search.data ?? [];
    return rows.filter((row) => {
      const skillOk = selectedSkills.length === 0 || selectedSkills.some((skill) => row.employee.skills.includes(skill));
      const deptOk = selectedDepartments.length === 0 || selectedDepartments.includes(row.employee.department);
      const availabilityOk = !availableNow || row.employee.availability === "immediate";
      return skillOk && deptOk && availabilityOk;
    });
  }, [search.data, selectedSkills, selectedDepartments, availableNow]);

  const activePills = [
    ...selectedSkills.map((s) => ({ key: `skill-${s}`, label: s, type: "skill" as const })),
    ...selectedDepartments.map((d) => ({ key: `dept-${d}`, label: d, type: "dept" as const })),
    ...(availableNow ? [{ key: "availability", label: "Available now", type: "availability" as const }] : []),
  ];

  const toggleFromCompare = (id: string) => {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const addToShortlist = (item: TalentMatch) => {
    setShortlist((prev) => (prev.some((x) => x.employee.id === item.employee.id) ? prev : [...prev, item]));
  };

  return (
    <AnimatedPage className="space-y-4">
      <AnimatedCard className="p-3">
        <div className="flex flex-wrap items-center gap-2">
          {topTabs.map((tab, i) => (
            <button
              key={tab}
              className={cn(
                "rounded-xl border px-4 py-2 text-sm transition",
                i === 0
                  ? "border-[hsl(var(--primary)/0.45)] bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--foreground))]"
                  : "border-[hsl(var(--border))] bg-[hsl(var(--card)/0.72)] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]",
              )}
            >
              {tab}
            </button>
          ))}
          <span className="ml-auto rounded-lg border border-[hsl(var(--border))] px-3 py-1 text-xs text-[hsl(var(--muted-foreground))]">PM</span>
        </div>
      </AnimatedCard>

      <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_280px]">
        <aside className="space-y-3">
          <AnimatedCard className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Filters</p>
              <button className="rounded-lg border border-[hsl(var(--border))] p-1 lg:hidden" onClick={() => setShowFilters((s) => !s)}><SlidersHorizontal className="size-4" /></button>
            </div>

            <div className={cn("space-y-4", showFilters ? "block" : "hidden lg:block")}>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {skillChips.map((skill) => {
                    const active = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        onClick={() => setSelectedSkills((prev) => active ? prev.filter((x) => x !== skill) : [...prev, skill])}
                        className={cn("rounded-full border px-2.5 py-1 text-xs transition", active ? "border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.12)]" : "border-[hsl(var(--border))] hover:bg-[hsl(var(--card-hover))]")}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Department</p>
                <div className="space-y-2">
                  {deptChips.map((dept) => {
                    const checked = selectedDepartments.includes(dept);
                    return (
                      <label key={dept} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => setSelectedDepartments((prev) => checked ? prev.filter((x) => x !== dept) : [...prev, dept])}
                          className="size-4 rounded border-[hsl(var(--border))]"
                        />
                        <span>{dept}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Availability</p>
                <button
                  onClick={() => setAvailableNow((s) => !s)}
                  className={cn("inline-flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm", availableNow ? "border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.1)]" : "border-[hsl(var(--border))]")}
                >
                  Available now
                  <span className={cn("h-5 w-10 rounded-full p-0.5 transition", availableNow ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--muted))]") }>
                    <span className={cn("block size-4 rounded-full bg-white transition", availableNow ? "translate-x-5" : "translate-x-0")} />
                  </span>
                </button>
              </div>
            </div>
          </AnimatedCard>
        </aside>

        <section className="space-y-3">
          <AnimatedCard className="p-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[320px] flex-1">
                <Sparkles className="absolute left-3 top-2.5 size-4 text-[hsl(var(--primary))]" />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
              </div>
              <Button><WandSparkles className="mr-1 size-4" /> AI match</Button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {activePills.map((pill) => (
                <span key={pill.key} className="inline-flex items-center gap-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.76)] px-2 py-1 text-xs">
                  {pill.label}
                  <button
                    onClick={() => {
                      if (pill.type === "skill") setSelectedSkills((prev) => prev.filter((x) => x !== pill.label));
                      if (pill.type === "dept") setSelectedDepartments((prev) => prev.filter((x) => x !== pill.label));
                      if (pill.type === "availability") setAvailableNow(false);
                    }}
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
          </AnimatedCard>

          <p className="text-sm text-[hsl(var(--muted-foreground))]">Showing {filteredResults.length} matches for your query · sorted by relevance</p>

          {search.isLoading ? <div className="grid gap-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-40" />)}</div> : null}

          <StaggerContainer className="grid gap-3">
            {filteredResults.map((item) => {
              const open = expanded === item.employee.id;
              const inCompare = compare.includes(item.employee.id);
              return (
                <FadeIn key={item.employee.id}>
                  <AnimatedCard className="p-4">
                    <div className="mb-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--primary)/0.06)] p-2 text-xs text-[hsl(var(--muted-foreground))]">
                      AI reason: {item.reasoning[0]}. {item.reasoning[2]}.
                    </div>

                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{item.employee.name}</h3>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.employee.role} · {item.employee.experience} yrs exp</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.employee.skills.slice(0, 5).map((skill) => (
                            <span key={skill} className="rounded-full border border-[hsl(var(--border))] px-2 py-0.5 text-xs">{skill}</span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="relative grid size-12 place-items-center">
                          <svg viewBox="0 0 36 36" className="size-12 -rotate-90">
                            <circle cx="18" cy="18" r="16" fill="none" stroke="hsl(var(--border))" strokeWidth="2.5" />
                            <motion.circle
                              cx="18"
                              cy="18"
                              r="16"
                              fill="none"
                              stroke="hsl(var(--success))"
                              strokeWidth="2.5"
                              strokeDasharray={ringStroke}
                              initial={{ strokeDashoffset: ringStroke }}
                              animate={{ strokeDashoffset: ringStroke * (1 - item.matchPercentage / 100) }}
                              transition={{ duration: 0.8 }}
                            />
                          </svg>
                          <span className="absolute text-[10px] font-semibold">{item.matchPercentage}%</span>
                        </div>
                        <button className="rounded-lg border border-[hsl(var(--border))] p-1" onClick={() => setExpanded(open ? null : item.employee.id)}><ChevronDown className={cn("size-4 transition", open && "rotate-180")} /></button>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
                      <span className="inline-flex items-center gap-1"><CircleDot className="size-3 text-[hsl(var(--success))]" /> {availabilityLabel(item.employee.availability)}</span>
                      <span>{item.employee.department}</span>
                      <span>Collab score {item.employee.collaborationScore}</span>
                    </div>

                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                          <ul className="mt-3 list-disc pl-5 text-sm text-[hsl(var(--muted-foreground))]">
                            {item.reasoning.map((reason) => <li key={reason}>{reason}</li>)}
                          </ul>
                          <p className="mt-2 text-xs text-[hsl(var(--primary))]">Why this recommendation was made: skills + availability + collaboration trend.</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button className="bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border-[hsl(var(--border))] hover:bg-[hsl(var(--card-hover))]">View profile</Button>
                      <Button className="bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border-[hsl(var(--border))] hover:bg-[hsl(var(--card-hover))]">Request collaboration</Button>
                      <Button onClick={() => addToShortlist(item)} className="gap-1"><Plus className="size-4" /> Shortlist</Button>
                      <Button onClick={() => toggleFromCompare(item.employee.id)} className={cn("bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border-[hsl(var(--border))] hover:bg-[hsl(var(--card-hover))]", inCompare && "border-[hsl(var(--primary))] text-[hsl(var(--primary))]")}>Compare</Button>
                    </div>
                  </AnimatedCard>
                </FadeIn>
              );
            })}
          </StaggerContainer>
        </section>

        <aside className="space-y-3">
          <AnimatedCard className="p-4">
            <h3 className="text-sm font-semibold">Compare ({compare.length}/3)</h3>
            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Select up to 3 candidates to compare fit quickly.</p>
            <div className="mt-3 space-y-2">
              {compare.length === 0 ? <p className="rounded-xl border border-dashed border-[hsl(var(--border))] p-3 text-xs text-[hsl(var(--muted-foreground))]">No candidates selected yet.</p> : null}
              {compare.map((id) => {
                const person = filteredResults.find((x) => x.employee.id === id);
                if (!person) return null;
                return (
                  <div key={id} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.75)] p-3 text-sm">
                    <p className="font-medium">{person.employee.name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{person.matchPercentage}% match · {person.employee.skills.slice(0, 2).join(" + ")}</p>
                  </div>
                );
              })}
            </div>
          </AnimatedCard>

          <AnimatedCard className="p-4">
            <h3 className="text-sm font-semibold">Shortlist ({shortlist.length})</h3>
            <div className="mt-3 space-y-2">
              {shortlist.length === 0 ? <p className="rounded-xl border border-dashed border-[hsl(var(--border))] p-3 text-xs text-[hsl(var(--muted-foreground))]">Save top candidates here for quick handoff.</p> : null}
              {shortlist.map((row) => (
                <div key={row.employee.id} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.75)] p-3 text-sm">
                  <p className="font-medium">{row.employee.name}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{row.employee.role} · {row.matchPercentage}% match</p>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </aside>
      </div>
    </AnimatedPage>
  );
};

export default TalentSearchPage;
