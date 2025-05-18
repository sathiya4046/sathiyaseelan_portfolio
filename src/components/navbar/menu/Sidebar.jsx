import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbMenu } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import MenuList from './MenuList';
import Social from './Social';
import NameBoard from './NameBoard';

const sidebarVariants = {
  open: { y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  closed: { y: '-100%', transition: { duration: 0.5 } }
};

const overlayVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 }
};

const Sidebar = ({isOpen,toggleSidebar, theme }) => {

  return (
    <div className="relative">
      <motion.div
        whileHover={{scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring',duration:3 }}
      >
        <TbMenu 
          data-theme={theme} 
          onClick={toggleSidebar} 
          className='p-3 shadow shadow-cyan-300 rounded-full text-5xl cursor-pointer hover:-translate-y-1.5 transform transition duration-500 hover:shadow-xl'
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-black/50 z-0"
              onClick={toggleSidebar}
            />
            
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="z-10 fixed top-0 left-0 w-full h-full"
              data-theme={theme}
              dir='rtl'
            >
              <div className="flex font-semibold justify-between items-center p-10 px-10">
                <div className="bg-clip-text text-transparent">
                  <NameBoard 
                    name={"Sathiyaseelan"}
                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wider font-SansOne"
                    colors={["#8e44ad", "#e91e63", "#f39c12", "#8e44ad"]}
                  />
                </div>
                <motion.div
                  whileHover={{scale:1 }}
                  transition={{duration:1 }}
                >
                  <RxCross1 
                    onClick={toggleSidebar} 
                    className='p-3 shadow shadow-cyan-300 rounded-full text-5xl cursor-pointer hover:-translate-y-1.5 transform transition duration-500 hover:shadow-xl' 
                  />
                </motion.div>
              </div>
              <MenuList toggleSidebar={toggleSidebar} theme={theme} />
              <Social />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;