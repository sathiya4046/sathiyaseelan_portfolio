"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_PREMIUM } from "./motion";
import { gradientText } from "./styles";

export default function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  className = "",
  align = "center",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isCenter = align === "center";

  return (
    <motion.header
      ref={ref}
      className={`relative mb-12 sm:mb-14 lg:mb-16 ${isCenter ? "text-center" : "text-left"} ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE_PREMIUM }}
    >
      {eyebrow && (
        <motion.div
          className={`mb-4 flex items-center gap-3 ${isCenter ? "justify-center" : ""}`}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/60 sm:w-16" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400/80 sm:text-sm">
            {eyebrow}
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400/60 sm:w-16" />
        </motion.div>
      )}

      <h2 className="font-SansOne text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}{" "}
        {titleAccent && <span className={gradientText}>{titleAccent}</span>}
      </h2>

      {subtitle && (
        <motion.p
          className={`mt-4 max-w-2xl text-sm leading-relaxed text-base-content/60 sm:text-base lg:text-lg ${
            isCenter ? "mx-auto" : ""
          }`}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  );
}
