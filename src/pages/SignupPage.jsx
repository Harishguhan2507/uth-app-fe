import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", department: "Engineering", role: "TL" });
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess("Account created! Please login.");
    setTimeout(() => navigate("/login"), 1200);
  };

  const inputClass = "w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary)/0.6)] focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]";
  const selectClass = "w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary)/0.6)]";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[hsl(var(--background))] p-4">
      <div className="w-full max-w-lg rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 shadow-[var(--shadow-soft)]">
        <h1 className="text-center text-3xl font-bold text-[hsl(var(--primary))]">CollabX</h1>
        <p className="mt-2 text-center text-sm text-[hsl(var(--muted-foreground))]">Create your intranet account</p>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          {["name", "email", "password"].map((field) => (
            <div key={field}>
              <label className="mb-1 block text-sm font-medium capitalize text-[hsl(var(--foreground))]">{field}</label>
              <input
                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                value={form[field]}
                onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
                className={inputClass}
                required
              />
            </div>
          ))}
          <div>
            <label className="mb-1 block text-sm font-medium text-[hsl(var(--foreground))]">Department</label>
            <select value={form.department} onChange={(e) => setForm((prev) => ({ ...prev, department: e.target.value }))} className={selectClass}>
              <option>Engineering</option>
              <option>Data & Analytics</option>
              <option>Design</option>
              <option>Product</option>
              <option>Operations</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[hsl(var(--foreground))]">Role</label>
            <select value={form.role} onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))} className={selectClass}>
              <option>PM</option>
              <option>Engineer</option>
              <option>Designer</option>
              <option>Analyst</option>
            </select>
          </div>
          {success && <p className="text-sm text-emerald-500">{success}</p>}
          <button type="submit" className="w-full rounded-lg bg-[hsl(var(--primary))] py-2 font-medium text-white transition hover:brightness-110">
            Create account
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[hsl(var(--muted-foreground))]">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-[hsl(var(--primary))] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
