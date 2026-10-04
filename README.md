# Portfolio

Portfolio cá nhân, một trang, xây bằng Vite + React (JavaScript) + CSS thuần, với framer-motion (gói `motion`) và particles.

## Cài đặt

```bash
npm install
```

## Phát triển

```bash
npm run dev
```

Mở địa chỉ mà Vite in ra (mặc định `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Kiểm thử

Playwright chỉ dùng cho việc kiểm chứng (devDependency).

```bash
npx playwright install chromium
npx playwright test
```

Các test hiện có:
- `tests/verify.spec.js`: tải trang, console, tràn ngang, nav, VI/EN, theme, copy email, reduced motion.
- `tests/interaction.spec.js`: menu mobile + Escape, tablet, keyboard focus.
- `tests/layout-audit.spec.js`: overflow, thứ bậc heading, kích thước tap target.
- `tests/screenshots.spec.js`: chụp ảnh vào `screenshots/`.
- `tests/motion.spec.js`: view transition theme, cutscene khi đổi ngôn ngữ, reduced motion bỏ qua, hover card.

## Chỉnh nội dung

Toàn bộ chữ hiển thị nằm ở `src/data/content.js`, gồm hai ngôn ngữ `vi` và `en`.

- Mỗi chỗ dạng `[ ... ]` là placeholder, hãy thay bằng thông tin thật.
- Comment trong file giải thích từng mục.
- Skills tối thiểu 5, Projects tối thiểu 4; mỗi project cần `title`, `description`, `category`, `tech`, `link`, `visual`.

## Thay ảnh

- Ảnh dự án hiện là khối UI/CSS thiết kế sẵn (`type`, `grid`, `wave`, `stack`) ở `src/sections/Projects.jsx`, không phải file ảnh. Muốn dùng ảnh thật, thay component `ProjectVisual` bằng thẻ `<img>` và để ảnh trong `public/`.
- `public/favicon.svg` và `public/og-image.svg` là placeholder; thay bằng file thật (favicon và ảnh OG 1200×630).

## Tùy chỉnh token

Mọi màu, chữ, khoảng cách, bo góc, bóng, easing đều ở `src/styles/tokens.css`.

- Đổi màu: sửa biến `--c-*`.
- Dark mode: khối `:root[data-theme="dark"]` và `@media (prefers-color-scheme: dark)`.
- Đổi font: sửa `--font-*`; file font ở `public/fonts/`.

## Hệ thống ngôn ngữ

- Mặc định: VI.
- Nút `VI | EN` ở navbar.
- Lưu vào `localStorage` khóa `portfolio.lang`, có `try/catch`, fallback an toàn.
- Đổi không cần reload; reload giữ nguyên lựa chọn.
- Thêm ngôn ngữ: thêm khóa vào `content` trong `content.js` và mở rộng `SUPPORTED` trong `LanguageContext.jsx`.

## Hệ thống theme

- Ba chế độ: `light`, `dark`, `system`; mặc định `system`.
- Nút mặt trời/mặt trăng ở navbar.
- Lưu `localStorage` khóa `portfolio.theme`.
- Áp qua thuộc tính `data-theme` trên `<html>`.

## Ghi chú

- Không có backend, không form phía server. Liên hệ qua `mailto:` và nút sao chép email.
- Không thêm dependency ngoài danh sách trong đề bài.