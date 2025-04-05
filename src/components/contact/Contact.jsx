import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Social from '../navbar/menu/Social';
import { motion } from "motion/react"
import emailjs from '@emailjs/browser'

const Contact = () => {

  const [values, setValues]= useState([{
    name:"",
    email:"",
    message:""
  }])

  const onChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = async (e)=>{
    e.preventDefault();
      emailjs.sendForm(import.meta.env.VITE_SERVICE_ID,import.meta.env.VITE_TEMPLATE_ID,e.target,import.meta.env.VITE_PUBLIC_KEY)
      .then((response) => {
          console.log(response)
          toast.success("Message sent...")
          setValues({
          name:"",
          email:"",
          message:""
        })})
      .catch((error)=>{
          toast.error(`Error: ${error}`)
      })
      
  }

  return (
          <section className="h-svh py-38 lg:pt-52">
              <motion.div 
                initial={{opacity:0, scale:0}} 
                whileInView={{opacity:1, scale:1}}
                transition={{duration:1}} 
                className="hero-content mx-auto  w-full justify-around flex-col lg:flex-row">
                <div className="text-center">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Feel free to contact !</h1>
                  <p className="py-6">
                  Let's build something <mark className='bg-gray-200 px-3 rounded-2xl font-bold'>amazing</mark> together
                  </p>
                  <Social/>

                </div>
                <div className="card w-full max-w-sm md:max-w-sm xl:max-w-lg shrink-0 ">
                <form className='card-body flex flex-col w-full' onSubmit={handleSubmit}>
                <input 
                  className='mt-3 p-4 border rounded border-gray-400' 
                  type="text" 
                  placeholder='Full Name' 
                  name='name'
                  value={values.name}
                  onChange={onChange}
                  required
                />
                <input 
                  className='mt-3 p-4 border rounded border-gray-400' 
                  type="email" 
                  placeholder='Email'
                  name='email'
                  value={values.email}
                  onChange={onChange}
                  required
                />
                <textarea 
                  className='mt-3 p-4  border rounded border-gray-400' 
                  placeholder='Message'
                  name='message'
                  rows={4}
                  cols={3}
                  value={values.message}
                  onChange={onChange}
                  required
                ></textarea>
                <button type="submit" className="btn btn-neutral mt-3 p-2">Submit</button>
              </form>
                </div>
              </motion.div>
            </section>
  )
}

export default Contact