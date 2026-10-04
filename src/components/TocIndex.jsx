const NAV_IDS = ["hero", "about", "skills", "projects", "contact"];

export function TocIndex({ t, active, onNavigate }) {
  return (
    <nav className="toc" aria-label={t.a11y.tocLabel}>
      {NAV_IDS.map((id, i) => (
        <a
          key={id}
          href={`#${id}`}
          className="toc__item"
          aria-current={active === id ? "true" : undefined}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(id);
          }}
        >
          <span className="toc__label">{t.nav[id]}</span>
          <span className="toc__num" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="toc__bar" aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}

export { NAV_IDS };