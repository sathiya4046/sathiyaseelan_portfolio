"use client";

import sathiya from "../../assets/sath.jpg";
import { imageUrl } from "@/lib/imageUrl";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import NameBoard from "../navbar/menu/NameBoard";
import Skills from "./skills/Skills";
import Experiences from "../experience/Experiences";
import BackgroundAtmosphere from "../ui/BackgroundAtmosphere";
import { EASE_PREMIUM, SPRING_SOFT } from "../ui/motion";
import { glassCard, gradientText } from "../ui/styles";

const Home = () => {
  const [text] = useTypewriter({
    words: [
      "Full Stack Web-Developer",
      "Front-end Developer",
      "Back-end Developer",
      "Freelancer",
      "Software Tester",
    ],
    loop: true,
    typeSpeed: 200,
    deleteSpeed: 150,
  });

  return (
    <motion.main>
      {/* Hero */}
      <section className="relative flex min-h-svh flex-col overflow-hidden">
        <BackgroundAtmosphere intensity="subtle" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-10 px-2 pt-28 sm:gap-12 sm:px-4 sm:pt-32 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:pt-36">
          <motion.div
            className="flex w-full flex-col items-center gap-3 text-center sm:gap-4 lg:w-1/2 lg:items-start lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          >
            <motion.div
              className="mb-1 flex items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/60" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-400/90 sm:text-sm">
                Hello, this is
              </span>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            >
              <NameBoard
                name={"Sathiyaseelan"}
                className="text-3xl font-extrabold tracking-wider font-SansOne sm:text-4xl md:text-5xl lg:text-6xl"
                colors={["#8e44ad", "#e91e63", "#f39c12", "#8e44ad"]}
              />
            </motion.div>

            <motion.h1
              className="min-h-[3.5rem] w-full text-2xl font-protest tracking-widest text-base-content sm:min-h-16 sm:text-3xl md:text-4xl lg:text-5xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <span className={gradientText}>{text}</span>
              <Cursor cursorStyle="|" />
            </motion.h1>

            <motion.p
              className="max-w-xl font-josefin text-sm leading-relaxed text-base-content/65 sm:text-base lg:pt-4 lg:text-lg"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, ease: EASE_PREMIUM }}
            >
              Ready to contribute my innovative ideas to the dynamic world and
              improve my knowledge through continuous learning and team work...
            </motion.p>

            <motion.div
              className="mt-2 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              <motion.a
                href="/services"
                className="inline-flex items-center rounded-xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-6 py-3 text-sm font-semibold text-base-content backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING_SOFT}
              >
                View Projects
              </motion.a>
              <motion.a
                href="/contact"
                className="inline-flex items-center rounded-xl border border-base-content/15 bg-base-200/30 px-6 py-3 text-sm font-medium text-base-content/80 backdrop-blur-sm transition-all duration-300 hover:border-base-content/25 hover:bg-base-200/50 hover:text-base-content"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING_SOFT}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex w-full shrink-0 justify-center lg:w-1/2"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.3 }}
          >
            <div className="absolute inset-0 m-auto h-56 w-56 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-3xl sm:h-72 sm:w-72 lg:h-96 lg:w-96" />
            <motion.div
              className={`relative rounded-full ${glassCard} p-2 sm:p-3`}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <motion.img
                src={imageUrl(sathiya)}
                alt="Sathiyaseelan"
                className="h-52 w-52 rounded-full object-cover sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80"
                whileHover={{ rotate: 6 }}
                whileTap={{ scale: 0.98 }}
                transition={SPRING_SOFT}
              />
              
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Skills />
      <Experiences />
    </motion.main>
  );
};

export default Home;
