import { motion, useReducedMotion as useMotionReduced } from "motion/react";

// Tu khoa duoc danh dau bang *...* trong content.js va duoc ve mot net gach
// chan "but do proofreader" khi cuon toi. Chu van nam o content.js, component
// chi lo phan trinh bay.

const MARKER = /\*([^*]+)\*/g;

// Net gon tay: hoi cong, dau-cuoi lech nhe. ViewBox rong de keo gian theo tu.
// Hai net: net chinh ve truoc, net de lai ve sau hoi lech -> trong nhu to lai
// bang but, dam va co nhip hon. Chi dung mot mau accent.
const STROKE = "M3 6.4C18 3.6 34 8.2 52 5.6C70 3 86 7.8 104 4.6C110 3.6 115 4.4 117 6";
const STROKE_ECHO = "M4 7.1C20 4.8 36 8.9 54 6.6C72 4.2 88 8.4 106 5.5C111 4.7 114 5.2 116 6.7";

function Mark({ children }) {
  const reduce = useMotionReduced();
  const draw = (delay, duration) =>
    reduce
      ? { style: { pathLength: 1 } }
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, amount: 0.6 },
          transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <span className="mark">
      {children}
      <svg
        className="mark__stroke"
        viewBox="0 0 120 10"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <motion.path
          className="mark__path mark__path--main"
          d={STROKE}
          fill="none"
          vectorEffect="non-scaling-stroke"
          {...draw(0, 0.5)}
        />
        <motion.path
          className="mark__path mark__path--echo"
          d={STROKE_ECHO}
          fill="none"
          vectorEffect="non-scaling-stroke"
          {...draw(0.16, 0.5)}
        />
      </svg>
    </span>
  );
}

// Tra ve mang React node: text thuong va tu khoa duoc boc <Mark>.
export function RichText({ text }) {
  if (typeof text !== "string" || !text.includes("*")) return text;

  const nodes = [];
  let last = 0;
  let key = 0;
  MARKER.lastIndex = 0;
  let m;
  while ((m = MARKER.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    nodes.push(<Mark key={key++}>{m[1]}</Mark>);
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}