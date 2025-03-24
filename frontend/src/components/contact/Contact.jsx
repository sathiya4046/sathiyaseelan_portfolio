import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import Social from '../navbar/menu/Social';
import { motion } from "motion/react"
import { baseUrl } from '../../constant/url';

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
    try{
      await axios.post(`${baseUrl}/message`, values);
      toast.success("Message sent...")
      setValues({
      name:"",
      email:"",
      message:""
    })
    }catch(error){
      toast.error(`Error: ${error}`)
    }
  }

  return (
          <section className="hero h-fit py-28 lg:pt-52">
              <motion.div 
                initial={{opacity:0, scale:0}} 
                whileInView={{opacity:1, scale:1}}
                transition={{duration:1}} 
                className="hero-content w-full justify-around flex-col lg:flex-row">
                <div className="text-center">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Feel free to contact !</h1>
                  <p className="py-6">
                  Let's build something <mark className='bg-gray-200 px-3 rounded-2xl font-bold'>amazing</mark> together
                  </p>
                  <Social/>

                </div>
                <div className="card w-full max-w-sm md:max-w-md xl:max-w-lg shrink-0 ">
                <form className='card-body text-start flex flex-col w-full' onSubmit={handleSubmit}>
                <input 
                  className='mt-3 p-4 border rounded border-gray-400' 
                  type="text" 
                  placeholder='Full Name' 
                  name='name'
                  value={values.name}
                  onChange={onChange}
                />
                <input 
                  className='mt-3 p-4 border rounded border-gray-400' 
                  type="email" 
                  placeholder='Email'
                  name='email'
                  value={values.email}
                  onChange={onChange}
                />
                <textarea 
                  className='mt-3 p-4  border rounded border-gray-400' 
                  placeholder='Message'
                  name='message'
                  rows={4}
                  cols={3}
                  value={values.message}
                  onChange={onChange}
                ></textarea>
                <button type="submit" className="btn btn-neutral mt-3 p-2">Submit</button>
              </form>
                </div>
              </motion.div>
            </section>
  )
}

export default Contact