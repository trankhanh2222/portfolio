import { useEffect, useState } from "react";

// Chi true tren thiet bi co tro (chuot/but). Dung de bat con tro/tuong tac nang hon.
export function usePointerFine() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return fine;
}

// Ton trong cai dat giam chuyen dong cua nguoi dung.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

// Theo doi da cuon khoi dau trang chua (cho navbar doi trang thai).
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}