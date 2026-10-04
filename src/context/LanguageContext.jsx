import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { content } from "../data/content.js";

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
  const [wiping, setWiping] = useState(false);
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

  const endWipe = useCallback(() => setWiping(false), []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      wiping,
      endWipe,
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
        setWiping(true);
        timer.current = setTimeout(() => setLang(next), SWITCH_AT);
      },
      toggle: () => setLang((l) => (l === "vi" ? "en" : "vi")),
      t: content[lang],
    }),
    [lang, wiping, endWipe]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}