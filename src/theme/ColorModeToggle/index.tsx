import { useEffect, type ReactNode } from "react";
import { translate } from "@docusaurus/Translate";
import { useColorMode, type ColorMode } from "@docusaurus/theme-common";
import type { Props } from "@theme/ColorModeToggle";
import styles from "./styles.module.css";

const PROJECT_THEME_STORAGE_KEY = "zaidrama-color-theme";

function isColorMode(value: string | null): value is ColorMode {
  return value === "light" || value === "dark";
}

function readProjectTheme(): ColorMode {
  try {
    const storedTheme = localStorage.getItem(PROJECT_THEME_STORAGE_KEY);
    return isColorMode(storedTheme) ? storedTheme : "light";
  } catch {
    return "light";
  }
}

function writeProjectTheme(theme: ColorMode): void {
  try {
    localStorage.setItem(PROJECT_THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable in hardened/private browser contexts.
  }
}

function applyProjectTheme(theme: ColorMode): void {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
}

function getSwitchLabel(theme: ColorMode): string {
  return theme === "light"
    ? translate({
        id: "theme.projectColorToggle.switchToDark",
        message: "切换到深色主题",
        description: "The label for switching the site to the dark theme",
      })
    : translate({
        id: "theme.projectColorToggle.switchToLight",
        message: "切换到浅色主题",
        description: "The label for switching the site to the light theme",
      });
}

function ThemeIcon({ theme }: { theme: ColorMode }): ReactNode {
  if (theme === "light") {
    return (
      <svg aria-hidden="true" className={styles.icon} fill="none" focusable="false" viewBox="0 0 24 24">
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={styles.icon} fill="none" focusable="false" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function ColorModeToggle({ className, buttonClassName, onChange }: Props): ReactNode {
  const { colorMode } = useColorMode();
  const theme = colorMode;
  const label = getSwitchLabel(theme);

  useEffect(() => {
    const storedTheme = readProjectTheme();
    applyProjectTheme(storedTheme);
    if (storedTheme !== theme) {
      onChange(storedTheme);
    }
  }, [onChange, theme]);

  useEffect(() => {
    applyProjectTheme(theme);
  }, [theme]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      const nextTheme = isColorMode(event.newValue) ? event.newValue : "light";
      if (event.key !== PROJECT_THEME_STORAGE_KEY) return;
      applyProjectTheme(nextTheme);
      onChange(nextTheme);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [onChange]);

  const toggleTheme = () => {
    const nextTheme: ColorMode = theme === "light" ? "dark" : "light";
    writeProjectTheme(nextTheme);
    applyProjectTheme(nextTheme);
    onChange(nextTheme);
  };

  return (
    <button
      aria-label={label}
      className={[styles.button, className, buttonClassName].filter(Boolean).join(" ")}
      onClick={toggleTheme}
      title={label}
      type="button"
    >
      <ThemeIcon theme={theme} />
    </button>
  );
}
