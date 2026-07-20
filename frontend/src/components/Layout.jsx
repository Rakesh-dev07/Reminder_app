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
     <div className="app-page">
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

      <Footer />
    </div>
  );
};

export default Layout;
