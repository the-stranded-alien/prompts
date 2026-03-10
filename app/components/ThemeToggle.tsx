"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./Icons";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-8 h-8" />;

  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex items-center justify-center w-8 h-8 rounded-xl border border-[--border]
        hover:border-[--border-hover] transition-all duration-200
        hover:scale-110 active:scale-95"
      style={{ background: "var(--bg-elevated)" }}
    >
      <span
        className="transition-transform duration-500"
        style={{ transform: isDark ? "rotate(0deg)" : "rotate(-90deg)" }}
      >
        {isDark
          ? <SunIcon  className="w-3.5 h-3.5 text-amber-400" />
          : <MoonIcon className="w-3.5 h-3.5 text-indigo-500" />}
      </span>
    </button>
  );
}
