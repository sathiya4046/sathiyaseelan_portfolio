import React, { useEffect } from 'react'
import sathiya from '../../assets/sath.jpg'
import Typewriter from 'typewriter-effect';
import Skills from './skills/Skills';
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return ( 
      <main>
        <div className="flex flex-col justify-center items-center h-svh">
            <div className="hero-content flex-col lg:flex-row py-12 lg:py-24">
                  <div  data-aos="fade-right"
                        data-aos-offset="300"
                        data-aos-duration="600" 
                        data-aos-easing="ease-in-sine" 
                        className='lg:w-1/2 flex flex-col items-start gap-2'>
                    <em className="text-sm tracking-widest">Hello, this is</em>
                    <span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent text-5xl font-bold pb-2 font-poppins">Sathiyaseelan</span>
                    <h3 className='text-3xl sm:text-4xl lg:text-5xl tracking-widest font-protest'>
                      <Typewriter
                      options={{
                        strings: ['Full stack developer', 'Frontend developer', 'Backend developer'],
                        autoStart: true,
                        loop: true,
                        cursor:"!"
                      }}
                    /></h3>
                    <p className="font-josefin py-3 text-justify lg:text-start">
                    I am ready to contribute my innovative ideas to the dynamic field
                    and improve my knowledge through continuous learning and team
                    work...
                    </p>
                  </div>
                  <div  data-aos="fade-left"
                        data-aos-offset="300"
                        data-aos-duration="600" 
                        data-aos-easing="ease-in-sine" 
                        className='lg:w-1/2 mx-auto flex justify-center '>
                    <img
                    src={sathiya}
                    className="max-w-sm md:mx-w-lg rounded-full w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 hover:shadow-2xl hover:scale-105 transform transition-all duration-500" 
                    />
                  </div>
            </div>
            <Skills/>
        </div>
      </main>
  )
}

export default Home