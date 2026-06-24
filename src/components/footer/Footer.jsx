"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import NameBoard from "../navbar/menu/NameBoard";
import { gradientText } from "../ui/styles";

const Footer = () => {
  return (
    <footer className="relative mt-8 overflow-hidden border-t border-base-content/10 sm:mt-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent" />

      <div className="relative flex flex-col items-center justify-center gap-4 px-4 py-10 text-center sm:flex-row sm:gap-6 sm:py-12">
        <motion.div
          className="text-sm text-base-content/50 sm:text-base"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Copyrights &copy; {new Date().getFullYear()} &rarr;
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
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
    </footer>
  );
};

export default Footer;
