"use client";

import { motion } from "framer-motion";
import { imageUrl } from "@/lib/imageUrl";
import Section from "../../ui/Section";
import SectionHeader from "../../ui/SectionHeader";

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

const SkillItem = ({ skill, index }) => (
  <motion.div
    className={`group/skill flex shrink-0 flex-col items-center gap-2 px-4 sm:px-6 `}
    data-tip={skill.tip}
    whileHover={{ scale: 1.18, y: -8 }}
    transition={{ type: "spring", stiffness: 300, damping: 18 }}
  >
    <img
      src={imageUrl(skill.svg)}
      alt={skill.tip}
      className="h-11 w-11 object-contain drop-shadow-md transition-all duration-300 group-hover/skill:drop-shadow-[0_8px_24px_rgba(34,211,238,0.35)] sm:h-14 sm:w-14 lg:h-16 lg:w-16"
    />
    <span className="text-[10px] font-medium uppercase tracking-widest text-base-content/50 transition-colors duration-300 group-hover/skill:text-cyan-600 dark:group-hover/skill:text-cyan-300/80 sm:text-xs">
      {skill.tip}
    </span>
  </motion.div>
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
            {items.map((skill, index) => (
              <SkillItem key={`${skill.tip}-${set}`} skill={skill} index={index} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <Section id="skills" ariaLabelledby="skills-heading" atmosphereIntensity="subtle">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Tech Stack"
          title="Skills &"
          titleAccent="Technologies"
          subtitle="A comprehensive toolkit spanning front-end, back-end, databases, and quality assurance — built for modern web development."
        />
        <h2 id="skills-heading" className="sr-only">
          Skills and Technologies
        </h2>
      </div>

      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 space-y-2 sm:space-y-4">
        <MarqueeRow items={rowOne} direction="ltr" duration={36} />
        <MarqueeRow items={rowTwo} direction="rtl" duration={40} />
      </div>
    </Section>
  );
};

export default Skills;
