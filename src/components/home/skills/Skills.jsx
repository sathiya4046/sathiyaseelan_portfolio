"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import Section from "../../ui/Section";
import SectionHeader from "../../ui/SectionHeader";
import { EASE_PREMIUM } from "../../ui/motion";

const AWS_BADGE_ID = "e24e624c-9f57-446f-a306-ceab76944583";
const AWS_BADGE_SRC = "/aws-certified-solutions-architect-associate.png";
const AWS_CREDLY_URL = `https://www.credly.com/badges/${AWS_BADGE_ID}/public_url`;

import html from "./images/html-5.svg";
import css from "./images/css-3.svg";
import bootstrap from "./images/bootstrap-5.svg";
import tailwind from "./images/tailwind.svg";
import javascript from "./images/javascript (2).svg";
import react from "./images/react (2).svg";
import next from "./images/nextjs.svg";
import node from "./images/node.svg";
import express from "./images/express.svg";
import java from "./images/java-4.svg";
import mysql from "./images/mysql.svg";
import mongo from "./images/mongo.svg";
import postman from "./images/postman-.svg";
import selenium from "./images/selenium.svg";
import python from "./images/python.svg";
import typescript from "./images/typescript.svg";
import django from "./images/django.svg";

const skills = [
  { svg: html, tip: "HTML" },
  { svg: css, tip: "CSS" },
  { svg: tailwind, tip: "Tailwind CSS" },
  { svg: bootstrap, tip: "Bootstrap" },
  { svg: javascript, tip: "JavaScript" },
  { svg: typescript, tip: "TypeScript" },
  { svg: react, tip: "React.js" },
  { svg: next, tip: "Next.js" },
  { svg: node, tip: "Node.js" },
  { svg: express, tip: "Express.js" },
  { svg: python, tip: "Python" },
  { svg: django, tip: "Django" },
  { svg: java, tip: "Java" },
  { svg: mysql, tip: "MySQL" },
  { svg: mongo, tip: "MongoDB" },
  { svg: postman, tip: "Postman" },
  { svg: selenium, tip: "Selenium" },
];

const rowOne = skills.slice(0, 9);
const rowTwo = skills.slice(9);

const SkillItem = ({ skill }) => (
  <div className="group/skill flex shrink-0 flex-col items-center gap-2 px-4 transition-transform duration-300 hover:-translate-y-2 hover:scale-110 sm:px-6">
    <img
      src={imageUrl(skill.svg)}
      alt={skill.tip}
      width={64}
      height={64}
      loading="lazy"
      decoding="async"
      className="h-11 w-11 object-contain sm:h-14 sm:w-14 lg:h-16 lg:w-16"
    />
    <span className="text-[10px] font-medium uppercase tracking-widest text-base-content/50 transition-colors duration-300 group-hover/skill:text-cyan-600 dark:group-hover/skill:text-cyan-300/80 sm:text-xs">
      {skill.tip}
    </span>
  </div>
);

const MarqueeRow = ({ items, direction, duration }) => {
  const animationClass = direction === "ltr" ? "marquee-ltr" : "marquee-rtl";

  return (
    <div className="marquee-row group/row relative w-full overflow-hidden py-10 sm:py-18">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-base-100 to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-base-100 to-transparent sm:w-28" />

      <div
        className={`flex w-max will-change-transform ${animationClass}`}
        style={{ "--marquee-duration": `${duration}s` }}
      >
        {[0, 1].map((set) => (
          <div
            key={set}
            className="flex shrink-0 items-center gap-4 sm:gap-8 lg:gap-12"
            aria-hidden={set === 1}
          >
            {items.map((skill) => (
              <SkillItem key={`${skill.tip}-${set}`} skill={skill} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const AwsCredlyBadge = () => {
  return (
    <motion.div
      className="relative mx-auto mt-14 w-full max-w-5xl overflow-hidden px-4 sm:mt-16 sm:px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
      }}
    >
      {/* ambient wash */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF9900]/10 blur-3xl sm:h-96 sm:w-96"
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[20%] top-[30%] h-48 w-48 rounded-full bg-[#232F3E]/20 blur-3xl dark:bg-cyan-500/10"
          animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative grid items-center gap-10 rounded-[2rem] border border-base-content/10 bg-base-200/25 p-6 backdrop-blur-xl sm:gap-12 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
        {/* animated border shimmer */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-60"
          style={{
            background:
              "linear-gradient(120deg, transparent 30%, rgba(255,153,0,0.12) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* copy */}
        <div className="relative z-10 space-y-5 text-center lg:text-left">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-[#FF9900]/25 bg-[#FF9900]/10 px-3 py-1.5"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_PREMIUM } },
            }}
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#FF9900]"
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C77700] dark:text-[#FFB84D] sm:text-xs">
              Verified Credential
            </span>
          </motion.div>

          <motion.h3
            className="font-SansOne text-2xl font-bold tracking-tight text-base-content sm:text-3xl lg:text-4xl"
            variants={{
              hidden: { opacity: 0, y: 22 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_PREMIUM } },
            }}
          >
            AWS Certified{" "}
            <span className="bg-gradient-to-r from-[#FF9900] via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Solutions Architect
            </span>
          </motion.h3>

          <motion.p
            className="mx-auto max-w-md text-sm leading-relaxed text-base-content/65 sm:text-base lg:mx-0"
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_PREMIUM } },
            }}
          >
            Associate-level certification validating cloud architecture design,
            high-availability systems, and AWS best practices — verified on Credly.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_PREMIUM } },
            }}
          >
            {["Cloud Architecture", "High Availability", "AWS Best Practices"].map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-base-content/10 bg-base-100/40 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-base-content/55 sm:text-xs"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.a
            href={AWS_CREDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#FF9900]/35 bg-gradient-to-r from-[#FF9900]/15 to-orange-500/10 px-5 py-2.5 text-sm font-semibold text-base-content transition-all duration-300 hover:border-[#FF9900]/55 hover:shadow-lg hover:shadow-[#FF9900]/15"
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_PREMIUM } },
            }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            View on Credly
            <motion.span
              aria-hidden
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.a>
        </div>

        {/* badge stage — local image only */}
        <motion.div
          className="relative z-10 mx-auto flex h-[280px] w-full max-w-[280px] items-center justify-center sm:h-[300px]"
          variants={{
            hidden: { opacity: 0, scale: 0.88 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.7, ease: EASE_PREMIUM },
            },
          }}
        >
          {/* orbital rings */}
          <motion.div
            className="pointer-events-none absolute h-56 w-56 rounded-full border border-[#FF9900]/20 sm:h-64 sm:w-64"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#FF9900]/80 shadow-[0_0_12px_rgba(255,153,0,0.7)]" />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute h-44 w-44 rounded-full border border-dashed border-cyan-400/25 sm:h-52 sm:w-52"
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute bottom-2 right-6 h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute h-64 w-64 rounded-full border border-base-content/5 sm:h-72 sm:w-72"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />

          {/* floating badge image */}
          <motion.a
            href={AWS_CREDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 block"
            aria-label="AWS Certified Solutions Architect – Associate — view on Credly"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 -z-10 m-auto h-40 w-40 rounded-full bg-[#FF9900]/20 blur-2xl" />
            <Image
              src={AWS_BADGE_SRC}
              alt="AWS Certified Solutions Architect – Associate"
              width={224}
              height={224}
              loading="lazy"
              sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 224px"
              className="relative h-44 w-44 object-contain drop-shadow-lg sm:h-52 sm:w-52 lg:h-56 lg:w-56"
            />
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <Section id="skills" ariaLabelledby="skills-heading" atmosphere={false}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          id="skills-heading"
          eyebrow="Tech Stack"
          title="Skills &"
          titleAccent="Technologies"
          subtitle="A comprehensive toolkit spanning front-end, back-end, databases, and quality assurance — built for modern web development."
        />
      </div>

      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 space-y-2 sm:space-y-4">
        <MarqueeRow items={rowOne} direction="ltr" duration={36} />
        <MarqueeRow items={rowTwo} direction="rtl" duration={40} />
      </div>

      <AwsCredlyBadge />
    </Section>
  );
};

export default Skills;
