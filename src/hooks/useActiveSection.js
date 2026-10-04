import { useEffect, useState } from "react";

// Theo doi section dang hien trong viewport de lam noi bat muc luc.
export function useActiveSection(ids, offset = 0.35) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (els.length === 0) return;

    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let bestId = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId) setActive(bestId);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: `-${Math.round(offset * 100)}% 0px -40% 0px` }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}