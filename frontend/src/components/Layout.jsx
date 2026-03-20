import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { useDarkMode } from "../hooks/useDarkMode";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const [isDark, setIsDark] = useDarkMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
     <div
      className="min-h-screen flex flex-col
      bg-gradient-to-br from-slate-50 via-white to-slate-100
      dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
      text-slate-900 dark:text-slate-100"
    >
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

      {/* MAIN (IMPORTANT) */}
      <main className="flex-1 w-full">
        <div className="mx-auto max-w-6xl px-4 py-6 w-full">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
