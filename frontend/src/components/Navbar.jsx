import React from "react";
import { FiMenu } from "react-icons/fi";

const Navbar = ({ onMenuClick, isDark, setIsDark }) => {
  const darkToggleLabel = isDark ? "Light" : "Dark";

  return (
    <header className="app-header">
      
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

        {/* LEFT */}
        <div className="flex flex-col">
          
          <h1 className="app-brand text-xl sm:text-2xl font-bold tracking-tight">
            Reminder App
          </h1>

          <p className="app-text-muted text-[11px] sm:text-xs">
            Stay organized. Stay productive.
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDark((v) => !v)}
            className="app-theme-toggle"
          >
            <span className="text-base">
              {isDark ? "🌙" : "☀️"}
            </span>
            <span className="hidden sm:inline">
              {darkToggleLabel}
            </span>
          </button>

          {/* Hamburger */}
          <button
            onClick={onMenuClick}
            className="app-menu-btn"
          >
            <FiMenu />
          </button>

        </div>

      </div>
    </header>
  );
};

export default Navbar;