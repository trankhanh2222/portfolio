import { lazy, Suspense, useCallback, useState } from "react";
import { useLanguage } from "./context/LanguageContext.jsx";
import { useTheme } from "./context/ThemeContext.jsx";
import { useActiveSection } from "./hooks/useActiveSection.js";
import { useScrolled } from "./hooks/useEnvironment.js";
import { Navbar } from "./components/Navbar.jsx";
import { TocIndex, NAV_IDS } from "./components/TocIndex.jsx";
import { Hero } from "./sections/Hero.jsx";
import { About } from "./sections/About.jsx";
import { Skills } from "./sections/Skills.jsx";
import { Projects } from "./sections/Projects.jsx";
import { Contact } from "./sections/Contact.jsx";
import { Footer } from "./sections/Footer.jsx";

// Tach engine hat sang chunk rieng, khong nam tren duong tai ban dau.
const ParticlesField = lazy(() =>
  import("./components/ParticlesField.jsx").then((m) => ({ default: m.ParticlesField }))
);

export default function App() {
  const { t } = useLanguage();
  const { resolved } = useTheme();
  const scrolled = useScrolled(24);
  const active = useActiveSection(NAV_IDS);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Cap nhat hash ma khong nhay trang.
    try {
      history.replaceState(null, "", `#${id}`);
    } catch {
      // Bo qua.
    }
  }, []);

  return (
    <>
      <a className="visually-hidden" href="#main">
        {t.a11y.skipToContent}
      </a>

      <Suspense fallback={null}>
        <ParticlesField resolvedTheme={resolved} />
      </Suspense>
      <Navbar
        t={t}
        active={active}
        scrolled={scrolled}
        onNavigate={navigate}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <TocIndex t={t} active={active} onNavigate={navigate} />

      <main id="main">
        <Hero t={t} onNavigate={navigate} />
        <About t={t} />
        <Skills t={t} />
        <Projects t={t} />
        <Contact t={t} />
      </main>

      <Footer onNavigate={navigate} />
    </>
  );
}