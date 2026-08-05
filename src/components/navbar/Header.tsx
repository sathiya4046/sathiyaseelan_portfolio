"use client";

import { useState, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import Sidebar from "./menu/Sidebar";
import MenuList from "./menu/MenuList";
import Dark from "./menu/Dark";

type HeaderProps = {
  toggleTheme: () => void;
  theme: "light" | "dark";
};

export default function Header({ toggleTheme, theme }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();

  const toggleSidebar = useCallback(() => setIsOpen((v) => !v), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className="fixed left-5 right-5 top-5 z-50 sm:left-10 sm:right-10"
      initial={reduceMotion ? false : { y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      style={{
        height: isScrolled ? 70 : 100,
        transition: "height 0.3s ease",
      }}
    >
      <nav className="navbar justify-between lg:hidden" aria-label="Mobile">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} theme={theme} />
        <Dark toggleTheme={toggleTheme} theme={theme} />
      </nav>
      <nav
        data-theme={theme}
        className="navbar relative top-5 mx-auto hidden w-[30rem] cursor-pointer justify-evenly rounded-4xl border-b-2 lg:flex"
        aria-label="Primary"
      >
        <MenuList toggleSidebar={toggleSidebar} theme={theme} />
        <Dark toggleTheme={toggleTheme} theme={theme} />
      </nav>
    </motion.header>
  );
}
