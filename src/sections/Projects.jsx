import { RevealFade, RevealLines, RevealLine } from "../components/Reveal.jsx";
import { IconExternal } from "../components/Icons.jsx";

function ProjectVisual({ project, t }) {
  if (project.image) {
    return (
      <div className="project__visual">
        <img
          className="project__img"
          src={`${import.meta.env.BASE_URL}${project.image}`}
          alt={project.imageAlt || project.title}
          loading="lazy"
        />
      </div>
    );
  }
  // Project chua co anh: khung placeholder ghi ro, khong gia lam anh that.
  return (
    <div className="project__visual project__visual--empty">
      <span className="project__ph">{t.projects.imagePlaceholder}</span>
    </div>
  );
}

function Project({ project, index, t }) {
  const wide = project.featured;
  return (
    <article className={"project" + (wide ? " project--wide" : "")}>
      <RevealFade y={24}>
        <ProjectVisual project={project} t={t} />
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