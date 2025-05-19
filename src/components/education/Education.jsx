import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const tableVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.section 
      className="lg:w-[80%] lg:mx-auto mx-5 min-h-screen py-28 lg:pt-40"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
    >
      <motion.h1 
        className="text-3xl md:text-4xl text-center font-bold mb-10"
        initial={{ scale: 0.8 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        Education
      </motion.h1>

      <div>
        <motion.div 
          className='overflow-x-auto'
          variants={tableVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <table className="table text-center">
            <thead>
              <tr>
                {['Course', 'College / School', 'Percentage', 'Passed out'].map((header, index) => (
                  <th 
                    key={index}
                    className="p-3 font-SansOne md:text-lg xl:text-xl"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Full Stack web Development','Kgisl Micro College, Coimbatore','Online','2025'],
                ['Web Development','Udemy','Online','2024'],
                ['B.E', 'University College Of Engineering, Chennai', '69.4%', '2015'],
                ['HSC', 'St. Antony’s Higher Secondary School, Trichy', '83%', '2011'],
                ['SSLC', 'St. Antony’s Higher Secondary School, Trichy', '89%', '2009']
              ].map((row, index) => (
                <motion.tr
                  key={index}
                  variants={rowVariants}
                >
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="p-5">{cell}</td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Education;