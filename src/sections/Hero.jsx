import { motion, useReducedMotion as useMotionReduced, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { RevealLines, RevealLine, RevealFade } from "../components/Reveal.jsx";
import { RoleRotator } from "../components/RoleRotator.jsx";
import { IconArrow } from "../components/Icons.jsx";

export function Hero({ t, onNavigate }) {
  const reduce = useMotionReduced();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2]);

  const go = (id) => (e) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <section id="hero" className="hero section" ref={ref} aria-labelledby="hero-title">
      <motion.div className="container hero__inner" style={reduce ? undefined : { y, opacity }}>
        <div className="hero__eyebrow meta">{t.hero.eyebrow}</div>

        <h1 id="hero-title" className="hero__name">
          <RevealLines>
            <RevealLine>{t.hero.name}</RevealLine>
          </RevealLines>
        </h1>

        <div className="hero__role">
          <span className="meta visually-hidden">{t.a11y.roleRotator}:</span>
          <RoleRotator roles={t.hero.roles} label={t.a11y.roleRotator} />
        </div>

        <RevealFade delay={0.15}>
          <p className="hero__tagline">{t.hero.tagline}</p>
          <div className="hero__ctas">
            <a href="#projects" className="btn btn--primary" onClick={go("projects")}>
              {t.hero.ctaPrimary}
              <IconArrow />
            </a>
            <a href="#contact" className="btn" onClick={go("contact")}>
              {t.hero.ctaSecondary}
            </a>
          </div>
        </RevealFade>
      </motion.div>
    </section>
  );
}