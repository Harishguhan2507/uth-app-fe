import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const VALID_EMAIL = "jeni@gmail.com";
const VALID_PASSWORD = "jeni123";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      localStorage.setItem("uth_user", JSON.stringify({ name: "Jenifar", email: "jeni@gmail.com", role: "TL" }));
      navigate("/dashboard");
      return;
    }
    setError("Invalid credentials. Use jeni@gmail.com / jeni123");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[hsl(var(--background))] p-4">
      <div className="w-full max-w-md rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 shadow-[var(--shadow-soft)]">
        <h1 className="text-center text-3xl font-bold text-[hsl(var(--primary))]">CollabX</h1>
        <p className="mt-2 text-center text-sm text-[hsl(var(--muted-foreground))]">AI Talent & Resource Matching Platform</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[hsl(var(--foreground))]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary)/0.6)] focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[hsl(var(--foreground))]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary)/0.6)] focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]"
              required
            />
          </div>
          {error && <p className="text-sm text-[hsl(var(--destructive))]">{error}</p>}
          <button type="submit" className="w-full rounded-lg bg-[hsl(var(--primary))] py-2 font-medium text-white transition hover:brightness-110">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[hsl(var(--muted-foreground))]">
          No account?{" "}
          <Link to="/signup" className="font-medium text-[hsl(var(--primary))] hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
