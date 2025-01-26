import { useState, useEffect } from "react";

// This code came from some website I can't find right now
function ThemeToggle() {
  const [currentTheme, setTheme] = useState(getInitialTheme());

  function getInitialTheme(): string {
    let userTheme: string | null = null;
    let systemTheme: boolean = true;
    if (typeof window !== "undefined" && window.localStorage) {
      userTheme = localStorage.getItem("theme");
      systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return userTheme || (systemTheme ? "dark" : "light");
  }

  function applyTheme() {
    if (currentTheme === "dark") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }

  // WARNING: This will apply dark mode if the user has that set (I think)

  applyTheme();
}
export default ThemeToggle;
