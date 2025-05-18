import sathiya from '../../assets/sath.jpg'
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import NameBoard from '../navbar/menu/NameBoard';
import Skills from './skills/Skills';
import Experiences from '../../Experiences';

const Home = () => {

  const [text] = useTypewriter({
    words: ['Full Stack web Developer', 'Frontend Developer', 'Backend Developer','Freelancer'],
    loop: true,
    typeSpeed: 150,
    deleteSpeed: 100,
  });

  return (
    <motion.main>
      <div className="flex flex-col h-svh">
        <div className="hero-content flex-col container lg:flex-row justify-center items-center h-full">
          <motion.div 
            className="lg:w-1/2 flex flex-col items-start gap-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              className="text-sm tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hello, this is
            </motion.p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              <NameBoard 
                name={"Sathiyaseelan"}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wider font-SansOne"
                colors={["#8e44ad", "#e91e63", "#f39c12", "#8e44ad"]}
              />
            </motion.div>

            <motion.h3 
              className="text-3xl sm:text-4xl lg:text-5xl tracking-widest font-protest h-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {text}
              <Cursor cursorStyle="!" />
            </motion.h3>

            <motion.p 
              className="font-josefin lg:pt-8 pt-2 text-justify lg:text-start"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Ready to contribute my innovative ideas to the dynamic world
              and improve my knowledge through continuous learning and team
              work...
            </motion.p>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 mx-auto flex justify-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <motion.img
              src={sathiya}
              className="max-w-sm md:max-w-lg rounded-full w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 shadow-2xl"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </motion.div>
        </div>
        <Skills/>
      </div>
      <Experiences/>
    </motion.main>
  );
};

export default Home