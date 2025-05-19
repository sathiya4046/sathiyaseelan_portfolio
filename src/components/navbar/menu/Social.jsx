import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Social = () => {
  const socialLinks = [
    { 
      icon: <FaLinkedin />, 
      url: "https://www.linkedin.com/in/sathiya4046/",
      tip: "LinkedIn"
    },
    { 
      icon: <FaGithub />, 
      url: "https://github.com/sathiya4046",
      tip: "Github"
    },
    { 
      icon: <FaInstagram />, 
      url: "https://www.instagram.com/_sathiya_4046?igsh=dGlicjRubzN2Z3M5",
      tip: "Instagram"
    },
    { 
      icon: <FaFacebook />, 
      url: "https://www.facebook.com/sathiya.s.mech",
      tip: "Facebook"
    },
    { 
      icon: <IoMdMail />, 
      url: "mailto:sathiya.4046@gmail.com",
      tip: "Mail"
    }
  ];

  return (
    <motion.div 
      className="flex justify-center gap-6 text-xl md:text-3xl"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { staggerChildren: 0.1, delay: 0.5 }
      }}
    >
      {socialLinks.map((link, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ 
            rotate: [0, 10, -10, 0],
            transition: { duration: 0.5 }
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Link
            target='blank'
            to={link.url}
            className="tooltip tooltip-bottom ms-2 p-3 shadow shadow-cyan-400 rounded-full hover:-translate-y-1.5 transform transition duration-500 hover:shadow-xl"
            data-tip={link.tip}
          >
            {link.icon}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Social;