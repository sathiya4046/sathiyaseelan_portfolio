// import React from 'react'
// import {
//   FaFacebook,
//   FaGithub,
//   FaInstagram,
//   FaLinkedin,

// } from "react-icons/fa";
// import { IoMdMail } from "react-icons/io";
// import {Link} from 'react-router-dom'

// const Social = () => {
//   return (
//     <div dir='ltr' className="flex justify-center gap-6 text-xl md:text-3xl">
//                     <Link
//                       to={"https://www.linkedin.com/in/sathiya4046/"}
//                       className="tooltip tooltip-bottom ms-2 p-3 shadow shadow-cyan-400 rounded-full hover:-translate-y-1.5 transform transition duration-500 hover:shadow-xl"
//                       data-tip="LinkedIn"
//                     >
//                       <FaLinkedin />
//                     </Link>
//                     <Link
//                       to={"https://github.com/sathiya4046"}
//                       className="tooltip tooltip-bottom ms-2 p-3 shadow shadow-cyan-400 rounded-full hover:-translate-y-1.5 transform transition duration-500 hover:shadow-xl"
//                       data-tip="Github"
//                     >
//                       <FaGithub />
//                     </Link>
//                     <Link
//                       to={
//                         "https://www.instagram.com/__sathiya__4046?igsh=dGlicjRubzN2Z3M5"
//                       }
//                       className="tooltip tooltip-bottom ms-2 p-3 shadow shadow-cyan-400 rounded-full hover:-translate-y-1.5 transform transition duration-500 hover:shadow-xl"
//                       data-tip="Instagram"
//                     >
//                       <FaInstagram />
//                     </Link>
//                     <Link
//                       to={"https://www.facebook.com/sathiya.s.mech?mibextid=ZbWKwL"}
//                       className="tooltip tooltip-bottom ms-2 p-3 shadow shadow-cyan-400 rounded-full hover:-translate-y-1.5 transform transition duration-500 hover:shadow-xl"
//                       data-tip="Facebook"
//                     >
//                       <FaFacebook />
//                     </Link>
//                     <a
//                       href="mailto:sathiya.4046@gmail.com"
//                       className="tooltip tooltip-bottom ms-2 p-3 shadow shadow-cyan-400 rounded-full hover:-translate-y-1.5 transform transition duration-500 hover:shadow-xl"
//                       data-tip="Mail"
//                     >
//                       <IoMdMail />
//                     </a>
//                   </div>
//   )
// }

// export default Social


// Social.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Social = () => {
  const socialLinks = [
    { 
      icon: <FaLinkedin />, 
      url: "https://www.linkedin.com/in/sathi/",
      tip: "LinkedIn"
    },
    { 
      icon: <FaGithub />, 
      url: "https://github.com/sathi",
      tip: "Github"
    },
    { 
      icon: <FaInstagram />, 
      url: "https://www.instagram.com/__sathiy?igsh=dGlicjRubzN2Z3M5",
      tip: "Instagram"
    },
    { 
      icon: <FaFacebook />, 
      url: "https://www.facebook.com/sathiya?mibexti",
      tip: "Facebook"
    },
    { 
      icon: <IoMdMail />, 
      url: "mailto:abc@gmail.com",
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