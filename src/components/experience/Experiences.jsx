import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { experienceData } from "../../data/experienceData";


const Row = ({ exp, innerRef }) => {
  const [expanded, setExpanded] = useState(false);        
  const extraRef = useRef([]);                               

  const visiblePoints = expanded ? exp.points : exp.points.slice(0, 2);

  useLayoutEffect(() => {
    if (expanded && extraRef.current.length) {
      gsap.fromTo(
        extraRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [expanded]);

  return (
    <section
      ref={innerRef}
      className="container flex flex-col md:flex-row justify-center items-start gap-8 h-fit py-10"
    >
      <div className="shadow shadow-cyan-300 rounded-full cursor-pointer hover:-translate-y-1.5 transform transition duration-500 hover:shadow-xl w-full md:w-1/2 xl:w-1/4 p-6 rounded-lg shadow-md">
        <h3 className="text-lg md:text-xl font-semibold mb-2">{exp.company}</h3>
        <p className="text-md md:text-lg text-gray-500">{exp.duration}</p>
      </div>

      <div className="shadow shadow-cyan-300 rounded-full cursor-pointer hover:-translate-y-1.5 transform transition duration-500 hover:shadow-xl w-full md:w-1/2 xl:w-1/2 p-8 rounded-xl shadow-lg">
        <h4 className="text-lg md:text-xl font-bold mb-6 opacity-0 translate-y-4">
          {exp.role}
        </h4>

        <ul className="space-y-4 list-none">
          {visiblePoints.map((pt, i) => (
            <li
              key={i}
              ref={
                i > 1
                  ? (el) => (extraRef.current[i - 2] = el) 
                  : null
              }
              className="opacity-0 translate-y-3 text-gray-400"
            >
              <span className="mr-2 text-pink-700">▹</span>
              {pt}
            </li>
          ))}
        </ul>

        {exp.points.length > 2 && (
          <button
            onClick={() => setExpanded((p) => !p)}
            className="mt-6 inline-block text-sm font-medium text-pink-700 hover:underline focus:outline-none"
          >
            {expanded ? "Show less ▲" : "Read more ▼"}
          </button>
        )}
      </div>
    </section>
  );
};

export default function Experiences() {
  const rowsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row, i) => {
        gsap.set(row, {
          opacity: 0,
          y: 80,
          zIndex: experienceData.length - i,
        });
        gsap.set(row.querySelectorAll("li, h4"), { opacity: 0, y: 20 });

        ScrollTrigger.create({
          trigger: row,
          start: "top 70%",
          end: "bottom 20%",
          scrub: 0.8,
          onEnter: () => {
            gsap.to(row, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power4.out",
            });
            gsap.to(row.querySelectorAll("h4, li"), {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.6,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(row, { opacity: 0, y: 80, duration: 0.6 });
            gsap.to(row.querySelectorAll("li, h4"), {
              opacity: 0,
              y: 20,
              duration: 0.3,
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="overflow-x-hidden flex flex-col justify-center items-center py-20 scrollbar-hidden h-vh">
      <header className="text-center">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Professional Journey
        </h1>
      </header>

      {experienceData.map((exp, i) => (
        <Row key={i} exp={exp} innerRef={(el) => (rowsRef.current[i] = el)} />
      ))}
    </main>
  );
}