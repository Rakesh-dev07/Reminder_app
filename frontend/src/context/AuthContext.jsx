import React, { createContext, useContext, useEffect, useState } from "react";
import { registerForNotifications, subscribeToForegroundMessages } from "../notifications";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // { email, username, userId }
  const [token, setToken] = useState(null); // JWT
  const [loading, setLoading] = useState(true);

  // Load from localStorage on first load
  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed.user);
      setToken(parsed.token);
      // subscribe to foreground messages
      subscribeToForegroundMessages();
    }
    setLoading(false);
  }, []);

  const login = async (data) => {
    // data: { token, email, username, userId }
    setUser({
      email: data.email,
      username: data.username,
      userId: data.userId,
    });
    setToken(data.token);

    localStorage.setItem(
      "auth",
      JSON.stringify({
        user: {
          email: data.email,
          username: data.username,
          userId: data.userId,
        },
        token: data.token,
      })
    );

    // register for push notifications
    await registerForNotifications(data.token);
    subscribeToForegroundMessages();
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
