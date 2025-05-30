import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/navbar/Header";
import Home from './components/home/Home'
import Projects from './components/projects/Projects'
import Contact from './components/contact/Contact'
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Education from "./components/education/Education";
import Resume from "./components/resume/Resume";
import { Toaster } from "react-hot-toast";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -50,
    transition: { duration: 0.3 } 
  }
};

function App() {
  const appRef = useRef();
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.gsap-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          },
          duration: 0.8,
          y: 50,
          opacity: 0,
          ease: "power3.out",
          delay: i * 0.1
        });
      });
    }, appRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <main ref={appRef} data-theme={theme} className="font-comfortaa overflow-x-hidden w-[90%] mx-auto">
      <Header 
        toggleTheme={toggleTheme}
        theme={theme} 
      />
      
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/sathiyaseelan_portfolio" element={
            <motion.div
              variants={pageVariants}
              initial={isFirstMount ? "initial" : "initial"}
              animate="animate"
              exit="exit"
              onAnimationComplete={() => setIsFirstMount(false)}
            >
              <Home theme={theme}/>
            </motion.div>
          }/>
          <Route path="/projects" element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Projects />
            </motion.div>
          }/>
          <Route path="/education" element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Education />
            </motion.div>
          }/>
          <Route path="/contact" element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Contact />
            </motion.div>
          }/>
          <Route path="/resume" element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Resume />
            </motion.div>
          }/>
        </Routes>
      </AnimatePresence>

      <Footer />
      <Toaster />
    </main>
  )
}

export default App