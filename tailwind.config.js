/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
          DEFAULT: "#2563eb",
          light: "#dbeafe",
          dark: "#1d4ed8"
        },
        "background": {
          DEFAULT: "#f8fafc",
          dark: "#0f172a"
        },
        "card": {
          DEFAULT: "#ffffff",
          dark: "#1e293b"
        },
        "text-primary": "#1e293b",
        "text-secondary": "#64748b",
        "border-color": "#e2e8f0"
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"]
      }
    },
  },
};


