"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_PREMIUM } from "./motion";
import { gradientText } from "./styles";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
  id?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  className = "",
  align = "center",
  id,
}: SectionHeaderProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const isCenter = align === "center";

  return (
    <motion.header
      ref={ref}
      className={`relative mb-10 sm:mb-12 lg:mb-14 ${isCenter ? "text-center" : "text-left"} ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE_PREMIUM }}
    >
      {eyebrow && (
        <div
          className={`mb-4 flex items-center gap-3 ${isCenter ? "justify-center" : ""}`}
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/60 sm:w-16" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400/90 sm:text-sm">
            {eyebrow}
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400/60 sm:w-16" />
        </div>
      )}

      <h2
        id={id}
        className="font-SansOne text-3xl font-bold tracking-tight text-base-content sm:text-4xl lg:text-5xl"
      >
        {title}{" "}
        {titleAccent && <span className={gradientText}>{titleAccent}</span>}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-sm leading-relaxed text-base-content/60 sm:text-base lg:text-lg ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}
