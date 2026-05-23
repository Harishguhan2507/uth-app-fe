import { useDeferredValue, useMemo, useState } from "react";
import { BriefcaseBusiness, ChevronDown, CircleDot, MapPin, SlidersHorizontal, Sparkles, UserRoundSearch, WandSparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import { useEmployees } from "@/hooks/useEmployees";
import { availabilityLabel, cn } from "@/utils";
import { applyTalentFilters, createTalentMatches } from "@/utils/talent";
import { AnimatedCard, AnimatedPage, FadeIn, StaggerContainer } from "@/components/animations";
import { Button, Input, Skeleton } from "@/components/ui/primitives";
import type { TalentFilters, TalentMatch } from "@/types";

const topTabs = [
  { label: "Find Talent", path: "/talent-search" },
  { label: "My Projects", path: "/team-builder" },
  { label: "My Profile", path: "/profile" },
  { label: "Directory", path: "/directory" },
];

const availabilityOptions: { value: TalentFilters["availability"]; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "busy", label: "Busy" },
  { value: "on_leave", label: "On Leave" },
];

const assignmentOptions: { value: TalentFilters["projectAssignment"]; label: string }[] = [
  { value: "all", label: "Any assignment" },
  { value: "unassigned", label: "Unassigned" },
  { value: "light", label: "Light workload" },
  { value: "balanced", label: "Balanced workload" },
  { value: "heavy", label: "Heavy workload" },
];

const experienceOptions = [
  { value: "all", label: "All levels" },
  { value: "0_3", label: "0-3 years" },
  { value: "4_6", label: "4-6 years" },
  { value: "7_plus", label: "7+ years" },
] as const;

const initialFilters: TalentFilters = {
  search: "React TypeScript GraphQL",
  skills: ["React"],
  role: "all",
  experience: "all",
  availability: "all",
  locations: [],
  technologyStack: [],
  projectAssignment: "all",
};

const ringStroke = 2 * Math.PI * 16;

const TalentSearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading } = useEmployees();
  const [filters, setFilters] = useState<TalentFilters>(initialFilters);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [compare, setCompare] = useState<string[]>([]);
  const [shortlist, setShortlist] = useState<string[]>([]);

  const debouncedSearch = useDebounce(filters.search);
  const deferredSearch = useDeferredValue(debouncedSearch);

  const filterOptions = useMemo(() => {
    const rows = data ?? [];
    return {
      skills: Array.from(new Set(rows.flatMap((employee) => employee.skills))).sort(),
      roles: Array.from(new Set(rows.map((employee) => employee.role))).sort(),
      locations: Array.from(new Set(rows.map((employee) => employee.location))).sort(),
      technologyStack: Array.from(new Set(rows.flatMap((employee) => employee.technologyStack))).sort(),
    };
  }, [data]);

  const talentMatches = useMemo(
    () => createTalentMatches(data ?? [], deferredSearch),
    [data, deferredSearch],
  );

  const filteredResults = useMemo(() => applyTalentFilters(talentMatches, { ...filters, search: deferredSearch }), [filters, talentMatches, deferredSearch]);

  const compareRows = useMemo<TalentMatch[]>(
    () => compare
      .map((id) => filteredResults.find((row) => row.employee.id === id))
      .filter((row): row is TalentMatch => Boolean(row)),
    [compare, filteredResults],
  );

  const shortlistRows = useMemo<TalentMatch[]>(
    () => shortlist
      .map((id) => filteredResults.find((row) => row.employee.id === id) ?? talentMatches.find((row) => row.employee.id === id))
      .filter((row): row is TalentMatch => Boolean(row)),
    [filteredResults, shortlist, talentMatches],
  );

  const activePills = useMemo(() => {
    const pills = [
      ...filters.skills.map((value) => ({ key: `skill-${value}`, label: value, type: "skills" as const })),
      ...(filters.role !== "all" ? [{ key: `role-${filters.role}`, label: filters.role, type: "role" as const }] : []),
      ...(filters.availability !== "all" ? [{ key: `availability-${filters.availability}`, label: availabilityOptions.find((option) => option.value === filters.availability)?.label ?? "Availability", type: "availability" as const }] : []),
      ...filters.locations.map((value) => ({ key: `location-${value}`, label: value, type: "locations" as const })),
      ...filters.technologyStack.map((value) => ({ key: `stack-${value}`, label: value, type: "technologyStack" as const })),
      ...(filters.projectAssignment !== "all" ? [{ key: `assignment-${filters.projectAssignment}`, label: assignmentOptions.find((option) => option.value === filters.projectAssignment)?.label ?? "Assignment", type: "projectAssignment" as const }] : []),
    ];
    return pills;
  }, [filters]);

  const updateArrayFilter = (key: "skills" | "locations" | "technologyStack", value: string) => {
    setFilters((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((entry) => entry !== value)
        : [...current[key], value],
    }));
  };

  const clearFilters = () => {
    setFilters((current) => ({ ...initialFilters, search: current.search }));
    setCompare([]);
  };

  const toggleFromCompare = (id: string) => {
    setCompare((current) => {
      if (current.includes(id)) return current.filter((entry) => entry !== id);
      if (current.length >= 3) return current;
      return [...current, id];
    });
  };

  const toggleShortlist = (id: string) => {
    setShortlist((current) => current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]);
  };

  return (
    <AnimatedPage className="space-y-4">
      <AnimatedCard className="p-3">
        <div className="flex flex-wrap items-center gap-2">
          {topTabs.map((tab) => (
            <button
              key={tab.path}
              type="button"
              onClick={() => navigate(tab.path)}
              className={cn(
                "rounded-xl border px-4 py-2 text-sm transition",
                location.pathname === tab.path
                  ? "border-[hsl(var(--primary)/0.45)] bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--foreground))]"
                  : "border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]",
              )}
            >
              {tab.label}
            </button>
          ))}
          <span className="ml-auto rounded-lg border border-[hsl(var(--border))] px-3 py-1 text-xs text-[hsl(var(--muted-foreground))]">
            {filteredResults.length} results
          </span>
        </div>
      </AnimatedCard>

      <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)_290px]">
        <aside className="space-y-3">
          <AnimatedCard className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Filters</p>
              <button className="rounded-lg border border-[hsl(var(--border))] p-1 lg:hidden" onClick={() => setShowFilters((current) => !current)}>
                <SlidersHorizontal className="size-4" />
              </button>
            </div>

            <div className={cn("space-y-5", showFilters ? "block" : "hidden lg:block")}>
              <section>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Skills</p>
                  <button onClick={clearFilters} className="text-xs text-[hsl(var(--primary))]">Reset</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.skills.slice(0, 10).map((skill) => {
                    const active = filters.skills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => updateArrayFilter("skills", skill)}
                        className={cn("rounded-full border px-2.5 py-1 text-xs transition", active ? "border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.12)]" : "border-[hsl(var(--border))] hover:bg-[hsl(var(--card-hover))]")}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Role</p>
                <select
                  value={filters.role}
                  onChange={(event) => setFilters((current) => ({ ...current, role: event.target.value }))}
                  className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-sm"
                >
                  <option value="all">All roles</option>
                  {filterOptions.roles.map((role) => <option key={role} value={role}>{role}</option>)}
                </select>
              </section>

              <section>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Experience</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  {experienceOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFilters((current) => ({ ...current, experience: option.value }))}
                      className={cn("rounded-xl border px-3 py-2 text-left text-sm transition", filters.experience === option.value ? "border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.12)]" : "border-[hsl(var(--border))] hover:bg-[hsl(var(--card-hover))]")}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Availability</p>
                <fieldset className="space-y-2">
                  {availabilityOptions.map((option) => (
                    <label key={option.value} className={cn("flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2 text-sm transition", filters.availability === option.value ? "border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.1)]" : "border-[hsl(var(--border))] hover:bg-[hsl(var(--card-hover))]")}>
                      <span>{option.label}</span>
                      <input
                        type="radio"
                        name="availability"
                        value={option.value}
                        checked={filters.availability === option.value}
                        onChange={() => setFilters((current) => ({ ...current, availability: option.value }))}
                        className="size-4 accent-[hsl(var(--primary))]"
                      />
                    </label>
                  ))}
                </fieldset>
              </section>

              <section>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Location</p>
                <div className="space-y-2">
                  {filterOptions.locations.map((entry) => (
                    <label key={entry} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={filters.locations.includes(entry)}
                        onChange={() => updateArrayFilter("locations", entry)}
                        className="size-4 rounded border-[hsl(var(--border))] accent-[hsl(var(--primary))]"
                      />
                      <span>{entry}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Technology stack</p>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.technologyStack.map((entry) => {
                    const active = filters.technologyStack.includes(entry);
                    return (
                      <button
                        key={entry}
                        type="button"
                        onClick={() => updateArrayFilter("technologyStack", entry)}
                        className={cn("rounded-full border px-2.5 py-1 text-xs transition", active ? "border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.12)]" : "border-[hsl(var(--border))] hover:bg-[hsl(var(--card-hover))]")}
                      >
                        {entry}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Project assignment</p>
                <select
                  value={filters.projectAssignment}
                  onChange={(event) => setFilters((current) => ({ ...current, projectAssignment: event.target.value as TalentFilters["projectAssignment"] }))}
                  className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-sm"
                >
                  {assignmentOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </section>
            </div>
          </AnimatedCard>
        </aside>

        <section className="space-y-3">
          <AnimatedCard className="p-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[280px] flex-1">
                <Sparkles className="absolute left-3 top-2.5 size-4 text-[hsl(var(--primary))]" />
                <Input
                  value={filters.search}
                  onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
                  placeholder="Search by role, skill, location, or project"
                  className="pl-9"
                />
              </div>
              <Button type="button"><WandSparkles className="mr-1 size-4" /> AI match</Button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {activePills.map((pill) => (
                <span key={pill.key} className="inline-flex items-center gap-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2 py-1 text-xs">
                  {pill.label}
                  <button
                    type="button"
                    onClick={() => {
                      if (pill.type === "skills" || pill.type === "locations" || pill.type === "technologyStack") {
                        updateArrayFilter(pill.type, pill.label);
                        return;
                      }
                      if (pill.type === "role") setFilters((current) => ({ ...current, role: "all" }));
                      if (pill.type === "availability") setFilters((current) => ({ ...current, availability: "all" }));
                      if (pill.type === "projectAssignment") setFilters((current) => ({ ...current, projectAssignment: "all" }));
                    }}
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
          </AnimatedCard>

          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <p>Showing {filteredResults.length} matches ranked by skill fit, experience, performance, and workload.</p>
            <p>{compare.length}/3 selected for compare</p>
          </div>

          {isLoading ? <div className="grid gap-3">{Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} className="h-44" />)}</div> : null}

          {!isLoading && filteredResults.length === 0 ? (
            <AnimatedCard className="p-8 text-center">
              <UserRoundSearch className="mx-auto size-10 text-[hsl(var(--primary))]" />
              <h3 className="mt-4 text-xl font-semibold">No matching talent found</h3>
              <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                Try broadening skills, clearing assignment constraints, or switching availability back to All.
              </p>
              <Button type="button" onClick={clearFilters} className="mt-4">Clear filters</Button>
            </AnimatedCard>
          ) : null}

          <StaggerContainer className="grid gap-3">
            {filteredResults.map((item) => {
              const open = expanded === item.employee.id;
              const inCompare = compare.includes(item.employee.id);
              const inShortlist = shortlist.includes(item.employee.id);

              return (
                <FadeIn key={item.employee.id}>
                  <AnimatedCard className="p-4">
                    <div className="mb-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--primary)/0.06)] p-3 text-xs text-[hsl(var(--muted-foreground))]">
                      AI reason: {item.reasoning[0]} {item.reasoning[2]}
                    </div>

                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <img src={item.employee.avatar} alt={item.employee.name} className="size-12 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card-hover))]" />
                          <div>
                            <h3 className="font-semibold">{item.employee.name}</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.employee.role} · {item.employee.experience} yrs</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
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
                        <button className="rounded-lg border border-[hsl(var(--border))] p-1" onClick={() => setExpanded(open ? null : item.employee.id)}>
                          <ChevronDown className={cn("size-4 transition", open && "rotate-180")} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[hsl(var(--muted-foreground))]">
                      <span className="inline-flex items-center gap-1"><CircleDot className="size-3 text-[hsl(var(--success))]" /> {availabilityLabel(item.employee.availability)}</span>
                      <span className="inline-flex items-center gap-1"><MapPin className="size-3" /> {item.employee.location}</span>
                      <span className="inline-flex items-center gap-1"><BriefcaseBusiness className="size-3" /> {item.employee.currentProjectAllocation}% allocated</span>
                    </div>

                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                          <ul className="mt-3 list-disc pl-5 text-sm text-[hsl(var(--muted-foreground))]">
                            {item.reasoning.map((reason) => <li key={reason}>{reason}</li>)}
                          </ul>
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 text-sm">
                              <p className="font-medium">Current projects</p>
                              <p className="mt-1 text-[hsl(var(--muted-foreground))]">{item.employee.currentProjectAssignments.join(", ") || "Bench"}</p>
                            </div>
                            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 text-sm">
                              <p className="font-medium">Performance snapshot</p>
                              <p className="mt-1 text-[hsl(var(--muted-foreground))]">Performance {item.employee.performanceScore} · Collaboration {item.employee.collaborationScore}</p>
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button type="button" onClick={() => navigate(`/employee/${item.employee.id}`)} className="border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card-hover))]">View profile</Button>
                      <Button type="button" className="border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card-hover))]">Request allocation</Button>
                      <Button type="button" onClick={() => toggleShortlist(item.employee.id)}>{inShortlist ? "Remove from shortlist" : "Shortlist"}</Button>
                      <Button type="button" onClick={() => toggleFromCompare(item.employee.id)} className={cn("border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card-hover))]", inCompare && "border-[hsl(var(--primary))] text-[hsl(var(--primary))]")}>Compare</Button>
                    </div>
                  </AnimatedCard>
                </FadeIn>
              );
            })}
          </StaggerContainer>
        </section>

        <aside className="space-y-3">
          <AnimatedCard className="p-4">
            <h3 className="text-sm font-semibold">Compare ({compareRows.length}/3)</h3>
            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Select up to three employees to compare fit and workload.</p>
            <div className="mt-3 space-y-2">
              {compareRows.length === 0 ? <p className="rounded-xl border border-dashed border-[hsl(var(--border))] p-3 text-xs text-[hsl(var(--muted-foreground))]">No employees selected yet.</p> : null}
              {compareRows.map((person) => (
                <div key={person.employee.id} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 text-sm">
                  <p className="font-medium">{person.employee.name}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{person.matchPercentage}% match · {person.employee.currentProjectAllocation}% allocated</p>
                </div>
              ))}
            </div>
          </AnimatedCard>

          <AnimatedCard className="p-4">
            <h3 className="text-sm font-semibold">Shortlist ({shortlistRows.length})</h3>
            <div className="mt-3 space-y-2">
              {shortlistRows.length === 0 ? <p className="rounded-xl border border-dashed border-[hsl(var(--border))] p-3 text-xs text-[hsl(var(--muted-foreground))]">Save top profiles here for project staffing handoff.</p> : null}
              {shortlistRows.map((row) => (
                <div key={row.employee.id} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 text-sm">
                  <p className="font-medium">{row.employee.name}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{row.employee.role} · {availabilityLabel(row.employee.availability)}</p>
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

