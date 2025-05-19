import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experienceData } from '../../data/experienceData';

const ExperienceItem = ({ experience, scrollDirection}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: { 
      opacity: 0, 
      y: scrollDirection > 0 ? 50 : -50,
      x: experience.direction === 'right' ? 100 : -100
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      y: scrollDirection > 0 ? -50 : 50,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.4
      }
    }
  };

  return (
    <motion.dl
      ref={ref}
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ 
          duration: 0.5,
          ease: 'easeInOut'
      }}
      variants={variants}
      className={`space-y-2 mt-3 p-4 mx-auto text-justify`}
    >
      <dt>
        <h5 className='text-xl md:text-2xl'>{experience.company}</h5>
      </dt>
      <dd className='font-semibold'>{experience.role}</dd>
      <dd>
        <small className='font-josefin'>{experience.duration}</small>
      </dd>
      <hr />
      <dd>
        <ul className='space-y-4 font-mono text-justify'>
          {experience.points.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: inView ? i * 0.1 : 0,
                duration: 0.3,
                ease: 'easeInOut'
              }}
            >
              <span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                ==&gt;
              </span>
              {point}
            </motion.li>
          ))}
        </ul>
      </dd>
    </motion.dl>
  );
};


const Experience = () => {

  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState(1);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const updateScrollDirection = (latest) => {
      if (latest > prevScrollY.current) {
        setScrollDirection(1); 
      } else {
        setScrollDirection(-1);
      }
      prevScrollY.current = latest;
    };

    const unsubscribe = scrollY.on("change", updateScrollDirection);

    return () => {
      unsubscribe(); 
    };
  }, [scrollY]);


  return (
    <motion.section
      className="lg:w-[80%] lg:mx-auto py-28 lg:pt-40"
    >
      <motion.h1
        className="text-3xl md:text-4xl text-center font-bold mb-10"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        Experience
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-10">
        {experienceData.map((experience, index) => (
          <ExperienceItem
            key={index}
            experience={experience}
            scrollDirection={scrollDirection}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default Experience;

