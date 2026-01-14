"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="
        rounded-full p-2
        bg-white/70 dark:bg-slate-800/70
        backdrop-blur
        transition
        hover:scale-105
      "
    >
      <span
        className={`
          inline-block
          text-lg
          transition-transform duration-300
          ${theme === "dark" ? "rotate-180" : "rotate-0"}
        `}
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
