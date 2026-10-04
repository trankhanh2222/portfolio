import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { runViewTransition } from "../lib/viewTransition.js";

const STORAGE_KEY = "portfolio.theme";
const SUPPORTED = ["light", "dark", "system"];

const ThemeContext = createContext(null);

function readStoredTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
  } catch {
    // localStorage khong dung duoc; theo he thong.
  }
  return "system";
}

function resolve(theme) {
  if (theme !== "system") return theme;
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readStoredTheme);
  const [resolved, setResolved] = useState(() => resolve(readStoredTheme()));

  useEffect(() => {
    const next = resolve(theme);
    setResolved(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Bo qua.
    }
  }, [theme]);

  useEffect(() => {
    if (theme !== "system" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setResolved(mq.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      resolved,
      setTheme,
      toggle: (originEl) => {
        const next = resolved === "dark" ? "light" : "dark";
        runViewTransition(originEl, () => {
          // Dat thuoc tinh ngay de snapshot cua View Transition bat dung theme moi.
          document.documentElement.setAttribute("data-theme", next);
          setTheme(next);
        });
      },
    }),
    [theme, resolved]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}