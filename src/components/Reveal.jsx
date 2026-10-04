import { motion, useReducedMotion as useMotionReduced } from "motion/react";

// Tien ich reveal: cac component dung chung nhung kieu chuyen dong khac nhau
// de moi section khong bi lap cung mot hieu ung.

export function RevealLines({ children, className, delay = 0, as = "div" }) {
  const reduce = useMotionReduced();
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
    >
      {children}
    </Tag>
  );
}

export function RevealLine({ children, className }) {
  const reduce = useMotionReduced();
  return (
    <span className={"rl" + (className ? " " + className : "")}>
      <motion.span
        className="rl__inner"
        initial={reduce ? false : { y: "110%" }}
        variants={{ show: { y: "0%" } }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function RevealFade({ children, className, delay = 0, y = 16, as = "div" }) {
  const reduce = useMotionReduced();
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

export function RevealStagger({ children, className, gap = 0.07, amount = 0.25 }) {
  const reduce = useMotionReduced();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, y = 20 }) {
  const reduce = useMotionReduced();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? {} : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}