import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
const experienceData = [
  {
    company: 'Jaya info-soft Pvt ltd, Chennai',
    role: 'Web Developer',
    duration: 'Aug 2023 - Present',
    points: [
        'Developed responsive and user-friendly interfaces that work on all devices, ensuring reusable code for future projects.',
        'Collaborated with designers and backend developers to integrate APIs and ensure smooth data flow, validating user input before backend submission.',
        'Implemented RESTful APIs for seamless data communication and real-time updates using Axios to handle HTTP requests and responses.',
        'Maintaining and updating websites by adding new features, improving performance, and fixing bugs.',
        'Ensured 100% mobile optimization by implementing adaptive designs for all device views.',
        'Optimized front-end code, improving application speed and reducing loading time.',
        'Regularly updated websites by adding new features, improving performance, and fixing bugs.'
      
    ],
    direction: 'right'
  },
  {
    company: 'City centre, Cambodia',
    role: 'Customer Support',
    duration: 'Apr 2022 – Jul 2023',
    points: [
      'Handle inbound customer inquiries via phone, email, chat, or social media.',
      'Together with my manager and team head, we listen to their ideas and complete the work very quickly',
      'Coordinate with my team and implement new ideas for the project',
      'Effectively communicate with customers to understand their needs and resolve their issues.',
      'Follow up with customers to ensure their issues are resolved and they are satisfied with the outcome.',
      'Stay up-to-date with product knowledge and customer support best practices.',
      'Ensure high levels of customer satisfaction through excellent service.'
    ],
    direction: 'left'
  },
  {
    company: 'Pesko Engineering Pte Ltd, Singapore',
    role: 'Electrical Fitter',
    duration: 'Dec 2018 – Dec 2019',
    points: [
      'Install and Maintenance of the all electrical work and fitting works',
      'Install the control and distribution panels and calculate utility loads.',
      'Follow the preventive maintenance and update the record.',
      'Attending management meetings & work related issues'
    ],
    direction: 'right'
  },
   {
    company: 'NVH India Auto Parts Pvt Ltd, Chennai',
    role: 'Graduate Engineering Trainee',
    duration: 'Mar 2016 - Mar 2018',
    points: [
      ' To follow the TPM process(5s&3c)',
      'To follow the man power analysis',
      'Provide day to day guidance, management & training for the inspection team. Implement and manage documentation',
      'Maintain team discipline in conjunction with HR legal obligations, compliance & risk management'
    ],
    direction: 'left'
  }
];

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
      className="lg:w-[80%] lg:mx-auto mx-10  py-28 lg:pt-40"
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

