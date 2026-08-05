"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import sathiya from "@/assets/image.png";
import NameBoard from "../navbar/menu/NameBoard";
import { EASE_PREMIUM, SPRING_SOFT } from "../ui/motion";
import { glassCard, gradientText } from "../ui/styles";

const Skills = dynamic(() => import("./skills/Skills"), {
  loading: () => <SectionSkeleton label="Loading skills" />,
});

const Experiences = dynamic(() => import("../experience/Experiences"), {
  loading: () => <SectionSkeleton label="Loading experience" />,
});

function SectionSkeleton({ label }: { label: string }) {
  return (
    <div
      className="mx-auto my-16 h-48 w-full max-w-5xl animate-pulse rounded-3xl bg-base-200/40"
      role="status"
      aria-label={label}
    />
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [text] = useTypewriter({
    words: [
      "Full Stack Web-Developer",
      "Front-end Developer",
      "Back-end Developer",
      "Freelancer",
      "Software Tester",
    ],
    loop: true,
    typeSpeed: reduceMotion ? 40 : 120,
    deleteSpeed: reduceMotion ? 20 : 80,
  });

  return (
    <>
      <section
        className="relative flex min-h-svh flex-col overflow-hidden"
        aria-label="Introduction"
      >
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-10 px-2 pt-28 sm:gap-12 sm:px-4 sm:pt-32 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:pt-36">
          <motion.div
            className="flex w-full flex-col items-center gap-3 text-center sm:gap-4 lg:w-1/2 lg:items-start lg:text-left"
            initial={reduceMotion ? false : { opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: EASE_PREMIUM }}
          >
            <div className="mb-1 flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/60" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-400/90 sm:text-sm">
                Hello, this is
              </span>
            </div>

            <NameBoard
              name="Sathiyaseelan"
              className="font-SansOne text-3xl font-extrabold tracking-wider sm:text-4xl md:text-5xl lg:text-6xl"
              colors={["#8e44ad", "#e91e63", "#f39c12", "#8e44ad"]}
            />

            <h1 className="min-h-[3.25rem] w-full font-protest text-xl tracking-widest text-base-content sm:min-h-14 sm:text-2xl md:text-3xl lg:text-4xl">
              <span className={gradientText}>{text}</span>
              <Cursor cursorStyle="|" />
            </h1>

            <p className="max-w-xl font-josefin text-sm leading-relaxed text-base-content/65 sm:text-base lg:pt-4 lg:text-lg">
              Ready to contribute my innovative ideas to the dynamic world and
              improve my knowledge through continuous learning and team work...
            </p>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                href="/services"
                className="inline-flex items-center rounded-xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-6 py-3 text-sm font-semibold text-base-content transition-transform duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl border border-base-content/15 bg-base-200/30 px-6 py-3 text-sm font-medium text-base-content/80 transition-transform duration-300 hover:-translate-y-0.5 hover:border-base-content/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/30"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative flex w-full shrink-0 justify-center lg:w-1/2"
            initial={reduceMotion ? false : { scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 90, delay: 0.15 }}
          >
            <div className="absolute inset-0 m-auto h-56 w-56 rounded-full bg-gradient-to-br from-cyan-500/15 to-purple-500/15 blur-3xl sm:h-72 sm:w-72 lg:h-96 lg:w-96" />
            <div className={`relative rounded-full ${glassCard} p-2 sm:p-3`}>
              <motion.div
                className="overflow-hidden rounded-full"
                whileHover={reduceMotion ? undefined : { y: -4, rotate: 10}}
                transition={SPRING_SOFT}
              >
                <Image
                  src={sathiya}
                  alt="Portrait of Sathiyaseelan, Full Stack Web Developer"
                  width={320}
                  height={320}
                  priority
                  sizes="(max-width: 640px) 208px, (max-width: 1024px) 288px, 320px"
                  className="h-52 w-52 rounded-full object-cover sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Skills />
      <Experiences />
    </>
  );
}
