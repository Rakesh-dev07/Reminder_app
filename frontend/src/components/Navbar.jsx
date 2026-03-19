import React from "react";
import { FiMenu } from "react-icons/fi";

const Navbar = ({ onMenuClick, isDark, setIsDark }) => {
  const darkToggleLabel = isDark ? "Light" : "Dark";

  return (
    <header className="border-b border-slate-200 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        
        {/* Left */}
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Reminder App
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Stay on top of things — with notifications.
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          
          {/* Dark Mode */}
          <button
            onClick={() => setIsDark((v) => !v)}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <span className="text-lg">
              {isDark ? "🌙" : "☀️"}
            </span>
            <span>{darkToggleLabel} mode</span>
          </button>

          {/* Hamburger */}
          <button
            onClick={onMenuClick}
            className="text-2xl p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <FiMenu />
          </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;