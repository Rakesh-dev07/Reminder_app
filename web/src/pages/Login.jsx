import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Setup Google button
  useEffect(() => {
    if (!window.google || !GOOGLE_CLIENT_ID) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response) => {
        try {
          const data = await api.googleLogin(response.credential);
          await login(data);
          navigate("/");
        } catch (err) {
          console.error(err);
          setError(err.message || "Google login failed");
        }
      },
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large" }
    );
  }, [login, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let data;
      if (mode === "login") {
        data = await api.login(email, password);
      } else {
        data = await api.register(email, password);
      }

      await login(data);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
      <div className="w-full max-w-md bg-slate-800/80 rounded-2xl shadow-xl p-8 border border-slate-700">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Reminder App
        </h1>

        <div className="flex justify-center mb-6">
          <button
            type="button"
            className={`px-4 py-2 rounded-l-full border ${
              mode === "login"
                ? "bg-sky-500 text-white border-sky-500"
                : "bg-slate-800 text-slate-300 border-slate-600"
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-r-full border-l-0 border ${
              mode === "register"
                ? "bg-sky-500 text-white border-sky-500"
                : "bg-slate-800 text-slate-300 border-slate-600"
            }`}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-700 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-sky-500 hover:bg-sky-600 transition font-medium"
          >
            {mode === "login" ? "Login" : "Create account"}
          </button>
        </form>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-slate-600" />
          <span className="text-xs text-slate-400">or</span>
          <div className="flex-1 h-px bg-slate-600" />
        </div>

        <div id="googleSignInDiv" className="flex justify-center" />

        <p className="text-xs text-slate-500 text-center mt-4">
          By continuing you agree to our reminder app terms.
        </p>
      </div>
    </div>
  );
}
