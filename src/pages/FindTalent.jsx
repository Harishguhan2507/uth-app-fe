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
  const [availableNow, setAvailableNow] = useState(false);
  const [partTimeOnly, setPartTimeOnly] = useState(false);
  const [level, setLevel] = useState('All');
  const [showReason, setShowReason] = useState(false);

  const filtered = useMemo(() => {
    return employees.filter((employee) => {
      const searchable = `${employee.name} ${employee.role} ${employee.skills.join(' ')}`.toLowerCase();
      const queryTerms = query
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .filter((term) => !ignoredQueryTerms.has(term));
      const matchesQuery =
        queryTerms.length === 0 ||
        queryTerms.every((term) => {
          const aliases = queryAliases[term] || [term];
          return aliases.some((alias) => searchable.includes(alias));
        });
      const skillOk =
        selectedSkills.length === 0 || selectedSkills.some((skill) => employee.skills.includes(skill));
      const deptOk =
        selectedDepartments.length === 0 || selectedDepartments.includes(employee.department);
      const availOk =
        (!availableNow && !partTimeOnly) ||
        (availableNow && employee.availability === 'Available now') ||
        (partTimeOnly && employee.availability === 'Part-time');
      const expOk =
        level === 'All' ||
        (level === 'Junior' && employee.experience <= 2) ||
        (level === 'Mid' && employee.experience >= 3 && employee.experience <= 5) ||
        (level === 'Senior' && employee.experience >= 6);
      return matchesQuery && skillOk && deptOk && availOk && expOk;
    });
  }, [availableNow, level, partTimeOnly, query, selectedDepartments, selectedSkills]);

  const toggleValue = (value, list, setList) => {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedSkills([]);
    setSelectedDepartments([]);
    setAvailableNow(false);
    setPartTimeOnly(false);
    setLevel('All');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">Find Talent</h2>
      <p className="mt-1 text-sm text-slate-500">Showing {filtered.length} matches · sorted by relevance</p>

      <div className="mt-5 grid gap-4 lg:grid-cols-[200px_1fr]">
        <aside className="rounded-xl border border-slate-200 bg-white p-4">
          <div>
            <p className="text-sm font-semibold text-slate-800">Skills</p>
            <div className="mt-2 space-y-1.5">
              {skillOptions.map((skill) => (
                <label key={skill} className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={selectedSkills.includes(skill)}
                    onChange={() => toggleValue(skill, selectedSkills, setSelectedSkills)}
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold text-slate-800">Department</p>
            <div className="mt-2 space-y-1.5">
              {deptOptions.map((dept) => (
                <label key={dept} className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(dept)}
                    onChange={() => toggleValue(dept, selectedDepartments, setSelectedDepartments)}
                  />
                  {dept}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold text-slate-800">Availability</p>
            <div className="mt-2 space-y-2">
              <label className="flex items-center justify-between text-sm text-slate-600">
                Available now
                <input type="checkbox" checked={availableNow} onChange={(e) => setAvailableNow(e.target.checked)} />
              </label>
              <label className="flex items-center justify-between text-sm text-slate-600">
                Part-time only
                <input type="checkbox" checked={partTimeOnly} onChange={(e) => setPartTimeOnly(e.target.checked)} />
              </label>
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-slate-800">Experience</p>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-sm"
            >
              <option>All</option>
              <option>Junior</option>
              <option>Mid</option>
              <option>Senior</option>
            </select>
          </div>

          <button onClick={clearFilters} className="mt-4 text-sm font-medium text-indigo-500 hover:text-indigo-600">
            Clear filters
          </button>
        </aside>

        <section>
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2">
              <Search size={16} className="text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. React developer with ML experience"
                className="flex-1 text-sm outline-none placeholder:text-slate-400"
              />
              <button
                onClick={() => setShowReason(true)}
                className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600"
              >
                AI Match ↗
              </button>
            </div>
          </div>

          {showReason ? (
            <div className="mt-3 rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-900">
              <span className="font-semibold">AI reason:</span> Strong React + Python combo with 2 previous ML
              dashboard projects. Currently available full-time.
            </div>
          ) : null}

          <div className="mt-4 space-y-3">
            {filtered.length > 0 ? (
              filtered.map((employee) => <EmployeeCard key={employee.id} employee={employee} />)
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
                No matches found. Try clearing filters or using broader search terms like `React`, `ML`, or
                `Python`.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default FindTalent;
