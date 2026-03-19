import { useEffect, useState } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true; // default dark

    const stored = localStorage.getItem("reminder-dark-mode");

    // If user previously selected mode, use it
    if (stored !== null) return stored === "true";

    // Otherwise ALWAYS default to dark
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("reminder-dark-mode", String(isDark));
  }, [isDark]);

  return [isDark, setIsDark];
}