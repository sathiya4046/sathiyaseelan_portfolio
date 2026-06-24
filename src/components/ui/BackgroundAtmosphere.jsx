"use client";

import { motion } from "framer-motion";

export default function BackgroundAtmosphere({ intensity = "default" }) {
  const orbOpacity = intensity === "subtle" ? "opacity-60" : "opacity-100";

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${orbOpacity}`} aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />
      <motion.div
        className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
        animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-pink-500/8 blur-3xl"
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
