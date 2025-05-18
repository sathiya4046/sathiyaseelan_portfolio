import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Sidebar from './menu/Sidebar';
import MenuList from './menu/MenuList';
import Dark from './menu/Dark';

const Header = ({ toggleTheme, theme,themeSwitchRef }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  const toggleSidebar = () => setIsOpen(!isOpen);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  return (
    <motion.header 
      className={`fixed top-5 left-5 right-5 sm:left-10 sm:right-10 md:left-15 md:right-15 z-50`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      style={{
        height: isScrolled ? '70px' : '100px',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <nav className="lg:hidden navbar justify-between cursor-pointer">
        <Sidebar 
          isOpen={isOpen}  
          toggleSidebar={toggleSidebar} 
          theme={theme} 
        />
        <Dark 
          toggleTheme={toggleTheme}
          theme={theme} 
          themeSwitchRef={themeSwitchRef}
        />
      </nav>
      <nav 
        data-theme={theme} 
        className="hidden lg:flex relative top-5 justify-evenly rounded-4xl w-[40rem] mx-auto navbar cursor-pointer border-b-2"
      >
        <MenuList  toggleSidebar={toggleSidebar} theme={theme}/>
        <Dark 
        toggleTheme={toggleTheme} 
        theme={theme} 
        themeSwitchRef={themeSwitchRef}
        />
      </nav>
    </motion.header>
  );
};

export default Header;