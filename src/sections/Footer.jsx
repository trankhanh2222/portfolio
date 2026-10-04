import { useLanguage } from "../context/LanguageContext.jsx";
import { IconUp } from "../components/Icons.jsx";

export function Footer({ onNavigate }) {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__note">{t.footer.note}</p>
        <div className="footer__inner" style={{ gap: "var(--sp-5)" }}>
          <span className="meta">{t.a11y.createdAt}</span>
          <a
            href="#hero"
            className="link-underline"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("hero");
            }}
          >
            <IconUp />
            {t.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}