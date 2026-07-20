/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  darkMode: "class",

  theme: {
  extend: {
    colors: {
      app: {
        bg: {
          light: "#F7F4EF",
          dark: "#0F172A",
        },

        card: {
          light: "#FFFFFF",
          dark: "#111827",
        },

        input: {
          light: "#F8FAFC",
          dark: "#1E293B",
        },

        border: {
          light: "#E5E7EB",
          dark: "#334155",
        },

        text: {
          primary: {
            light: "#0F172A",
            dark: "#FFFFFF",
          },

          secondary: {
            light: "#64748B",
            dark: "#94A3B8",
          },
        },

        primary: "#4F46E5",
      },
    },

    borderRadius: {
      card: "18px",
      input: "12px",
      button: "12px",
    },

    boxShadow: {
      card: "0 6px 18px rgba(15,23,42,.06)",
      floating: "0 -8px 20px rgba(0,0,0,.12)",
    },
  },
},

  plugins: [],
};