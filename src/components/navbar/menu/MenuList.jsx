import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const menuItemVariants = {
  closed: { opacity: 0, x: -50 },
  open: { opacity: 1, x: 0 }
};

const MenuList = ({ toggleSidebar, theme }) => {
  return (
    <motion.div
      initial="closed"
      animate="open"
      variants={{
        open: {
          transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        },
        closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
      }}
    >
      <ul className="font-josefin font-semibold lg:flex gap-5 justify-center items-center lg:text-sm text-2xl tracking-widest lg:space-y-0 space-y-6 lg:px-0 px-10 pt-4 pb-24 lg:pb-0">
        {[
          { path: "/sathiyaseelan_portfolio", text: "Home" },
          { path: "/projects", text: "Projects" },
          { path: "/education", text: "Education" },
          { path: "/resume", text: "Resume" },
          { path: "/contact", text: "Contact" }
        ].map((item, index) => (
          <motion.li
            key={index}
            variants={menuItemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              onClick={toggleSidebar} 
              to={item.path} 
              className="relative group"
            >
              {item.text}
              <span
                className={`absolute group-hover:rounded-2xl left-1/2 -bottom-2 w-0 h-0.5 ${
                  theme === 'dark' ? 'bg-white' : 'bg-black'
                } transform transition-all duration-500 group-hover:w-full group-hover:left-0 group-hover:right-auto group-hover:h-1 group-hover:translate-x-0`}
              ></span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default MenuList;