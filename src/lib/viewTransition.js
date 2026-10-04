import { flushSync } from "react-dom";

// Chay View Transition neu trinh duyet ho tro va nguoi dung khong yeu cau
// giam chuyen dong. Gan toa do nut bam de hieu ung lan ra tu do.
export function runViewTransition(originEl, update) {
  const root = document.documentElement;
  const reduce =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!document.startViewTransition || reduce) {
    flushSync(update);
    return;
  }

  if (originEl && originEl.getBoundingClientRect) {
    const r = originEl.getBoundingClientRect();
    root.style.setProperty("--vt-x", `${Math.round(r.left + r.width / 2)}px`);
    root.style.setProperty("--vt-y", `${Math.round(r.top + r.height / 2)}px`);
  } else {
    root.style.setProperty("--vt-x", "50%");
    root.style.setProperty("--vt-y", "0px");
  }
  root.dataset.vt = "forward";

  document.startViewTransition(() => {
    flushSync(update);
  });
}