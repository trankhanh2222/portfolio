import { RevealFade, RevealLines, RevealLine } from "../components/Reveal.jsx";
import { IconExternal } from "../components/Icons.jsx";

function ProjectVisual({ kind }) {
  if (kind === "grid") {
    return (
      <div className="pv pv--grid" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
    );
  }
  if (kind === "wave") {
    const heights = [30, 55, 40, 80, 62, 90, 48, 72, 36, 68, 52, 84];
    return (
      <div className="pv pv--wave" aria-hidden="true">
        {heights.map((h, i) => (
          <i key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    );
  }
  if (kind === "stack") {
    return (
      <div className="pv pv--stack" aria-hidden="true">
        <span className="pv__bar" />
        <span className="pv__bar" />
        <span className="pv__bar" />
        <span className="pv__bar" />
      </div>
    );
  }
  return (
    <div className="pv pv--type" aria-hidden="true">
      <span className="pv__line">Aa</span>
    </div>
  );
}

function Project({ project, index, t }) {
  const wide = project.featured;
  return (
    <article className={"project" + (wide ? " project--wide" : "")}>
      <RevealFade y={24}>
        <div className="project__visual">
          <ProjectVisual kind={project.visual} />
        </div>
      </RevealFade>

      <div className="project__body">
        <div>
          <span className="project__num">
            {String(index + 1).padStart(2, "0")} {" / "} {project.category}
          </span>
          <h3 className="project__title">{project.title}</h3>
          <p className="project__desc">{project.description}</p>
        </div>
        <div>
          <ul className="project__tech" aria-label={project.title}>
            {project.tech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <RevealFade delay={0.05}>
            <a
              className="btn project__link"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.projects.viewLabel}
              <IconExternal />
              <span className="visually-hidden">, {t.a11y.externalLink}</span>
            </a>
          </RevealFade>
        </div>
      </div>
    </article>
  );
}

export function Projects({ t }) {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <div className="projects__head">
          <RevealLines>
            <RevealLine>
              <span className="meta">{t.projects.label}</span>
            </RevealLine>
          </RevealLines>
          <RevealFade delay={0.08}>
            <h2 id="projects-title" className="projects__heading" style={{ marginTop: "var(--sp-3)" }}>
              {t.projects.heading}
            </h2>
          </RevealFade>
        </div>

        <div className="projects__grid">
          {t.projects.items.map((project, i) => (
            <Project key={project.title + i} project={project} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}