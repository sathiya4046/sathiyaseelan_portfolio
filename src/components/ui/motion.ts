export const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_SMOOTH: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const SPRING_SOFT = { type: "spring" as const, stiffness: 260, damping: 22 };
export const SPRING_SNAPPY = { type: "spring" as const, stiffness: 300, damping: 22 };
export const SPRING_GENTLE = { type: "spring" as const, stiffness: 100, damping: 20 };

export const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_PREMIUM },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25, ease: EASE_PREMIUM },
  },
};

export const VIEWPORT_FADE = {
  once: true,
  margin: "-60px" as const,
};

export const fadeInView = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT_FADE,
  transition: { duration: 0.55, ease: EASE_PREMIUM },
};

export const SECTION_PY = "py-20 sm:py-24 lg:py-28";

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_PREMIUM },
  },
};

export const fadeUpStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

export const fadeUpItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_PREMIUM },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_PREMIUM },
  },
};

export const slideIn = (direction: "left" | "right" = "left") => ({
  hidden: { opacity: 0, x: direction === "left" ? -32 : 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: SPRING_GENTLE,
  },
});

export const cardHover = {
  whileHover: { y: -4 },
  transition: SPRING_SOFT,
};
