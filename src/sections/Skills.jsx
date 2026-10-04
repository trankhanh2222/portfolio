import { motion, useReducedMotion } from "motion/react";
import { RevealFade, RevealLines, RevealLine } from "../components/Reveal.jsx";

function Skill({ skill, index, t }) {
  const reduce = useReducedMotion();
  return (
    <li className="skill">
      <div className="skill__name">{skill.name}</div>
      <div className="skill__note">{skill.note}</div>
      <div className="skill__meter">
        <div
          className="skill__track"
          role="meter"
          aria-valuenow={skill.level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${t.a11y.skillLevel}: ${skill.name}`}
        >
          <motion.span
            className="skill__fill"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: skill.level / 100 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <span className="skill__value">{skill.level}%</span>
      </div>
    </li>
  );
}

export function Skills({ t }) {
  return (
    <section id="skills" className="section section--tight" aria-labelledby="skills-title">
      <div className="container">
        <div className="skills__head">
          <div>
            <RevealLines>
              <RevealLine>
                <span className="meta">{t.skills.label}</span>
              </RevealLine>
            </RevealLines>
            <RevealFade delay={0.08}>
              <h2 id="skills-title" className="skills__heading" style={{ marginTop: "var(--sp-3)" }}>
                {t.skills.heading}
              </h2>
            </RevealFade>
          </div>
        </div>

        <ul className="skills__list">
          {t.skills.items.map((skill, i) => (
            <Skill key={skill.name + i} skill={skill} index={i} t={t} />
          ))}
        </ul>
      </div>
    </section>
  );
}