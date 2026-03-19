import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { useDarkMode } from "../hooks/useDarkMode";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const [isDark, setIsDark] = useDarkMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      
      {/* Navbar */}
      <Navbar
        onMenuClick={() => setIsSidebarOpen(true)}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        logout={logout}
      />

      {/* Page Content */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {children}
      </main>

    </div>
  );
};

export default Layout;