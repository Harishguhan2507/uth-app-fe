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
      localStorage.setItem(
        "uth_user",
        JSON.stringify({
          name: "Jenifar",
          email: "jeni@gmail.com",
          role: "TL",
        }),
      );
      navigate("/dashboard");
      return;
    }
    setError("Invalid credentials. Use jeni@gmail.com / jeni123");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-indigo-600">
          CollabX
        </h1>
        <p className="mt-2 text-center text-sm text-slate-500">
          AI Talent & Resource Matching Platform
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
              required
            />
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600">
          No account?{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
