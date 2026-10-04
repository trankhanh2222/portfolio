import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { content } from "../data/content.js";
import { runViewTransition } from "../lib/viewTransition.js";

const STORAGE_KEY = "portfolio.lang";
const SUPPORTED = ["vi", "en"];

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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Bo qua: khong the luu, trang van hoat dong.
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      setLangAnimated: (next, originEl) =>
        runViewTransition(originEl, () => setLang(next), { reverse: true }),
      toggle: () => setLang((l) => (l === "vi" ? "en" : "vi")),
      t: content[lang],
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}