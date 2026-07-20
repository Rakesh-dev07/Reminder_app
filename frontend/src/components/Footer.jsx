import React from "react";

const Footer = () => {
  return (
    <footer className="app-footer">
      
      <div className="app-text-muted mx-auto max-w-6xl px-4 py-4 text-center text-xs">
        
        <p>
          Built by <span className="font-semibold text-app-primary">Rakesh</span>
        </p>

        <p className="mt-1">
          © {new Date().getFullYear()} Reminder App. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;