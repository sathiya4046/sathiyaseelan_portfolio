"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const WATER_SPRING = { stiffness: 22, damping: 18, mass: 1.4 };
const HOVER_SPRING = { stiffness: 28, damping: 24, mass: 1 };

function FloatingOrb({
  smoothX,
  smoothY,
  smoothHover,
  className,
  pullX,
  pullY,
  drift,
  duration,
  delay = 0,
  positionClass,
}) {
  const hoverX = useTransform(
    [smoothX, smoothHover],
    ([x, h]) => (x - 0.5) * pullX * h
  );
  const hoverY = useTransform(
    [smoothY, smoothHover],
    ([y, h]) => (y - 0.5) * pullY * h
  );
  const scale = useTransform(smoothHover, [0, 1], [1, 1.12]);
  const blur = useTransform(smoothHover, [0, 1], [48, 64]);
  const blurFilter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.div
      className={`absolute ${positionClass}`}
      style={{ x: hoverX, y: hoverY, scale }}
    >
      <motion.div
        className="h-full w-full"
        animate={{ x: drift.x, y: drift.y }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      >
        <motion.div
          className={`h-full w-full rounded-full ${className}`}
          style={{ filter: blurFilter }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function BackgroundAtmosphere({
  intensity = "default",
  interactive = true,
}) {
  const rootRef = useRef(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const hover = useMotionValue(0);

  const smoothX = useSpring(pointerX, WATER_SPRING);
  const smoothY = useSpring(pointerY, WATER_SPRING);
  const smoothHover = useSpring(hover, HOVER_SPRING);

  const orbOpacity = intensity === "subtle" ? "opacity-60" : "opacity-100";

  const cursorLeft = useTransform(smoothX, (v) => `${v * 100}%`);
  const cursorTop = useTransform(smoothY, (v) => `${v * 100}%`);
  const cursorOpacity = useTransform(smoothHover, [0, 1], [0, 0.55]);
  const cursorScale = useTransform(smoothHover, [0, 1], [0.5, 1]);

  const gridRotateX = useTransform(
    [smoothY, smoothHover],
    ([y, h]) => (y - 0.5) * -3 * h
  );
  const gridRotateY = useTransform(
    [smoothX, smoothHover],
    ([x, h]) => (x - 0.5) * 3 * h
  );
  const gridX = useTransform(
    [smoothX, smoothHover],
    ([x, h]) => (x - 0.5) * 18 * h
  );
  const gridY = useTransform(
    [smoothY, smoothHover],
    ([y, h]) => (y - 0.5) * 18 * h
  );
  const gridOpacity = useTransform(smoothHover, [0, 1], [0.55, 0.75]);

  useEffect(() => {
    if (!interactive) return;

    const parent = rootRef.current?.parentElement;
    if (!parent) return;

    const onMove = (e) => {
      const rect = parent.getBoundingClientRect();
      pointerX.set((e.clientX - rect.left) / rect.width);
      pointerY.set((e.clientY - rect.top) / rect.height);
    };

    const onEnter = () => hover.set(1);
    const onLeave = () => {
      hover.set(0);
      pointerX.set(0.5);
      pointerY.set(0.5);
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);

    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [interactive, pointerX, pointerY, hover]);

  const orbProps = { smoothX, smoothY, smoothHover };

  return (
    <div
      ref={rootRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden [perspective:1200px] ${orbOpacity}`}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX: gridRotateX,
          rotateY: gridRotateY,
          x: gridX,
          y: gridY,
          opacity: gridOpacity,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: cursorLeft,
          top: cursorTop,
          opacity: cursorOpacity,
          scale: cursorScale,
          background:
            "radial-gradient(circle, rgba(34,211,238,0.12) 0%, rgba(168,85,247,0.06) 40%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      <FloatingOrb
        {...orbProps}
        positionClass="-top-24 left-1/4 h-80 w-80"
        className="h-full w-full bg-cyan-500/10"
        pullX={90}
        pullY={70}
        drift={{ x: [0, 30, -10, 0], y: [0, 45, 20, 0] }}
        duration={14}
        delay={0}
      />
      <FloatingOrb
        {...orbProps}
        positionClass="top-1/3 -right-20 h-96 w-96"
        className="h-full w-full bg-purple-500/10"
        pullX={-75}
        pullY={85}
        drift={{ x: [0, -20, 15, 0], y: [0, -35, -10, 0] }}
        duration={16}
        delay={0.5}
      />
      <FloatingOrb
        {...orbProps}
        positionClass="bottom-20 left-1/3 h-64 w-64"
        className="h-full w-full bg-pink-500/8"
        pullX={60}
        pullY={-55}
        drift={{ x: [0, 18, -12, 0], y: [0, 30, 40, 0] }}
        duration={13}
        delay={1}
      />
      <FloatingOrb
        {...orbProps}
        positionClass="top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2"
        className="h-full w-full bg-cyan-400/5"
        pullX={45}
        pullY={45}
        drift={{ x: [0, -25, 25, 0], y: [0, 20, -20, 0] }}
        duration={18}
        delay={0.3}
      />
    </div>
  );
}
