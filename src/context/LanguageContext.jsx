import { createContext, useContext, useEffect, useMemo, useRef, useState, startTransition } from "react";
import { content } from "../data/content.js";
import { useWipe } from "./WipeContext.jsx";

const STORAGE_KEY = "portfolio.lang";
const SUPPORTED = ["vi", "en"];

// Cutscene doi ngon ngu: doi o giua pha giu cua cac dai (khoang 415-648ms),
// sau khi ca ba dai da phu kin. Thoi gian khop keyframes lang-wipe-col trong base.css.
const SWITCH_AT = 450;

const LanguageContext = createContext(null);

function readStoredLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
  } catch {
    // localStorage co the bi chan hoac hong; dung mac dinh.
  }
  return "vi";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLang);
  const { startWipe } = useWipe();
  const timer = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Bo qua: khong the luu, trang van hoat dong.
    }
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      // Doi ngon ngu bang cutscene ngan: bat overlay, doi o dinh pha giu.
      // Reduced motion thi doi tuc thi, khong overlay.
      setLangAnimated: (next) => {
        const reduce =
          typeof window.matchMedia === "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce || !next || next === lang) {
          setLang(next);
          return;
        }
        clearTimeout(timer.current);
        startWipe();
        // Non-urgent: de main thread uu tien animation thay vi re-render.
        timer.current = setTimeout(() => startTransition(() => setLang(next)), SWITCH_AT);
      },
      toggle: () => setLang((l) => (l === "vi" ? "en" : "vi")),
      t: content[lang],
    }),
    [lang, startWipe]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}