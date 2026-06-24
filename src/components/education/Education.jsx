"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import { glassCard, glassCardHover } from "../ui/styles";
import { fadeUpItem, fadeUpStagger } from "../ui/motion";

const educationData = [
  ["Full Stack web Development", "Kgisl Micro College, Coimbatore", "Online", "2025"],
  ["Web Development", "Udemy", "Online", "2024"],
  ["B.E", "University College Of Engineering, Chennai", "69.4%", "2015"],
  ["HSC", "St. Antony's Higher Secondary School, Trichy", "83%", "2011"],
  ["SSLC", "St. Antony's Higher Secondary School, Trichy", "89%", "2009"],
];

const headers = ["Course", "College / School", "Percentage", "Passed out"];

const Education = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Section id="education" ariaLabelledby="education-heading">
      <motion.div
        ref={ref}
        className="mx-auto w-full max-w-6xl"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeUpStagger}
      >
        <SectionHeader
          eyebrow="Academic Background"
          title="Education"
          titleAccent="& Learning"
          subtitle="A foundation of formal engineering education complemented by continuous upskilling in modern web development."
        />
        <h2 id="education-heading" className="sr-only">
          Education
        </h2>

        <motion.div
          className={`overflow-x-auto ${glassCard} ${glassCardHover}`}
          variants={fadeUpItem}
        >
          <table className="w-full min-w-[36rem] text-center">
            <thead>
              <tr className="border-b border-base-content/10">
                {headers.map((header) => (
                  <th
                    key={header}
                    className="p-3 font-SansOne text-sm font-semibold uppercase tracking-wider text-cyan-400/80 sm:p-4 sm:text-base"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {educationData.map((row, index) => (
                <motion.tr
                  key={index}
                  className="border-b border-base-content/5 transition-colors last:border-0 hover:bg-base-200/30"
                  variants={fadeUpItem}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="p-3 text-sm text-base-content/70 sm:p-5 sm:text-base"
                    >
                      {cell}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default Education;
