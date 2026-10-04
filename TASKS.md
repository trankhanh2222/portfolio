# TASKS.md

Nguồn sự thật cho tiến độ. `[x]` luôn kèm bằng chứng. `[~]` là chưa kiểm chứng được, kèm lý do.

## Phase 1 - Nền tảng

[x] Khảo sát repo trống, không có app cần giữ
    Evidence: `ls` cho thấy chỉ có `.git`, `.opencode/`, `config.json`, `model-schema.json`, `opencode.json`, `README.md` 1 dòng.

[x] Cài dependencies đúng danh sách cho phép
    Evidence: `npm install` -> 0 vulnerabilities; package.json chỉ có motion, react, react-dom, react-tsparticles, tsparticles-slim, @playwright/test, @vitejs/plugin-react, vite.

[x] Design tokens tập trung trong `:root`
    Evidence: File: `src/styles/tokens.css` (màu, typography, spacing, radius, shadow, container, z-index, duration, easing; dark mode qua `[data-theme]`).

[x] Font self-host, kiểm tra glyph tiếng Việt
    Evidence: File: `public/fonts/` (16 woff2), `src/styles/fonts.css`; cmap check `ắằẳẵặ ếềểễệ ơờởỡợ ưừửữự` -> OK trên toàn bộ file vietnamese.

[x] Nội dung tập trung ở `content.js` với vi + en
    Evidence: File: `src/data/content.js`.

[x] i18n bằng React Context, lưu localStorage có try/catch
    Evidence: File: `src/context/LanguageContext.jsx`.

[x] Theme sáng/tối token-driven, lưu localStorage
    Evidence: File: `src/context/ThemeContext.jsx`.

## Phase 2 - UI

[x] Navbar cố định, active section, language, theme, hamburger
    Evidence: File: `src/components/Navbar.jsx`, `TocIndex.jsx`; test interaction desktop+mobile pass.

[x] Hero: tên, vai trò xoay, slogan, 2 CTA
    Evidence: File: `src/sections/Hero.jsx`; test "hero fits in first viewport" pass.

[x] About, Skills (5+), Projects (4+, có biến thể), Contact (mailto + copy), Footer
    Evidence: `src/sections/About.jsx`, `Skills.jsx`, `Projects.jsx`, `Contact.jsx`, `Footer.jsx`.

[x] Responsive 1280×800, 375×812, tablet
    Evidence: layout-audit desktop/mobile/tablet: overflowing = [].

[x] Không tràn ngang
    Evidence: Command: `npx playwright test tests/layout-audit.spec.js` -> overflowing [] ở 1280 và 375.

## Phase 3 - Motion

[x] Signature (masthead reveal + TOC index)
    Evidence: `src/components/Reveal.jsx`, `src/components/TocIndex.jsx`.

[x] Chuyển theme bằng vet quét chéo từ nút (View Transitions API)
    Evidence: `src/lib/viewTransition.js`, keyframes `vt-diamond` trong `src/styles/base.css`; test "theme toggle uses a view transition when supported" pass.

[x] Chuyển ngôn ngữ bằng cutscene "press platen" (3 dải mực dựng lên + đường kẻ accent)
    Evidence: `src/components/LanguageWipe.jsx`, keyframes `lang-wipe-col`/`lang-wipe-rule` + `--dur-wipe`; test "language toggle plays an edition wipe..." pass.

[x] Công tắc ngôn ngữ gộp thành một nút (icon quả địa cầu + mã VI/EN)
    Evidence: `LangSwitch` trong `src/components/Navbar.jsx`, style `.icon-btn--lang`; test verify dùng `.nav__tools .icon-btn--lang` pass.

[x] Vi tương tác: icon theme xoay, menu stagger, card hover, skill hover, mũi tên CTA, copy pop
    Evidence: `src/components/Navbar.jsx`, `src/styles/components.css`, `src/styles/sections.css`; test "project card lifts..." pass.

[x] Particles react-tsparticles + tsparticles-slim, tắt khi reduced motion
    Evidence: Test "reduced motion disables particles" pass ở desktop + mobile.

[x] Parallax nhẹ, tắt khi reduced motion
    Evidence: `src/sections/Hero.jsx` dùng `useScroll`/`useTransform`, nhánh `reduce`.

[x] Scroll reveal nhiều kiểu
    Evidence: `RevealLines/Line/Fade/Stagger/Item` dùng khác nhau ở các section.

[x] Không custom cursor
    Evidence: không có code con trỏ tùy biến trong `src/`.

## Phase 4 - A11y, SEO, Docs

[x] Semantic, heading hierarchy, focus, keyboard, dialog Escape
    Evidence: layout-audit headings: H1 -> H2 -> H3...; interaction tests pass.

[x] Contrast AA cả hai theme
    Evidence: tính toán WCAG: light text/bg 15.96:1, dark text/bg 15.42:1, các cặp còn lại >= 4.5:1 (white-on-accent ở dark đã sửa bằng token `--c-on-accent`).

[x] SEO trong index.html
    Evidence: File: `index.html` (title, description, viewport, theme-color, OG, twitter, favicon).

[x] README.md, DESIGN.md, AGENTS.md, TASKS.md
    Evidence: các file trong repo.

## Verification

[x] Build thành công
    Evidence:
    Command: `npm run build`
    Result: exit code 0, "built in ~7s", không có lỗi.

[x] Test Playwright toàn bộ
    Evidence: Command: `npx playwright test` -> 43 passed (desktop + mobile; gồm motion.spec.js).

[x] Screenshots
    Evidence: `screenshots/` (14 ảnh: desktop-hero-light/dark/en, desktop-about/skills/projects/contact-light, desktop-projects-dark, mobile-hero/about/skills/projects/contact-light, mobile-menu-light).

[~] Kiểm tra ảnh bằng mắt
    Reason: model hiện tại không có khả năng đọc ảnh; đã thay bằng audit layout/contrast/overflow tự động. Cần người xem lại `screenshots/` để xác nhận thẩm mỹ.