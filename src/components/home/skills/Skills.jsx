import { motion, useAnimationControls } from 'framer-motion';
import html from './images/html-5.svg'
import css from './images/css-3.svg'
import bootstrap from './images/bootstrap-5.svg'
import tailwind from './images/tailwind.svg'
import javascript from './images/javascript (2).svg'
import react from './images/react (2).svg'
import node from './images/node.svg'
import express from './images/express.svg'
import java from './images/java-4.svg'
import mysql from './images/mysql.svg'
import mongo from './images/mongo.svg'
import postman from './images/postman-.svg'
import selenium from './images/selenium.svg'

import { useEffect, useRef } from 'react';

const skills = [ html, css ,tailwind ,bootstrap ,javascript ,react ,node ,express ,java ,mysql ,mongo ,postman ,selenium ];

const Skills = () => {
  const controls = useAnimationControls();
  const containerRef = useRef(null);

  const duration = 10;
  const xOffset = -20;

  useEffect(() => {
    controls.start({
      x: ["0%", `${xOffset}%`],
      transition: {
        duration: duration,
        repeat: Infinity,
        ease: "linear",
      },
    });
  }, [controls, xOffset]);



  return (
    <section className="absolute bottom-0 left-0 right-0">
      <div ref={containerRef} className=" hide-scrollbar overflow-x-hidden my-10 ">
        <motion.div
          className="flex gap-8 w-max"
          animate={controls}
          onMouseEnter={() => controls.stop()}
          onMouseLeave={() => controls.start({
            x: ["0%", `${xOffset}%`],
            transition: {
              duration: duration,
              repeat: Infinity,
              ease: "linear",
            },
          })}
        >
          {[...skills, ...skills].map((skill, index) => (
            <motion.div
              className="h-full flex-shrink-0 overflow-hidden"
              whileHover={{
                y: -10,
                rotate: -1,
                transition: { type: "spring", stiffness: 300 },
              }}
              key={index}
            >
              <div className="p-6 text-5xl lg:text-7xl">
                <img 
                  src={skill} 
                  alt="skill" 
                  className="w-16 h-16 lg:w-20 lg:h-20 object-contain drop-shadow-[0_0_0_rgba(0,0,0,0)]"
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