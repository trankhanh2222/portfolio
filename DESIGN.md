# DESIGN.md

Hướng thiết kế đã chọn: **PRESS** (hướng số 2 trong Phase 0).

## Nguồn cảm hứng

Chủ nghĩa hiện đại Thụy Sĩ (Swiss International Typographic Style) kết hợp thiết kế biên tập Nhật Bản: lưới chặt, đường kẻ tóc mảnh, chữ lớn làm điểm nhấn, nhịp nghỉ rộng, và chữ serif in nghiêng dùng để nhấn trong một tiêu đề sans.

Lý do: portfolio của một developer cá nhân cần thể hiện gu thẩm mỹ và sự cẩn thận. Ngôn ngữ biên tập tạo cảm giác "được làm bởi người có nghề", khác hẳn giao diện app mặc định của AI, mà vẫn giữ được sự điềm tĩnh và dễ đọc.

## Bảng màu

Token nằm ở `src/styles/tokens.css`.

| Token | Light | Dark |
| --- | --- | --- |
| `--c-bg` | `#f5f4f0` | `#141311` |
| `--c-surface` | `#ffffff` | `#1c1a17` |
| `--c-ink` | `#121211` | `#f4f2ec` |
| `--c-secondary` | `#5b584f` | `#b9b3a5` |
| `--c-accent` | `#c8342b` | `#e0574d` |
| `--c-text` | `#1a1917` | `#eceae3` |
| `--c-muted` | `#6e6a5e` | `#948e80` |
| `--c-border` | `#d9d5cb` | `#302d28` |

Một accent duy nhất (đỏ vermillion cho light, đỏ sáng hơn cho dark). Không gradient AI, không glow.

Lý do accent: đỏ vermillion là mực in spot kinh điển của in ấn biên tập, đứng cạnh nền giấy ấm tạo tương phản có chủ đích mà không phải màu mặc định của AI.

## Typography

- Display/body: **Archivo** (400/600/700/800). Grotesque hình học, chắc khỏe cho tiêu đề lớn.
- Nhấn: **Newsreader italic** (400/500). Serif in nghiêng chỉ dùng cho các từ nhấn trong câu, không dùng làm font chính.
- Meta/nhãn/số: **IBM Plex Mono** (400/500).

Lý do: cặp grotesque + serif-italic là ngôn ngữ biên tập thật, không phải chọn font vì "trông sáng tạo". Mono cung cấp giọng kỹ thuật cho nhãn, số %.

Font được self-host trong `public/fonts/` (subset latin + vietnamese), khai báo `@font-face` ở `src/styles/fonts.css`, `font-display: swap`. Đã kiểm tra đủ 30 glyph tiếng Việt `ắằẳẵặ ếềểễệ ơờởỡợ ưừửữự` bằng cmap.

## Bố cục

- Một lưới 12 cột, dùng container `--container: 1280px`.
- Trang có cấu trúc: Hero (masthead) → About (bất đối xứng 4/7) → Skills (danh sách hàng) → Projects (lưới 6 cột, 1 thẻ nổi bật) → Contact (2 cột) → Footer.
- Mỗi section một bố cục khác nhau, không lặp "tiêu đề giữa + card giống nhau".
- Bán kính gần vuông (`0`/`2px`/`4px`) có chủ đích, không bo tròn mọi thứ.

## Chuyển động (Motion)

- **Signature 1:** masthead hiện từng dòng bằng mặt nạ (`RevealLines`/`RevealLine`).
- **Signature 2:** mục lục biên tập ở cạnh phải (`.toc`), số của section đang xem mở rộng và vẽ đường đỏ (`useActiveSection` dùng IntersectionObserver).
- **Chuyển theme:** vet quét chéo lan ra từ chính nút bấm, dùng View Transitions API (`src/lib/viewTransition.js` + keyframes `vt-diamond`). Không hỗ trợ/reduced motion thì đổi tức thì.
- **Chuyển ngôn ngữ:** vet quét ngược hướng từ nút (`vt-square`), cùng cơ chế.
- Icon theme xoay và scale khi đổi; menu mobile vào/ra có stagger; card dự án nhấc nhẹ và gạch chân tiêu đề khi hover; hàng kỹ năng tint và nhích tên; mũi tên CTA nhích khi hover; nút copy nhún nhẹ khi thành công.
- Particles: lớp "bụi giấy" rất mờ, pointer-reactive nhẹ, nằm sau nội dung (`pointer-events: none`).
- Parallax Hero rất nhẹ, chỉ `transform`/`opacity`.
- Scroll reveal: nhiều kiểu (mask line, stagger, bar fill) không lặp một kiểu cho mọi section.
- Không custom cursor.
- Tất cả tôn trọng `prefers-reduced-motion`: tắt particles, parallax, signature animation, view transition, reveal.

## Responsive

- Desktop 1280×800: lưới đầy đủ, TOC ở rail phải.
- Tablet (≤960px): About/Contact về 1 cột, TOC vẫn hiện.
- Mobile (≤680px): Skills và Projects về 1 cột, TOC ẩn, hamburger mở drawer toàn màn hình.
- Invariant đã kiểm: `document.documentElement.scrollWidth <= window.innerWidth` ở 1280, 834, 375.

## Quyết định thiết kế quan trọng

- Không dùng testimonials, logo khách hàng, hay số liệu bịa. Chỉ có % kỹ năng tự đánh giá và placeholder rõ ràng.
- Không có eyebrow đánh số, không scroll cue, không dải chữ trang trí, không chấm trạng thái màu.
- Placeholder dự án là khối UI/CSS được thiết kế (type, grid, wave, stack), không phải ảnh lỗi.
- Link dự án mặc định `https://example.com` (luôn mở được) kèm hướng dẫn thay.