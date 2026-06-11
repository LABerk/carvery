"use client";

import { useEffect, useState } from "react";
import {
  applyTheme,
  getInitialTheme,
  type Theme,
} from "@/features/theme/domain/theme";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  const onToggle = (): void => {
    const next: Theme = theme === "light" ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={!mounted}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-subtle hover:bg-muted hover:text-foreground transition-colors disabled:opacity-60"
    >
      <span>{theme === "light" ? "🌙" : "☀️"}</span>
      <span>{mounted ? (theme === "light" ? "Dark mode" : "Light mode") : "Theme"}</span>
    </button>
  );
};
