"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Header from "./navbar/Header";
import Footer from "./footer/Footer";
import { Toaster } from "react-hot-toast";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.3 },
  },
};

export default function AppShell({ children }) {
  const appRef = useRef();
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".gsap-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
          duration: 0.8,
          y: 50,
          opacity: 0,
          ease: "power3.out",
          delay: i * 0.1,
        });
      });
    }, appRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const lineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: lineRef.current,
        start: "top center",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.to(lineRef.current, {
      height: "100%",
      ease: "none",
    });
  }, []);

  return (
    <main
      ref={appRef}
      data-theme={theme}
      className="font-comfortaa overflow-x-hidden w-[90%] mx-auto"
    >
      <Header toggleTheme={toggleTheme} theme={theme} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial={isFirstMount ? "initial" : "initial"}
          animate="animate"
          exit="exit"
          onAnimationComplete={() => setIsFirstMount(false)}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <Footer />
      <Toaster />
    </main>
  );
}
