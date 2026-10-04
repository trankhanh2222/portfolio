import { RevealFade, RevealLines, RevealLine, RevealStagger, RevealItem } from "../components/Reveal.jsx";

export function About({ t }) {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__left">
          <RevealLines>
            <RevealLine>
              <span className="meta">{t.about.label}</span>
            </RevealLine>
          </RevealLines>
          <RevealFade delay={0.1}>
            <h2 id="about-title" className="about__heading" style={{ marginTop: "var(--sp-4)" }}>
              {t.about.heading}
            </h2>
          </RevealFade>
        </div>

        <div className="about__right">
          <RevealStagger className="about__body">
            {t.about.body.map((p, i) => (
              <RevealItem key={i}>
                <p>{p}</p>
              </RevealItem>
            ))}
          </RevealStagger>

          <RevealFade delay={0.15}>
            <dl className="about__facts">
              {t.about.facts.map((f, i) => (
                <div className="about__fact" key={i}>
                  <dt>{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>
          </RevealFade>
        </div>
      </div>
    </section>
  );
}