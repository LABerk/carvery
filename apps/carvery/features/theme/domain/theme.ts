export const THEME_STORAGE_KEY = "carvery-theme";

export type Theme = "light" | "dark";

export const applyTheme = (theme: Theme): void => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

export const readStoredTheme = (): Theme | null => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
};

export const getSystemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const getInitialTheme = (): Theme => readStoredTheme() ?? getSystemTheme();
