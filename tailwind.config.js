/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        paragraph: "rgba(var(--paragraph))",
        accent: "rgba(var(--accent))",
        secondary: "rgba(var(--secondary))",
        shadow: "rgba(var(--shadow))",
      },
      fontFamily: {
        jersey15: ["Jersey 15", "serif"],
        jersey10: ["Jersey 10", "serif"],
      },
      boxShadow: {
        shadow: "var(--shadow)",
      },
      dropShadow: {
        shadow: "var(--shadow)",
      },
    },
  },
  plugins: [],
};
