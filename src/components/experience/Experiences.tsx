"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  HiOutlineBriefcase,
  HiOutlineBuildingOffice2,
  HiOutlineCodeBracket,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { experienceData, type ExperienceItem } from "@/data/experienceData";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import TagChip from "../ui/TagChip";
import { EASE_PREMIUM } from "../ui/motion";

const MONTH_MAP: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

function parseDate(str: string): number {
  if (!str || /present/i.test(str)) {
    const now = new Date();
    return now.getFullYear() * 12 + now.getMonth();
  }
  const parts = str.trim().split(/\s+/);
  const month = MONTH_MAP[parts[0]?.slice(0, 3).toLowerCase()] ?? 0;
  const year = parseInt(parts[parts.length - 1] ?? "", 10);
  return Number.isFinite(year) ? year * 12 + month : 0;
}

/** Calendar span from earliest start → latest end (no double-counting overlaps). */
function getCareerYears(data: ExperienceItem[]): number {
  let min = Infinity;
  let max = -Infinity;
  data.forEach(({ duration }) => {
    const [start, end] = duration.split(/\s*[-–]\s*/);
    min = Math.min(min, parseDate(start ?? ""));
    max = Math.max(max, parseDate(end ?? ""));
  });
  if (!Number.isFinite(min) || !Number.isFinite(max)) return 1;
  return Math.max(1, Math.round((max - min) / 12));
}

function getCompanyInitials(company: string): string {
  return company
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function isCurrentRole(duration: string): boolean {
  return /present/i.test(duration);
}

/* ─── stats ─── */

type StatItem = {
  value: number;
  suffix: string;
  label: string;
  icon: typeof HiOutlineBriefcase;
};

const AnimatedCounter = memo(function AnimatedCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduceMotion]);

  return (
    <div
      ref={ref}
      className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl border border-base-content/10 bg-base-200/30 px-4 py-5 transform-gpu sm:px-6 sm:py-6"
    >
      <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
        {display}
        {suffix}
      </span>
      <span className="text-center text-[10px] font-medium uppercase tracking-widest text-base-content/60 sm:text-xs">
        {label}
      </span>
    </div>
  );
});

const StatsBar = memo(function StatsBar({ stats }: { stats: StatItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
    >
      {stats.map(({ value, suffix, label, icon: Icon }, i) => (
        <motion.div
          key={label}
          className="relative h-full"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: i * 0.06, ease: EASE_PREMIUM }}
        >
          <Icon
            className="absolute right-3 top-3 h-4 w-4 text-cyan-500/40"
            aria-hidden
          />
          <AnimatedCounter value={value} suffix={suffix} label={label} />
        </motion.div>
      ))}
    </div>
  );
});

/* ─── card ─── */

const ExperienceCard = memo(function ExperienceCard({
  exp,
  index,
  isLast,
}: {
  exp: ExperienceItem;
  index: number;
  isLast: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLLIElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const isCurrent = isCurrentRole(exp.duration);
  const initials = useMemo(() => getCompanyInitials(exp.company), [exp.company]);
  const isRight = exp.direction === "right";
  const visiblePoints = expanded ? exp.points : exp.points.slice(0, 2);

  const toggle = useCallback(() => setExpanded((p) => !p), []);

  const node = (
    <div
      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 sm:h-11 sm:w-11 ${
        isCurrent
          ? "border-cyan-400 bg-cyan-400/15 text-cyan-600 dark:text-cyan-300"
          : "border-base-content/20 bg-base-200 text-base-content/70"
      }`}
      aria-hidden
    >
      {isCurrent && !reduceMotion && (
        <span className="absolute inset-0 rounded-full border border-cyan-400/40 motion-safe:animate-pulse" />
      )}
      <span className="text-[10px] font-bold sm:text-xs">{initials}</span>
    </div>
  );

  const card: ReactNode = (
    <article
      className={`group relative flex h-full flex-col rounded-2xl border p-5 transition-colors duration-300 sm:p-6 lg:p-7 ${
        isCurrent
          ? "border-cyan-400/30 bg-base-200/40"
          : "border-base-content/10 bg-base-200/25"
      } hover:border-cyan-400/25 focus-within:border-cyan-400/30`}
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold leading-snug text-base-content sm:text-lg lg:text-xl">
              {exp.company}
            </h3>
            {isCurrent && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/35 bg-cyan-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                Current
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-purple-600 dark:text-purple-400/90 sm:text-base">
            {exp.role}
          </p>
        </div>
        <time className="shrink-0 rounded-lg border border-base-content/10 bg-base-300/30 px-2.5 py-1 font-mono text-xs text-base-content/60 sm:text-sm">
          {exp.duration}
        </time>
      </div>

      {exp.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {exp.tags.map((tag, i) => (
            <TagChip key={tag} index={i}>
              {tag}
            </TagChip>
          ))}
        </div>
      )}

      <ul className="flex flex-1 flex-col gap-3">
        {visiblePoints.map((pt, i) => (
          <li
            key={`${i}-${pt.slice(0, 24)}`}
            className="flex gap-2.5 text-sm leading-relaxed text-base-content/70 sm:text-[0.95rem]"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" />
            <span>{pt}</span>
          </li>
        ))}
      </ul>

      {exp.points.length > 2 && (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md text-sm font-semibold text-cyan-600 transition-colors hover:text-cyan-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 dark:text-cyan-400"
        >
          {expanded ? "Show less" : "Read more"}
          <span
            className={`text-[10px] transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            aria-hidden
          >
            ▼
          </span>
        </button>
      )}
    </article>
  );

  return (
    <motion.li
      ref={cardRef}
      className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] lg:gap-8"
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE_PREMIUM }}
    >
      {/* Timeline column (mobile col 1 / desktop center) */}
      <div className="relative col-start-1 row-start-1 flex flex-col items-center lg:col-start-2">
        {node}
        {!isLast && (
          <div
            className="mt-2 w-px flex-1 min-h-8 bg-base-content/10"
            aria-hidden
          />
        )}
      </div>

      {/* Card — single instance */}
      <div
        className={`col-start-2 row-start-1 min-w-0 lg:row-start-1 ${
          isRight ? "lg:col-start-3" : "lg:col-start-1 lg:text-left"
        }`}
      >
        {card}
      </div>

      {/* Desktop empty opposite cell for balance */}
      <div
        className={`hidden lg:block ${isRight ? "lg:col-start-1" : "lg:col-start-3"}`}
        aria-hidden
      />
    </motion.li>
  );
});

/* ─── scroll rail (desktop) ─── */

function TimelineRail({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const top = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);

  if (reduceMotion) {
    return (
      <div
        className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-base-content/10 lg:block"
        aria-hidden
      />
    );
  }

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 lg:block"
      aria-hidden
    >
      <div className="absolute inset-0 bg-base-content/10" />
      <motion.div
        className="absolute left-0 top-0 w-full origin-top bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 will-change-[height]"
        style={{ height }}
      />
      <motion.div
        className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 will-change-[top,opacity]"
        style={{ top, opacity }}
      />
    </div>
  );
}

/* ─── section ─── */

export default function Experiences() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const stats = useMemo<StatItem[]>(() => {
    const allTags = new Set<string>();
    let achievements = 0;
    experienceData.forEach((exp) => {
      achievements += exp.points.length;
      exp.tags.forEach((t) => allTags.add(t));
    });
    return [
      {
        value: getCareerYears(experienceData),
        suffix: "+",
        label: "Years Experience",
        icon: HiOutlineBriefcase,
      },
      {
        value: experienceData.length,
        suffix: "",
        label: "Companies",
        icon: HiOutlineBuildingOffice2,
      },
      {
        value: achievements,
        suffix: "+",
        label: "Key Achievements",
        icon: HiOutlineSparkles,
      },
      {
        value: allTags.size,
        suffix: "+",
        label: "Technologies",
        icon: HiOutlineCodeBracket,
      },
    ];
  }, []);

  return (
    <Section
      id="experience"
      ariaLabelledby="experience-heading"
      atmosphere={false}
    >
      <div className="mx-auto w-full max-w-6xl px-1 lg:max-w-7xl">
        <SectionHeader
          id="experience-heading"
          eyebrow="Career Timeline"
          title="Professional"
          titleAccent="Journey"
          subtitle="A curated timeline of roles, impact, and growth — from engineering foundations to full-stack development and mentorship."
        />

        <div className="mb-12 sm:mb-16 lg:mb-20">
          <StatsBar stats={stats} />
        </div>

        <div ref={timelineRef} className="relative">
          <TimelineRail containerRef={timelineRef} />

          <ol className="relative m-0 list-none space-y-8 p-0 sm:space-y-10 lg:space-y-12">
            {experienceData.map((exp, i) => (
              <ExperienceCard
                key={`${exp.company}-${exp.duration}`}
                exp={exp}
                index={i}
                isLast={i === experienceData.length - 1}
              />
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
