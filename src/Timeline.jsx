import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TimeLine({ triggerRef }) {
  const lineRef = useRef(null);
  const glowRef = useRef(null);
  const dotRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    const line = lineRef.current;
    const glow = glowRef.current;
    const dot = dotRef.current;

    gsap.set([line, glow, dot], { scaleY: 0, opacity: 0, transformOrigin: 'top center' });

    const showLine = () => {
      gsap.to([line, glow, dot], { opacity: 1, duration: 0.2 });
    };

    const hideLine = () => {
      gsap.to([line, glow, dot], { opacity: 0, duration: 0.5 });
    };

    const timelineTrigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      onEnter: showLine,
      onLeave: hideLine,
      onEnterBack: showLine,
      onLeaveBack: hideLine,
      onUpdate: (self) => {
        const progress = self.progress;

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => hideLine(), 1000);

        gsap.to([line, glow], {
          scaleY: progress,
          ease: 'none',
          duration: 0.1,
        });

        const bounds = triggerRef.current.getBoundingClientRect();
        const lineHeight = bounds.height * progress;

        gsap.to(dot, {
          y: lineHeight,
          ease: 'none',
          duration: 0.1,
        });
      },
    });

    return () => {
      timelineTrigger.kill();
      clearTimeout(timeoutRef.current);
    };
  }, [triggerRef]);

  return (
  <div className="absolute left-2 transform -translate-x-1/2 top-0 h-full w-[4px] z-10">
    <div
      ref={lineRef}
      className="absolute top-30 left-0 w-full bg-gradient-to-b from-cyan-400 to-purple-500 z-20 origin-top"
      style={{ height: '100%' }}
    />
    <div
      ref={glowRef}
      className="absolute top-30 left-0 w-full bg-gradient-to-b from-cyan-400 to-purple-500 blur-md opacity-50 z-10 origin-top"
      style={{ height: '100%' }}
    />
    <div
      ref={dotRef}
      className="absolute w-3 h-3 bg-cyan-400 rounded-full z-30"
      style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }}
    />
  </div>
);
}
