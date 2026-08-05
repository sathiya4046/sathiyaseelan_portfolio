"use client";

import {
  memo,
  useEffect,
  useRef,
  type CSSProperties,
} from "react";

export type InteractiveDottedBackgroundProps = {
  /** Resting dot diameter (CSS px) — keep small for fine grid */
  dotSize?: number;
  /** Gap between dot centers (CSS px) */
  spacing?: number;
  /** Inactive dot color */
  dotColor?: string;
  /** Soft wave tint color */
  glowColor?: string;
  /** Water-field radius around cursor (CSS px) */
  rippleRadius?: number;
  /** Wave displacement strength (px) */
  intensity?: number;
  /** How long spawn wakes last (ms) */
  duration?: number;
  /** Soft clear zone under cursor (CSS px) — dots fade out here */
  clearRadius?: number;
  interactive?: boolean;
  maxDpr?: number;
  className?: string;
  style?: CSSProperties;
};

type Ripple = {
  x: number;
  y: number;
  born: number;
  strength: number;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

/**
 * Fine dotted field with smooth water-wave displacement.
 * Under the cursor dots softly disappear (clear zone); around it they
 * undulate like ripples — no oversized glowing blobs.
 */
function InteractiveDottedBackground({
  dotSize = 0.85,
  spacing = 22,
  dotColor,
  glowColor,
  rippleRadius = 180,
  intensity = 7,
  duration = 1400,
  clearRadius = 42,
  interactive = true,
  maxDpr = 1.75,
  className = "",
  style,
}: InteractiveDottedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const ripplesRef = useRef<Ripple[]>([]);
  const lastRippleAt = useRef(0);
  const dotsRef = useRef<{ x: number; y: number }[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const coarse = isCoarsePointer();
    const canInteract = interactive && !reduced;
    const effectiveSpacing = coarse ? Math.max(spacing, 28) : spacing;
    const fieldRadius = coarse ? rippleRadius * 0.8 : rippleRadius;
    const clearR = coarse ? clearRadius * 0.85 : clearRadius;

    const themeRoot = document.documentElement;
    const resolveColors = () => {
      const theme = themeRoot.getAttribute("data-theme") || "light";
      const isDark = theme === "dark";
      return {
        base:
          dotColor ??
          (isDark ? "rgba(148,163,184,0.34)" : "rgba(100,116,139,0.28)"),
        wave:
          glowColor ??
          (isDark ? "rgba(186,230,253,0.7)" : "rgba(14,116,144,0.55)"),
      };
    };
    let colors = resolveColors();

    const rebuildDots = (cssW: number, cssH: number) => {
      const cols = Math.ceil(cssW / effectiveSpacing) + 1;
      const rows = Math.ceil(cssH / effectiveSpacing) + 1;
      const offsetX = (cssW - (cols - 1) * effectiveSpacing) / 2;
      const offsetY = (cssH - (rows - 1) * effectiveSpacing) / 2;
      const dots: { x: number; y: number }[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: offsetX + c * effectiveSpacing,
            y: offsetY + r * effectiveSpacing,
          });
        }
      }
      dotsRef.current = dots;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildDots(w, h);
    };

    const spawnRipple = (x: number, y: number, strength = 1) => {
      const now = performance.now();
      if (now - lastRippleAt.current < 55) return;
      lastRippleAt.current = now;
      ripplesRef.current.push({ x, y, born: now, strength });
      if (ripplesRef.current.length > 6) ripplesRef.current.shift();
    };

    let running = false;
    let needsRedraw = true;

    const draw = (now: number) => {
      running = false;
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      ripplesRef.current = ripplesRef.current.filter(
        (r) => now - r.born < duration
      );

      const mouse = mouseRef.current;
      const dots = dotsRef.current;
      const mouseActive = canInteract && mouse.active;
      const hasRipples = ripplesRef.current.length > 0;
      const t = now * 0.0022;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]!;
        let ox = 0;
        let oy = 0;
        let alpha = 1;
        let tint = 0;

        if (mouseActive) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          // Soft clear zone under pointer — no dots in the center
          if (dist < clearR) {
            const c = dist / clearR;
            // Smoothstep: fully gone in center, fade in at edge
            alpha = c * c * (3 - 2 * c);
            alpha *= alpha;
            if (alpha < 0.04) continue;
          } else if (dist < fieldRadius) {
            const nx = dx / (dist || 1);
            const ny = dy / (dist || 1);
            const falloff = 1 - dist / fieldRadius;
            const envelope = falloff * falloff * (3 - 2 * falloff);

            // Traveling water rings around cursor
            const wave =
              Math.sin(dist * 0.085 - t * 5.5) * 0.55 +
              Math.sin(dist * 0.045 - t * 3.2) * 0.35;

            const amp = intensity * envelope;
            // Radial + slight tangential swirl for fluid feel
            ox += nx * wave * amp;
            oy += ny * wave * amp;
            ox += -ny * wave * amp * 0.25;
            oy += nx * wave * amp * 0.25;

            tint = Math.max(0, envelope * (0.25 + wave * 0.2));
          }
        }

        if (hasRipples) {
          for (let j = 0; j < ripplesRef.current.length; j++) {
            const r = ripplesRef.current[j]!;
            const age = (now - r.born) / duration;
            if (age >= 1) continue;
            const dx = d.x - r.x;
            const dy = d.y - r.y;
            const dist = Math.hypot(dx, dy);
            const waveFront = age * fieldRadius * 1.55;
            const band = dist - waveFront;
            const bandWidth = 36;
            if (Math.abs(band) > bandWidth) continue;

            const ring = 1 - Math.abs(band) / bandWidth;
            const fade = (1 - age) * (1 - age);
            const force = ring * ring * fade * r.strength;
            const nx = dx / (dist || 1);
            const ny = dy / (dist || 1);
            const push = Math.sin(band * 0.12) * intensity * 1.15 * force;

            ox += nx * push;
            oy += ny * push;
            tint = Math.max(tint, force * 0.35);

            // Expanding clears a soft ring too (water trough)
            if (Math.abs(band) < 10) {
              alpha *= 1 - force * 0.55;
            }
          }
        }

        if (alpha < 0.05) continue;

        const px = d.x + ox;
        const py = d.y + oy;
        const size = dotSize * (0.92 + tint * 0.35);

        ctx.beginPath();
        ctx.globalAlpha = alpha * (0.85 + tint * 0.15);
        ctx.fillStyle = tint > 0.08 ? colors.wave : colors.base;
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      const keepGoing =
        !document.hidden &&
        (mouseActive || hasRipples || needsRedraw);

      needsRedraw = false;

      if (keepGoing) {
        running = true;
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    const kick = () => {
      needsRedraw = true;
      if (!running && !document.hidden) {
        running = true;
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      mouseRef.current = { x: clientX, y: clientY, active: true };
      if (canInteract) spawnRipple(clientX, clientY, 0.65);
      kick();
    };

    const onMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onPointerMove(t.clientX, t.clientY);
    };
    const onLeave = () => {
      mouseRef.current.active = false;
      kick();
    };
    const onClick = (e: MouseEvent) => {
      if (canInteract) spawnRipple(e.clientX, e.clientY, 1.2);
      kick();
    };

    const themeObserver = new MutationObserver(() => {
      colors = resolveColors();
      kick();
    });
    themeObserver.observe(themeRoot, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
        running = false;
      } else {
        kick();
      }
    };

    const onResize = () => {
      resize();
      kick();
    };

    resize();
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    if (canInteract) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("mouseleave", onLeave, { passive: true });
      window.addEventListener("click", onClick, { passive: true });
      if (coarse) {
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener("touchend", onLeave, { passive: true });
      }
    }

    kick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
    };
  }, [
    dotSize,
    spacing,
    dotColor,
    glowColor,
    rippleRadius,
    intensity,
    duration,
    clearRadius,
    interactive,
    maxDpr,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-0 h-svh w-screen ${className}`}
      style={style}
    />
  );
}

export default memo(InteractiveDottedBackground);
