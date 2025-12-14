const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

async function request(path, options = {}) {
  // Merge headers correctly so Content-Type is never lost
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
  // auth
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

  // reminders
  getReminders: (authToken) =>
    request("/reminders", {
      headers: { Authorization: `Bearer ${authToken}` },
    }),

  createReminder: (authToken, body) =>
    request("/reminders", {
      method: "POST",
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify(body),
    }),

  updateReminder: (authToken, id, body) =>
    request(`/reminders/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify(body),
    }),

  deleteReminder: (authToken, id) =>
    request(`/reminders/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${authToken}` },
    }),
};
