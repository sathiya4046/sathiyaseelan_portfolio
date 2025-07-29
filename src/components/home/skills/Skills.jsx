import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import html from './images/html-5.svg'
import css from './images/css-3.svg'
import bootstrap from './images/bootstrap-5.svg'
import tailwind from './images/tailwind.svg'
import javascript from './images/javascript (2).svg'
import react from './images/react (2).svg'
import next from './images/nextjs.svg'
import node from './images/node.svg'
import express from './images/express.svg'
import java from './images/java-4.svg'
import mysql from './images/mysql.svg'
import mongo from './images/mongo.svg'
import postman from './images/postman-.svg'
import selenium from './images/selenium.svg'


const skills = [
  { svg: html, tip: "HTML" },
  { svg: css, tip: "CSS" },
  { svg: tailwind, tip: "Tailwind CSS" },
  { svg: bootstrap, tip: "Bootstrap" },
  { svg: javascript, tip: "JavaScript" },
  { svg: react, tip: "React.js" },
  { svg: next, tip: "Next.js" },
  { svg: node, tip: "Node.js" },
  { svg: express, tip: "Express.js" },
  { svg: java, tip: "Java" },
  { svg: mysql, tip: "MySQL" },
  { svg: mongo, tip: "MongoDB" },
  { svg: postman, tip: "Postman" },
  { svg: selenium, tip: "Selenium" },
];

const Skills = () => {
  const scrollRef = useRef(null);
  const [width, setWidth] = useState(5);

  useEffect(() => {
    if (scrollRef.current) {
      setWidth(scrollRef.current.scrollWidth);
    }
  }, []);



  return (
    <section className="absolute bottom-0 left-0 right-0">
      <div className="overflow-hidden w-full">
        <motion.div
          ref={scrollRef}
          className="flex w-max gap-8"
          animate={{
            x: [`0`, `-${width / 2}px`],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {[...skills, ...skills].map((skill, index) => (
            <motion.div
              className="h-full py-14 flex-shrink-0"
              whileHover={{
                scale: 1.2,
                rotate: [0, 10, -10, 0],
                transition: { duration: 0.5 },
              }}
              key={index}
            >
              <div
                className={`px-4 py-1 text-5xl lg:text-7xl tooltip tooltip-info ${
                  index % 2 === 0 ? "tooltip-bottom" : "tooltip-top"
                }`}
                data-tip={skill.tip}
              >
                <img
                  src={skill.svg}
                  alt={skill.tip}
                  className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

