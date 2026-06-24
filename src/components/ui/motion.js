export const EASE_PREMIUM = [0.22, 1, 0.36, 1];

export const SPRING_SOFT = { type: "spring", stiffness: 260, damping: 22 };
export const SPRING_SNAPPY = { type: "spring", stiffness: 300, damping: 22 };
export const SPRING_GENTLE = { type: "spring", stiffness: 100, damping: 20 };

export const SECTION_PY = "py-20 sm:py-24 lg:py-32";

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_PREMIUM },
  },
};

export const fadeUpStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_PREMIUM },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_PREMIUM },
  },
};

export const slideIn = (direction = "left") => ({
  hidden: { opacity: 0, x: direction === "left" ? -40 : 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: SPRING_GENTLE,
  },
});

export const cardHover = {
  whileHover: { y: -6, scale: 1.005 },
  transition: SPRING_SOFT,
};
