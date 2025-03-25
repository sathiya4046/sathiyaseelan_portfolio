import React from 'react'
import { SiMongodb, SiMysql, SiExpress } from "react-icons/si";
import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaReact,
  FaNodeJs,
  FaJava
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { RiTailwindCssFill } from "react-icons/ri";
import {motion} from 'framer-motion'

const Skills = () => {
  return (
    <div className='flex text-7xl gap-20 mt-2 overflow-x-hidden'>
                <motion.div 
                    initial={{x:0}} 
                    animate={{x:"-100%"}} 
                    transition={{duration:60,repeat:Infinity,ease:"linear"}} 
                    className=" flex shrink-0 gap-20">
                  <FaHtml5 /> <FaCss3Alt /> <IoLogoJavascript /> <FaBootstrap />{" "}
                  <RiTailwindCssFill /> <FaReact /> <FaNodeJs /> <SiExpress /> <FaJava />{" "}
                  <SiMysql /> <SiMongodb />
                </motion.div>
                <motion.div 
                    initial={{x:0}} 
                    animate={{x:"-100%"}} 
                    transition={{duration:60,repeat:Infinity,ease:"linear"}} 
                    className=" flex shrink-0 gap-20">
                  <FaHtml5 /> <FaCss3Alt /> <IoLogoJavascript /> <FaBootstrap />{" "}
                  <RiTailwindCssFill /> <FaReact /> <FaNodeJs /> <SiExpress /> <FaJava />{" "}
                  <SiMysql /> <SiMongodb />
                </motion.div>
    </div>
  )
}

export default Skills