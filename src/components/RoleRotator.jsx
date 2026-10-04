import { useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useEnvironment.js";

// Chu vai tro trai nghiem dang go. Khi giam chuyen dong thi hien tinh,
// khong chay vong lap.
export function RoleRotator({ roles, label }) {
  const reduced = useReducedMotion();
  const [text, setText] = useState(roles[0]);

  useEffect(() => {
    if (reduced) {
      setText(roles[0]);
      return;
    }
    let role = 0;
    let char = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const current = roles[role];
      if (!deleting) {
        char += 1;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer = setTimeout(tick, 1600);
          return;
        }
        timer = setTimeout(tick, 42);
      } else {
        char -= 1;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          role = (role + 1) % roles.length;
          timer = setTimeout(tick, 320);
          return;
        }
        timer = setTimeout(tick, 24);
      }
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [roles, reduced]);

  return (
    <span className="hero__role-text" aria-label={label}>
      {reduced ? roles[0] : text}
      {!reduced && <span className="hero__caret" aria-hidden="true" />}
    </span>
  );
}