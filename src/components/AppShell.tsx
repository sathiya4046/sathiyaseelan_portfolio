"use client";

import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Header from "./navbar/Header";
import Footer from "./footer/Footer";
import InteractiveDottedBackground from "./ui/InteractiveDottedBackground";
import { PAGE_TRANSITION } from "./ui/motion";

type Theme = "light" | "dark";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initial: Theme =
      stored === "light" || stored === "dark"
        ? stored
        : document.documentElement.getAttribute("data-theme") === "dark"
          ? "dark"
          : "light";
    setTheme(initial);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme, ready]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <div
      data-theme={theme}
      className="relative min-h-svh w-full overflow-x-clip bg-base-100 font-comfortaa text-base-content transition-colors duration-500"
    >
      <InteractiveDottedBackground
        spacing={22}
        dotSize={0.85}
        rippleRadius={190}
        intensity={7}
        clearRadius={44}
        duration={1400}
        interactive={!reduceMotion}
      />

      <div className="relative z-10">
        <Header toggleTheme={toggleTheme} theme={theme} />

        <div className="px-4 sm:px-6 lg:px-0">
          {reduceMotion ? (
            <main id="main-content">{children}</main>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.main
                id="main-content"
                key={pathname}
                variants={PAGE_TRANSITION}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {children}
              </motion.main>
            </AnimatePresence>
          )}

          <Footer />
        </div>
      </div>

      <Toaster
        toastOptions={{
          duration: 3500,
          style: {
            background: theme === "dark" ? "#1e293b" : "#f8fafc",
            color: theme === "dark" ? "#f1f5f9" : "#0f172a",
            border:
              theme === "dark"
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.08)",
          },
        }}
      />
    </div>
  );
}
