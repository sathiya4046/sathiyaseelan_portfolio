"use client";

import { motion } from "framer-motion";
import { tagChip } from "./styles";

export default function TagChip({ children, index = 0, className = "" }) {
  return (
    <motion.span
      className={`${tagChip} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.06, y: -2 }}
    >
      {children}
    </motion.span>
  );
}
