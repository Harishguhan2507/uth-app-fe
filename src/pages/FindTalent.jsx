import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import { employees } from '../data/employees';

const skillOptions = ['React', 'Python', 'ML', 'SQL', 'Node.js', 'Power BI', 'Azure', 'UX'];
const deptOptions = ['Engineering', 'Data & Analytics', 'Design', 'Product', 'Operations'];
const ignoredQueryTerms = new Set(['with', 'and', 'or', 'experience', 'developer', 'developers']);
const queryAliases = {
  dev: ['engineer'],
  frontend: ['frontend', 'react'],
  backend: ['backend', 'node.js'],
  fullstack: ['full-stack', 'react', 'node.js'],
  'full-stack': ['full-stack', 'react', 'node.js'],
  ml: ['ml', 'machine', 'learning'],
};

function FindTalent() {
  const [query, setQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [availability, setAvailability] = useState('all');
  const [level, setLevel] = useState('All');
  const [showReason, setShowReason] = useState(false);

  const filtered = useMemo(() => {
    return employees.filter((employee) => {
      const searchable = `${employee.name} ${employee.role} ${employee.skills.join(' ')}`.toLowerCase();
      const queryTerms = query.toLowerCase().trim().split(/\s+/).filter(Boolean).filter((t) => !ignoredQueryTerms.has(t));
      const matchesQuery = queryTerms.length === 0 || queryTerms.every((term) => {
        const aliases = queryAliases[term] || [term];
        return aliases.some((alias) => searchable.includes(alias));
      });
      const skillOk = selectedSkills.length === 0 || selectedSkills.every((s) => employee.skills.includes(s));
      const deptOk = selectedDepartments.length === 0 || selectedDepartments.includes(employee.department);
      const availOk = availability === 'all' || (availability === 'available' && employee.availability === 'Available now') || (availability === 'part-time' && employee.availability === 'Part-time');
      const expOk = level === 'All' || (level === 'Junior' && employee.experience <= 2) || (level === 'Mid' && employee.experience >= 3 && employee.experience <= 5) || (level === 'Senior' && employee.experience >= 6);
      return matchesQuery && skillOk && deptOk && availOk && expOk;
    });
  }, [availability, level, query, selectedDepartments, selectedSkills]);

  const toggleValue = (value, list, setList) => {
    setList(list.includes(value) ? list.filter((i) => i !== value) : [...list, value]);
  };

  const clearFilters = () => {
    setQuery(''); setSelectedSkills([]); setSelectedDepartments([]); setAvailability('all'); setLevel('All');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-[hsl(var(--foreground))]">Find Talent</h2>
      <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
        Showing {filtered.length} matches · sorted by relevance
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-[200px_1fr]">
        {/* Sidebar filters */}
        <aside className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-[var(--shadow-soft)]">
          <div>
            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Skills</p>
            <div className="mt-2 space-y-1.5">
              {skillOptions.map((skill) => (
                <label key={skill} className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                  <input type="checkbox" checked={selectedSkills.includes(skill)} onChange={() => toggleValue(skill, selectedSkills, setSelectedSkills)} className="accent-[hsl(var(--primary))]" />
                  {skill}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Department</p>
            <div className="mt-2 space-y-1.5">
              {deptOptions.map((dept) => (
                <label key={dept} className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                  <input type="checkbox" checked={selectedDepartments.includes(dept)} onChange={() => toggleValue(dept, selectedDepartments, setSelectedDepartments)} className="accent-[hsl(var(--primary))]" />
                  {dept}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Availability</p>
            <div className="mt-2 space-y-2">
              {[['all', 'All'], ['available', 'Available now'], ['part-time', 'Part-time only']].map(([val, label]) => (
                <label key={val} className="flex items-center justify-between text-sm text-[hsl(var(--muted-foreground))]">
                  {label}
                  <input type="radio" name="availability" value={val} checked={availability === val} onChange={() => setAvailability(val)} className="accent-[hsl(var(--primary))]" />
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-[hsl(var(--foreground))]">Experience</p>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2.5 py-2 text-sm text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary)/0.6)]"
            >
              <option>All</option>
              <option>Junior</option>
              <option>Mid</option>
              <option>Senior</option>
            </select>
          </div>

          <button onClick={clearFilters} className="mt-4 text-sm font-medium text-[hsl(var(--primary))] hover:brightness-110">
            Clear filters
          </button>
        </aside>

        <section>
          <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-2">
              <Search size={16} className="text-[hsl(var(--muted-foreground))]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. React developer with ML experience"
                className="flex-1 bg-transparent text-sm text-[hsl(var(--foreground))] outline-none placeholder:text-[hsl(var(--muted-foreground))]"
              />
              <button
                onClick={() => setShowReason(true)}
                className="rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-white transition hover:brightness-110"
              >
                AI Match ↗
              </button>
            </div>
          </div>

          {showReason && (
            <div className="mt-3 rounded-xl border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] p-3 text-sm text-[hsl(var(--foreground))]">
              <span className="font-semibold">AI reason:</span> Strong React + Python combo with 2 previous ML dashboard projects. Currently available full-time.
            </div>
          )}

          <div className="mt-4 space-y-3">
            {filtered.length > 0 ? (
              filtered.map((employee) => <EmployeeCard key={employee.id} employee={employee} />)
            ) : (
              <div className="rounded-xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-sm text-[hsl(var(--muted-foreground))]">
                No matches found. Try clearing filters or using broader search terms like React, ML, or Python.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default FindTalent;
