import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useScrolled } from "../hooks/useEnvironment.js";
import { NAV_IDS } from "./TocIndex.jsx";
import { IconMenu, IconClose, IconSun, IconMoon } from "./Icons.jsx";

function LangSwitch({ t }) {
  const { lang, setLangAnimated } = useLanguage();
  const reduce = useReducedMotion();
  const press = (next) => (e) => {
    if (next === lang) return;
    if (reduce) return setLangAnimated(next);
    setLangAnimated(next, e.currentTarget);
  };
  return (
    <div className="lang" role="group" aria-label={t.a11y.languageLabel}>
      <button
        type="button"
        className="lang__opt"
        aria-pressed={lang === "vi"}
        onClick={press("vi")}
      >
        VI
      </button>
      <span className="lang__sep" aria-hidden="true" />
      <button
        type="button"
        className="lang__opt"
        aria-pressed={lang === "en"}
        onClick={press("en")}
      >
        EN
      </button>
    </div>
  );
}

function ThemeSwitch({ t }) {
  const { resolved, toggle } = useTheme();
  const reduce = useReducedMotion();
  const toLight = resolved === "dark";
  return (
    <button
      type="button"
      className="icon-btn icon-btn--theme"
      onClick={(e) => toggle(reduce ? undefined : e.currentTarget)}
      aria-label={toLight ? t.a11y.toggleThemeToLight : t.a11y.toggleThemeToDark}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={resolved}
          className="icon-btn__icon"
          initial={reduce ? false : { rotate: -70, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={reduce ? undefined : { rotate: 70, scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          {resolved === "dark" ? <IconSun /> : <IconMoon />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Navbar({ t, active, scrolled, onNavigate, menuOpen, setMenuOpen }) {
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const wasOpen = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true;
      const el = panelRef.current;
      if (!el) return;
      const focusables = el.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      focusables[0]?.focus();

      const onKey = (e) => {
        if (e.key === "Escape") {
          setMenuOpen(false);
          return;
        }
        if (e.key !== "Tab") return;
        const list = Array.from(focusables);
        if (list.length === 0) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [menuOpen, setMenuOpen]);

  const go = (id) => {
    setMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <motion.header
        className={"nav" + (scrolled ? " is-scrolled" : "")}
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav__inner container">
          <a
            href="#hero"
            className="nav__brand"
            onClick={(e) => {
              e.preventDefault();
              go("hero");
            }}
          >
            <span className="nav__brand-mark" aria-hidden="true" />
            {t.hero.name}
          </a>

          <nav className="nav__links" aria-label={t.a11y.navLabel}>
            {NAV_IDS.slice(1).map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="nav__link"
                aria-current={active === id ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(id);
                }}
              >
                {t.nav[id]}
              </a>
            ))}
          </nav>

          <div className="nav__tools">
            <LangSwitch t={t} />
            <ThemeSwitch t={t} />
            <button
              ref={triggerRef}
              type="button"
              className="icon-btn nav__toggle-mobile"
              aria-label={t.a11y.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <IconMenu />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-backdrop"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.a11y.navLabel}
            ref={panelRef}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="menu__head">
              <span className="nav__brand">
                <span className="nav__brand-mark" aria-hidden="true" />
                {t.hero.name}
              </span>
              <button
                type="button"
                className="icon-btn"
                aria-label={t.a11y.closeMenu}
                onClick={() => setMenuOpen(false)}
              >
                <IconClose />
              </button>
            </div>
            <nav className="menu__list" aria-label={t.a11y.navLabel}>
              {NAV_IDS.map((id, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  className="menu__link"
                  aria-current={active === id ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    go(id);
                  }}
                  initial={reduce ? false : { opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.04 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  {t.nav[id]}
                  <span className="toc__num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.a>
              ))}
            </nav>
            <div className="menu__foot">
              <LangSwitch t={t} />
              <ThemeSwitch t={t} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}