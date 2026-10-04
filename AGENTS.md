# AGENTS.md

Hướng dẫn cho agent khi làm việc trong repo này.

## Stack (không tự ý đổi)

- Vite + React + JavaScript (không TypeScript), CSS thuần + CSS custom properties.
- Animation: `motion` (framer-motion). Particles: `react-tsparticles` + `tsparticles-slim`.
- Playwright là devDependency, chỉ dùng để kiểm chứng.
- KHÔNG thêm dependency ngoài danh sách trên nếu chưa được người dùng đồng ý.
- Không backend, không database, không xử lý form phía server.

## Quy ước

- Toàn bộ chữ hiển thị nằm ở `src/data/content.js` (vi + en). Không hard-code copy trong component.
- Token thiết kế nằm ở `src/styles/tokens.css`. Không hard-code màu/khoảng cách trong component.
- Tôn trọng `prefers-reduced-motion` cho mọi chuyển động.
- Animate chỉ `transform` và `opacity`.
- Mọi điều khiển phải có hành vi thật (R-26): link tới section có thật, `mailto:`, toggle có trạng thái.

## Anti-slop bắt buộc

- KHÔNG dùng dấu gạch dài em dash (`—`) hay en dash (`–`) trong bất kỳ chữ hiển thị nào. Dùng gạch nối `-`.
- Không bịa số liệu, testimonial, logo khách hàng, thành tích. Placeholder phải ghi rõ là placeholder.
- Không eyebrow đánh số, không scroll cue, không dải chữ trang trí, không chấm trạng thái màu.
- Không gradient AI, không glow tràn lan, không bo tròn mọi thứ.
- Link dự án không được tạo trang lỗi; mặc định `https://example.com`.

## Kiểm chứng (bắt buộc trước khi báo hoàn thành)

```bash
npm run build
npx playwright test
```

Kiểm tra console sạch, không tràn ngang (`scrollWidth <= innerWidth`) ở 1280, 834, 375, cả hai theme, cả VI/EN. Ghi bằng chứng vào `TASKS.md`.

## Tài liệu

- `DESIGN.md`: hướng thiết kế đã chọn (PRESS).
- `TASKS.md`: nguồn sự thật tiến độ, mọi `[x]` kèm bằng chứng.
- `README.md`: hướng dẫn cài đặt, chỉnh sửa, hệ thống ngôn ngữ/theme.

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read `antislop.md` (core) and then the skill for the task:
- UI / visual: `skills/antislop-ui/SKILL.md`
- Copy & text: `skills/antislop-copywriting/SKILL.md`
- People: `skills/antislop-human/SKILL.md`
- Mobile / responsive: `skills/antislop-layoutmobile/SKILL.md`
- Code comments: `skills/antislop-code/SKILL.md`
Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference, then ask. A session instruction always wins.
<!-- antislop:end -->