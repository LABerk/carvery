import { THEME_STORAGE_KEY } from "@/features/theme/domain/theme";

const themeScript = `
(function () {
  try {
    var key = "${THEME_STORAGE_KEY}";
    var stored = localStorage.getItem(key);
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored === "dark" || stored === "light" ? stored : prefersDark ? "dark" : "light";
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export const ThemeScript = () => (
  <script dangerouslySetInnerHTML={{ __html: themeScript }} />
);
