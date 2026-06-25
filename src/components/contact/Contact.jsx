"use client";

import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Social from '../navbar/menu/Social';
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser'
import { EASE_PREMIUM, SPRING_GENTLE } from '../ui/motion'
import { gradientText } from '../ui/styles'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  const [values, setValues] = useState({
    name: "",
    email: "",
    message: ""
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.55, ease: EASE_PREMIUM }
    }
  }

  const slideInVariants = (direction) => ({
    hidden: { opacity: 0, x: direction === 'left' ? -48 : 48 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: SPRING_GENTLE
    }
  })

  const onChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault();
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_SERVICE_ID,
      process.env.NEXT_PUBLIC_TEMPLATE_ID,
      e.target,
      process.env.NEXT_PUBLIC_PUBLIC_KEY
    )
      .then(() => {
        toast.success("Message sent...", { icon: '✉️' })
        setValues({
          name: "",
          email: "",
          message: ""
        })
      })
      .catch((error) => {
        toast.error(`Error: ${error}`, { icon: '❌' })
      })
  }

  return (
    <motion.section 
      className="h-svh py-28 lg:pt-40"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div className="hero-content mx-auto justify-around items-center h-full flex-col lg:flex-row">
        <motion.div 
          className="text-center"
          variants={slideInVariants('left')}
        >
          <motion.h1 
            className="mb-6 text-3xl font-bold text-base-content sm:text-4xl lg:text-5xl"
            variants={itemVariants}
          >
            Feel free to contact !
          </motion.h1>
          <motion.p 
            className="py-6 text-lg text-base-content/75"
            variants={itemVariants}
          >
            Let&apos;s build something <motion.mark 
              className={`rounded-2xl bg-base-200 px-3 font-bold ${gradientText}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: EASE_PREMIUM }}
            >
              amazing
            </motion.mark> together
          </motion.p>
          <motion.div variants={itemVariants}>
            <Social />
          </motion.div>
        </motion.div>

        <motion.div 
          className="card w-full max-w-sm md:max-w-sm xl:max-w-lg shrink-0"
          variants={slideInVariants('right')}
        >
          <form className='card-body flex flex-col w-full' onSubmit={handleSubmit}>
            {['name', 'email', 'message'].map((field, index) => (
              <motion.div
                key={field}
                variants={itemVariants}
                custom={index}
              >
                {field === 'message' ? (
                  <textarea
                    className="mt-3 w-full rounded-lg border border-base-content/20 bg-base-100 p-4 text-base-content transition-all duration-300 placeholder:text-base-content/40 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                    placeholder='Message'
                    name={field}
                    rows={4}
                    value={values[field]}
                    onChange={onChange}
                    required
                  />
                ) : (
                  <input
                    className="mt-3 w-full rounded-lg border border-base-content/20 bg-base-100 p-4 text-base-content transition-all duration-300 placeholder:text-base-content/40 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                    type={field === 'email' ? 'email' : 'text'}
                    placeholder={field === 'name' ? 'Full Name' : 'Email'}
                    name={field}
                    value={values[field]}
                    onChange={onChange}
                    required
                  />
                )}
              </motion.div>
            ))}

            <motion.button
              type="submit"
              className="btn btn-neutral mt-3 p-2 text-base-100 transition-transform duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: EASE_PREMIUM }}
              variants={itemVariants}
            >
              Submit
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default Contact