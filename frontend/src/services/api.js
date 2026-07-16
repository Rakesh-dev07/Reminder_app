/**
 * * Frontend can talk to a local backend in development or a deployed backend in production.
 *
 * Priority:
 * 1. VITE_API_BASE_URL if explicitly provided
 * 2. Same-origin requests when the frontend and API are served from the same host
 * 3. Local backend fallback for localhost development
 */
const resolveApiBaseUrl = () => {
  const envBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (envBaseUrl) {
    return envBaseUrl.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    const { hostname, origin } = window.location;

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:3000";
    }

    return origin.replace(/\/$/, "");
  }

  throw new Error("Unable to resolve API base URL");
};

const API_BASE_URL = resolveApiBaseUrl();

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const api = {
  // ---------- AUTH ----------
  register: (email, password) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  login: (email, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  googleLogin: (token) =>
    request("/auth/google", {
      method: "POST",
      body: JSON.stringify({ token }),
    }),

  // ---------- REMINDERS ----------
  getReminders: (authToken) =>
    request("/reminders", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
  getReminderById: (authToken, id) =>
    request(`/reminders/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),

  createReminder: (authToken, body) =>
    request("/reminders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(body),
    }),

  updateReminder: (authToken, id, body) =>
    request(`/reminders/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(body),
    }),

  deleteReminder: (authToken, id) =>
    request(`/reminders/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),

  // ---------- AI ----------
  parseReminder: (authToken, text) =>
    request("/ai/parse", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ text }),
    }),
};
