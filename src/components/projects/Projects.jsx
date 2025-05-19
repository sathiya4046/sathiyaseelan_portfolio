import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ecom from "../../assets/images/ecom.png";
import chat from "../../assets/images/chat.png";
import netflix from "../../assets/images/netflix.png";
import notes from "../../assets/images/notes thumbnail.png";
import xClone from "../../assets/images/x-clone.png";

const ProjectCard = ({ project }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      },
    },
    exit: { opacity: 0, y: -50 }
  };

  const listVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    hidden: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -20 },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "exit"}
      className="relative md:max-w-md mx-auto sm:mx-0 overflow-hidden space-y-4 shadow-lg rounded-xl p-4"
    >
      <motion.img
        src={project.image}
        alt="Project"
        className="rounded-lg w-full h-48 object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      />

      <div>
        <h1 className="text-xl md:text-2xl font-bold">{project.heading}</h1>
        <motion.small
          className="font-josefin text-gray-300"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          {project.stack}
        </motion.small>
      </div>

      <motion.div
        className="mb-15"
        variants={listVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {project.desc.map((list, index) => (
          <motion.ul
            key={index}
            className="text-justify font-mono"
            variants={itemVariants}
          >
            <li className="mb-2">
              <em>
                <span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  ==&gt;
                </span>{" "}
                {list}
              </em>
            </li>
          </motion.ul>
        ))}
      </motion.div>

      <motion.a
        href={project.view}
        className="absolute bottom-0 w-full btn btn-neutral mt-3 p-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        View Project
      </motion.a>
    </motion.div>
  );
};


const Projects = () => {

  const lists = [
    {
      heading: "Twitter Clone",
      stack:
        "Reactjs,Material UI, Bootstrap, Nodejs, Expressjs, MongoDB, JWT, TanStack Query",
      image: xClone,
      view: "https://x-clone-dnl2.onrender.com/",
      desc: [
        "Developed a MERN complete full stack social media website, user can do crud operation with the help of tanstack",
        "Dynamic and responsive user interfaces using React.js, Material UI and Bootstrap ensuring compatibility across various devices and screen sizes.",
        "Managed application state using React’s built-in state management and hooks for efficient data handling and component updates.",
        "Enabled user login with authentication checks and session management.",
      ],
    },
    {
      heading: "Notes App",
      stack: "Reactjs, Bootstrap, Nodejs, Expressjs, MySql, MongoDB, JWT",
      image: notes,
      view: "https://notes-mern-hlxh.onrender.com/",
      desc: [
        "Facilitated user registration with input validation and secure data handling.",
        "Enabled user login with authentication checks and session management.",
        "Enabled users to create, read, update, and delete notes with a responsive and intuitive interface.",
        "Designed and implemented a MySQL database schema for efficient storage and retrieval of user notes.",
        "Implemented secure user registration and login functionality using JWT for authentication and session management.",
        "Developed RESTful APIs to handle data operations between the frontend and backend efficiently.",
      ],
    },
    {
      heading: "Netflix-Clone",
      stack: "Reactjs,Bootstrap,Css",
      image: netflix,
      view: "https://netflix-clone-eight-nu-57.vercel.app/",
      desc: [
        "Built the entire user interface using React.js, focusing on dynamic rendering",
        "Designed a responsive UI using CSS and media queries, ensuring a seamless experience across mobile, tablet, and desktop devices.",
        "Focused on optimizing user experience with smooth transitions, animations, and loading optimizations.",
        "Later i will update on the backend process",
      ],
    },
    {
      heading: "Chat_app",
      stack: "Reactjs, Bootstrap, Nodejs, Expressjs, MongoDB,Socket.io, JWT",
      image: chat,
      view: "https://chat-app-1vjm.onrender.com/",
      desc: [
        "Implemented secure user registration and login functionality using JWT for authentication and session management.",
        "Enabled users to create chat with participants and intuitive interface.",
        "Designed and implemented a MySQL database schema for efficient storage and retrieval of user notes.",
        "Using a socket.io for real time chat application.",
        "Developed RESTful APIs to handle data operations between the frontend and backend efficiently.",
      ],
    },
    {
      heading: "E-commerce",
      stack: "Reactjs, Bootstrap, Nodejs, Expressjs, MongoDB, JWT,",
      image: ecom,
      view: "https://e-commerce-fgki.onrender.com/",
      desc: [
        "Designed and implemented dynamic and responsive user interfaces using React.js and Bootstrap, ensuring compatibility across various devices and screen sizes.",
        "Managed application state using React’s built-in state management and hooks for efficient data handling and component updates.",
        "Enabled user login with authentication checks and session management.",
      ],
    },
  ];

  return (
    <section
      className="lg:w-[80%] lg:mx-auto py-28 lg:pt-40"
    >
      <motion.h1
        className="text-3xl md:text-4xl text-center font-bold mb-10"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 m-3">
        {lists.map((project, index) => (
            <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
