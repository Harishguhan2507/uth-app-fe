import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    department: 'Engineering',
    role: 'TL',
  });
  const [success, setSuccess] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess('Account created! Please login.');
    setTimeout(() => navigate('/login'), 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-indigo-600">UTH-Match</h1>
        <p className="mt-2 text-center text-sm text-slate-500">Create your intranet account</p>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          {['name', 'email', 'password'].map((field) => (
            <div key={field}>
              <label className="mb-1 block text-sm font-medium capitalize text-slate-700">{field}</label>
              <input
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                value={form[field]}
                onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
                required
              />
            </div>
          ))}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Department</label>
            <select
              value={form.department}
              onChange={(e) => setForm((prev) => ({ ...prev, department: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            >
              <option>Engineering</option>
              <option>Data & Analytics</option>
              <option>Design</option>
              <option>Product</option>
              <option>Operations</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            >
              <option>PM</option>
              <option>Engineer</option>
              <option>Designer</option>
              <option>Analyst</option>
            </select>
          </div>

          {success ? <p className="text-sm text-green-600">{success}</p> : null}
          <button type="submit" className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700">
            Create account
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
