import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const googleButtonRef = useRef(null);
  const googleInitializedRef = useRef(false);

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

  // Setup Google button once
  useEffect(() => {
   if (!window.google || !GOOGLE_CLIENT_ID || !googleButtonRef.current) {
      return;
    }

    if (!googleInitializedRef.current) {
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

      googleInitializedRef.current = true;
    }

    googleButtonRef.current.innerHTML = "";
    window.google.accounts.id.renderButton(googleButtonRef.current, {
      theme: "outline",
      size: "large",
    });
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
    <div className="app-auth-page">
      <div className="app-auth-card">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Reminder App
        </h1>

        <div className="flex justify-center mb-6">
          <button
            type="button"
            className={`app-auth-tab rounded-l-full ${
              mode === "login" ? "app-auth-tab-active" : ""
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={`app-auth-tab rounded-r-full border-l-0 ${
              mode === "register" ? "app-auth-tab-active" : ""
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
            <label className="app-label mb-1 block text-sm">Email</label>
            <input
              type="email"
              className="app-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="app-label mb-1 block text-sm">Password</label>
            <input
              type="password"
              className="app-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
            />
          </div>

          <button
            type="submit"
            className="btn-primary-lg w-full py-2"
          >
            {mode === "login" ? "Login" : "Create account"}
          </button>
        </form>

        <div className="flex items-center gap-2 mb-4">
          <div className="app-auth-divider" />
          <span className="app-text-muted text-xs">or</span>
          <div className="app-auth-divider" />
        </div>

        <div ref={googleButtonRef} className="flex justify-center" />

        <p className="app-text-muted mt-4 text-center text-xs">
          By continuing you agree to our reminder app terms.
        </p>
      </div>
    </div>
  );
}
