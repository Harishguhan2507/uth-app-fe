import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { employees } from '../data/employees';

function Directory() {
  const [term, setTerm] = useState('');

  const filtered = useMemo(() => {
    const query = term.toLowerCase();
    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query) ||
        employee.skills.join(' ').toLowerCase().includes(query)
    );
  }, [term]);

  return (
    <div>
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search by name or skill"
        className="w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm"
      />

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Employee</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Skills</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((employee) => (
              <tr key={employee.id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                      {employee.initials}
                    </span>
                    <span className="font-medium text-slate-900">{employee.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{employee.department}</td>
                <td className="px-4 py-3 text-slate-600">{employee.skills.join(', ')}</td>
                <td className="px-4 py-3 text-slate-600">{employee.availability}</td>
                <td className="px-4 py-3">
                  <Link
                    to={`/profile/${employee.id}`}
                    className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    View profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Directory;
