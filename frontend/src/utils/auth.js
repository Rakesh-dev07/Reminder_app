/**
 * ============================================================
 * Authentication Helpers
 * ============================================================
 */

export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem("auth")) || {};
  } catch {
    return {};
  }
}

export function getToken() {
  return getAuth().token || null;
}

export function getUser() {
  return getAuth().user || null;
}

export function isAuthenticated() {
  return !!getToken();
}

export function clearAuth() {
  localStorage.removeItem("auth");
}