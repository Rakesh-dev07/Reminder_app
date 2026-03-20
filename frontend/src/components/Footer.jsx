import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white/60 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60">
      
      <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-slate-500 dark:text-slate-400">
        
        <p>
          Built by <span className="font-semibold text-indigo-500">Rakesh</span>
        </p>

        <p className="mt-1">
          © {new Date().getFullYear()} Reminder App. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;