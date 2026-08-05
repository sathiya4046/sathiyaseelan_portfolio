"use client";

import { memo } from "react";

type BackgroundAtmosphereProps = {
  intensity?: "default" | "subtle";
  interactive?: boolean;
};

/**
 * Lightweight CSS-only atmosphere — no pointer springs / filter thrashing.
 * Visual identity preserved with soft floating orbs + subtle grid.
 */
function BackgroundAtmosphere({
  intensity = "default",
  interactive: _interactive = false,
}: BackgroundAtmosphereProps) {
  const orbOpacity = intensity === "subtle" ? "opacity-50" : "opacity-80";

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${orbOpacity}`}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl motion-safe:animate-[float-a_14s_ease-in-out_infinite] transform-gpu" />
      <div className="absolute top-1/3 -right-16 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl motion-safe:animate-[float-b_18s_ease-in-out_infinite] transform-gpu" />
      <div className="absolute bottom-16 left-1/3 h-56 w-56 rounded-full bg-pink-500/8 blur-3xl motion-safe:animate-[float-c_12s_ease-in-out_infinite] transform-gpu" />
    </div>
  );
}

export default memo(BackgroundAtmosphere);
