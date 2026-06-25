"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import NameBoard from "../navbar/menu/NameBoard";
import { EASE_PREMIUM } from "../ui/motion";

const socialLinks = [
  {
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/sathiya4046/",
    label: "LinkedIn",
  },
  {
    icon: FaGithub,
    url: "https://github.com/sathiya4046",
    label: "GitHub",
  },
  {
    icon: FaInstagram,
    url: "https://www.instagram.com/_sathiya_4046?igsh=dGlicjRubzN2Z3M5",
    label: "Instagram",
  },
  {
    icon: FaFacebook,
    url: "https://www.facebook.com/sathiya.s.mech",
    label: "Facebook",
  },
  {
    icon: IoMdMail,
    url: "mailto:sathiya.4046@gmail.com",
    label: "Email",
  },
];

const Footer = () => {
  return (
    <footer className="relative mt-8 overflow-hidden border-t border-base-content/10 sm:mt-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent" />

      <div className="relative flex flex-col items-center justify-center gap-6 px-4 py-10 sm:py-12">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE_PREMIUM }}
        >
          {socialLinks.map(({ icon: Icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-base-content/20 text-base-content/60 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-cyan-600 dark:hover:text-cyan-300 sm:h-10 sm:w-10"
            >
              <Icon className="text-base" />
            </a>
          ))}
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-6">
          <motion.div
            className="text-sm text-base-content/50 sm:text-base"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_PREMIUM, delay: 0.1 }}
          >
            Copyrights &copy; {new Date().getFullYear()} &rarr;
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_PREMIUM, delay: 0.15 }}
          >
            <Link className="bg-clip-text text-transparent shrink-0" href="/">
              <NameBoard
                name={"Sathiyaseelan"}
                className="text-lg font-extrabold tracking-wider font-SansOne sm:text-xl"
                colors={["#8e44ad", "#e91e63", "#f39c12", "#8e44ad"]}
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
