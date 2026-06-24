"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { experienceData } from "../../data/experienceData";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import TagChip from "../ui/TagChip";
import {
  HiOutlineBriefcase,
  HiOutlineBuildingOffice2,
  HiOutlineSparkles,
  HiOutlineCodeBracket,
} from "react-icons/hi2";

/* ─── helpers (derived from existing data — no data-structure changes) ─── */

const MONTH_MAP = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

function parseDate(str) {
  if (!str || /present/i.test(str)) {
    const now = new Date();
    return now.getFullYear() * 12 + now.getMonth();
  }
  const parts = str.trim().split(/\s+/);
  const month = MONTH_MAP[parts[0]?.slice(0, 3).toLowerCase()] ?? 0;
  const year = parseInt(parts[parts.length - 1], 10);
  return year * 12 + month;
}

function getTotalYears(data) {
  let months = 0;
  data.forEach(({ duration }) => {
    const [start, end] = duration.split(/\s*[-–]\s*/);
    months += Math.max(0, parseDate(end) - parseDate(start));
  });
  return Math.max(1, Math.round(months / 12));
}

function extractTechTags(points) {
  const joined = points.join(" ");
  const patterns = [
    { regex: /RESTful APIs?/i, tag: "REST APIs" },
    { regex: /Axios/i, tag: "Axios" },
    { regex: /responsive/i, tag: "Responsive UI" },
    { regex: /mobile optimization/i, tag: "Mobile First" },
    { regex: /front[- ]end/i, tag: "Front-end" },
    { regex: /\bAPI\b/i, tag: "API Integration" },
    { regex: /performance/i, tag: "Performance" },
    { regex: /TPM/i, tag: "TPM" },
    { regex: /\bHR\b/i, tag: "HR Compliance" },
    { regex: /maintenance/i, tag: "Maintenance" },
    { regex: /electrical/i, tag: "Electrical" },
    { regex: /documentation/i, tag: "Documentation" },
  ];
  const tags = [];
  patterns.forEach(({ regex, tag }) => {
    if (regex.test(joined) && !tags.includes(tag)) tags.push(tag);
  });
  return tags;
}

function getCompanyInitials(company) {
  return company
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function isCurrentRole(duration) {
  return /present/i.test(duration);
}

/* ─── animated counter ─── */

function AnimatedCounter({ value, suffix = "", label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col items-center gap-2 rounded-2xl border border-base-content/10 bg-base-200/30 px-5 py-6 backdrop-blur-md sm:px-8 sm:py-8"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="relative text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        {display}
        {suffix}
      </span>
      <span className="relative text-xs font-medium uppercase tracking-widest text-base-content/60 sm:text-sm">
        {label}
      </span>
    </motion.div>
  );
}

/* ─── stats bar ─── */

function StatsBar({ stats }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const items = [
    { value: stats.years, suffix: "+", label: "Years Experience", icon: HiOutlineBriefcase },
    { value: stats.companies, suffix: "", label: "Companies", icon: HiOutlineBuildingOffice2 },
    { value: stats.achievements, suffix: "+", label: "Key Achievements", icon: HiOutlineSparkles },
    { value: stats.technologies, suffix: "+", label: "Technologies", icon: HiOutlineCodeBracket },
  ];

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
    >
      {items.map(({ value, suffix, label, icon: Icon }) => (
        <motion.div
          key={label}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <div className="relative">
            <Icon className="absolute -top-1 right-3 h-4 w-4 text-cyan-400/40 sm:h-5 sm:w-5" aria-hidden />
            <AnimatedCounter value={value} suffix={suffix} label={label} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── experience card ─── */

function ExperienceCard({ exp, index, isLast }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });
  const isCurrent = isCurrentRole(exp.duration);
  const techTags = useMemo(() => extractTechTags(exp.points), [exp.points]);
  const visiblePoints = expanded ? exp.points : exp.points.slice(0, 2);
  const initials = getCompanyInitials(exp.company);
  const isRight = exp.direction === "right";

  const cardContent = (
    <motion.article
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
        isCurrent
          ? "border-cyan-400/30 bg-base-200/50 shadow-lg shadow-cyan-500/10"
          : "border-base-content/10 bg-base-200/30 shadow-md shadow-base-content/5"
      } backdrop-blur-xl`}
      whileHover={{ y: -6, scale: 1.005 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-r from-cyan-400/20 via-purple-400/10 to-pink-400/20 blur-sm" />

      <div className="relative p-5 sm:p-7 lg:p-8">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3 sm:mb-6">
          <div className="flex items-start gap-4">
            <motion.div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold sm:h-14 sm:w-14 sm:text-lg ${
                isCurrent
                  ? "bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-300"
                  : "bg-base-300/50 text-base-content/70"
              }`}
              whileHover={{ rotate: 4, scale: 1.05 }}
            >
              {initials}
            </motion.div>

            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold leading-tight sm:text-xl lg:text-2xl">
                  {exp.company}
                </h3>
                {isCurrent && (
                  <motion.span
                    className="inline-flex items-center gap-1 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-300 sm:text-xs"
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    </span>
                    Current Position
                  </motion.span>
                )}
              </div>
              <p className="text-sm font-medium text-purple-400/90 sm:text-base">
                {exp.role}
              </p>
            </div>
          </div>

          <motion.span
            className="inline-flex shrink-0 items-center rounded-lg border border-base-content/10 bg-base-300/30 px-3 py-1.5 text-xs font-mono text-base-content/60 sm:text-sm"
            whileHover={{ borderColor: "rgba(34, 211, 238, 0.3)" }}
          >
            {exp.duration}
          </motion.span>
        </div>

        {techTags.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {techTags.map((tag, i) => (
                <TagChip key={tag} index={i}>
                  {tag}
                </TagChip>
              ))}
          </div>
        )}

        <ul className="space-y-3 sm:space-y-4">
          <AnimatePresence mode="popLayout">
            {visiblePoints.map((pt, i) => (
              <motion.li
                key={`${pt}-${i}`}
                className="flex gap-3 text-sm leading-relaxed text-base-content/70 sm:text-base"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                layout
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" />
                <span>{pt}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {exp.points.length > 2 && (
          <motion.button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            className="mt-5 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            aria-expanded={expanded}
          >
            {expanded ? "Show less" : "Read more"}
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.span>
          </motion.button>
        )}
      </div>
    </motion.article>
  );

  const timelineNode = (
    <motion.div
      className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 shadow-lg sm:h-12 sm:w-12 ${
        isCurrent
          ? "border-cyan-400 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 shadow-cyan-400/30"
          : "border-base-content/20 bg-base-200/80 shadow-base-content/10"
      }`}
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      {isCurrent && (
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      <span className="text-[10px] font-bold text-base-content/80 sm:text-xs">{initials}</span>
    </motion.div>
  );

  return (
    <motion.div
      ref={cardRef}
      className="relative mb-8 sm:mb-10 lg:mb-14"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* mobile layout */}
      <div className="flex gap-4 lg:hidden">
        <div className="flex flex-col items-center">
          {timelineNode}
          {!isLast && <div className="mt-2 w-px flex-1 min-h-[2rem] bg-base-content/10" />}
        </div>
        <div className="min-w-0 flex-1">{cardContent}</div>
      </div>

      {/* desktop alternating layout */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-8">
        <div className={isRight ? "col-start-3" : "col-start-1"}>
          {cardContent}
        </div>

        <div className="col-start-2 flex flex-col items-center pt-6">
          {timelineNode}
        </div>

        <div className={isRight ? "col-start-1" : "col-start-3"} aria-hidden />
      </div>
    </motion.div>
  );
}

/* ─── scroll-linked timeline rail ─── */

function TimelineRail({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.15"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 lg:block"
      aria-hidden
    >
      <div className="absolute inset-0 bg-base-content/10" />
      <motion.div
        className="absolute top-0 left-0 w-full origin-top bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400"
        style={{ height }}
      />
      <motion.div
        className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"
        style={{ y: dotY, opacity: dotOpacity, top: 0 }}
      />
    </div>
  );
}

/* ─── scroll-linked timeline rail ─── */

export default function Experiences() {
  const timelineRef = useRef(null);

  const stats = useMemo(() => {
    const allTags = new Set();
    let achievements = 0;
    experienceData.forEach((exp) => {
      achievements += exp.points.length;
      extractTechTags(exp.points).forEach((t) => allTags.add(t));
    });
    return {
      years: getTotalYears(experienceData),
      companies: experienceData.length,
      achievements,
      technologies: allTags.size,
    };
  }, []);

  return (
    <Section id="experience" ariaLabelledby="experience-heading">
      <div className="mx-auto w-full max-w-6xl lg:max-w-7xl">
        <SectionHeader
          eyebrow="Career Timeline"
          title="Professional"
          titleAccent="Journey"
          subtitle="A curated timeline of roles, impact, and growth — from engineering foundations to full-stack development and mentorship."
        />

        <div className="mb-16 sm:mb-20 lg:mb-24">
          <StatsBar stats={stats} />
        </div>

        <div ref={timelineRef} className="relative">
          <TimelineRail containerRef={timelineRef} />

          <div className="pointer-events-none absolute left-[1.15rem] top-0 h-full w-px lg:hidden" aria-hidden>
            <div className="absolute inset-0 bg-base-content/10" />
          </div>

          <div className="relative space-y-0 lg:space-y-2">
            {experienceData.map((exp, i) => (
              <ExperienceCard
                key={`${exp.company}-${exp.duration}`}
                exp={exp}
                index={i}
                isLast={i === experienceData.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      <h2 id="experience-heading" className="sr-only">
        Professional Journey
      </h2>
    </Section>
  );
}
