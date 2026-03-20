import React from "react";
import { FiMenu } from "react-icons/fi";

const Navbar = ({ onMenuClick, isDark, setIsDark }) => {
  const darkToggleLabel = isDark ? "Light" : "Dark";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/60">
      
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

        {/* LEFT */}
        <div className="flex flex-col">
          
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Reminder App
          </h1>

          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            Stay organized. Stay productive.
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDark((v) => !v)}
            className="flex items-center gap-1 sm:gap-2 rounded-full border border-slate-200 bg-slate-100 px-2 sm:px-3 py-1.5 text-xs font-medium shadow-sm transition-all hover:scale-105 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
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
            className="rounded-lg p-2 text-xl transition-all hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
          >
            <FiMenu />
          </button>

        </div>

      </div>
    </header>
  );
};

export default Navbar;