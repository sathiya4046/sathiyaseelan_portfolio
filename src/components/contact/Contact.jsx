import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Social from '../navbar/menu/Social';
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser'

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
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  const slideInVariants = (direction) => ({
    hidden: { opacity: 0, x: direction === 'left' ? -100 : 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: 'spring', stiffness: 80 }
    }
  })

  const onChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault();
    emailjs.sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, e.target, import.meta.env.VITE_PUBLIC_KEY)
      .then(() => {
        toast.success("Message sent...", {
          icon: '✉️',
          style: {
            background: '#333',
            color: '#fff',
          }
        })
        setValues({
          name: "",
          email: "",
          message: ""
        })
      })
      .catch((error) => {
        toast.error(`Error: ${error}`, {
          icon: '❌',
          style: {
            background: '#ff4444',
            color: '#fff',
          }
        })
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
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            Feel free to contact !
          </motion.h1>
          <motion.p 
            className="py-6 text-lg"
            variants={itemVariants}
          >
            Let's build something <motion.mark 
              className='bg-gray-200 px-3 rounded-2xl font-bold'
              whileHover={{ scale: 1.1 }}
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
                    className='mt-3 p-4 w-full border rounded border-gray-400 transition-all'
                    placeholder='Message'
                    name={field}
                    rows={4}
                    value={values[field]}
                    onChange={onChange}
                    required
                  />
                ) : (
                  <input
                    className='mt-3 p-4 w-full  border rounded border-gray-400 transition-all'
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
              className="btn btn-neutral mt-3 p-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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