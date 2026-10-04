import { RevealFade, RevealLines, RevealLine } from "../components/Reveal.jsx";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard.js";
import { IconCopy, IconCheck, IconArrow } from "../components/Icons.jsx";

export function Contact({ t }) {
  const { copy, status } = useCopyToClipboard();
  const note =
    status === "copied" ? t.contact.copied : status === "error" ? t.contact.copyError : "";

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div>
          <RevealLines>
            <RevealLine>
              <span className="meta">{t.contact.label}</span>
            </RevealLine>
          </RevealLines>
          <RevealFade delay={0.08}>
            <h2 id="contact-title" className="contact__heading" style={{ marginTop: "var(--sp-3)" }}>
              {t.contact.heading}
            </h2>
          </RevealFade>
          <RevealFade delay={0.14}>
            <p style={{ color: "var(--c-secondary)", marginTop: "var(--sp-4)", maxWidth: "44ch" }}>
              {t.contact.blurb}
            </p>
          </RevealFade>
        </div>

        <RevealFade delay={0.1}>
          <span className="meta">{t.contact.emailLabel}</span>
          <p className="contact__email" style={{ marginTop: "var(--sp-2)" }}>
            {t.contact.email}
          </p>

          <div className="contact__row">
            <a className="btn btn--primary" href={`mailto:${t.contact.email}`}>
              {t.contact.mailLabel}
              <IconArrow />
            </a>
            <button
              type="button"
              className={"btn" + (status === "copied" ? " btn--copied" : "")}
              onClick={() => copy(t.contact.email)}
              aria-live="polite"
            >
              {status === "copied" ? <IconCheck /> : <IconCopy />}
              {status === "copied" ? t.contact.copied : t.contact.copy}
            </button>
          </div>
          <p className="copy-note" data-status={status} role="status" aria-live="polite">
            {note}
          </p>

          <ul className="contact__socials">
            {t.contact.socials.map((s) => (
              <li key={s.label}>
                <a
                  className="link-underline"
                  href={s.href}
                  {...(s.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {s.label}
                  {s.href.startsWith("http") && <IconArrow size={13} />}
                </a>
              </li>
            ))}
          </ul>
        </RevealFade>
      </div>
    </section>
  );
}