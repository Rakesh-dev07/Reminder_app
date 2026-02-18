/**
 * REQUIRED ENV VARIABLE
 * Must be defined in Vercel Environment Variables
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fail fast if misconfigured (this is GOOD practice)
if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

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
};
