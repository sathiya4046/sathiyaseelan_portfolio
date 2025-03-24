import React, { useEffect } from 'react';
import ecom from '../../assets/images/ecom.png'
import chat from '../../assets/images/chat.png'
import netflix from '../../assets/images/netflix.png'
import notes from '../../assets/images/notes thumbnail.png'
import xClone from '../../assets/images/x-clone.png'

import AOS from "aos";
import "aos/dist/aos.css";

function Projects() {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const lists = [
    {
      heading:"Twitter Clone",
      stack:"Reactjs,Material UI, Bootstrap, Nodejs, Expressjs, MongoDB, JWT, TanStack Query",
      image:xClone,
      view:"https://x-clone-dnl2.onrender.com/",
      desc:[
        "Developed a MERN complete full stack social media website, user can do crud operation with the help of tanstack",
        "Dynamic and responsive user interfaces using React.js, Material UI and Bootstrap ensuring compatibility across various devices and screen sizes.",
        "Managed application state using React’s built-in state management and hooks for efficient data handling and component updates.",
        "Enabled user login with authentication checks and session management."
      ]
    },
    {
      heading:"Notes App",
      stack:"Reactjs, Bootstrap, Nodejs, Expressjs, MySql, MongoDB, JWT",
      image:notes,
      view:"https://notes-mern-hlxh.onrender.com/",
      desc:[
        "Facilitated user registration with input validation and secure data handling.",
        "Enabled user login with authentication checks and session management.",
        "Enabled users to create, read, update, and delete notes with a responsive and intuitive interface.",
        "Designed and implemented a MySQL database schema for efficient storage and retrieval of user notes.",
        "Implemented secure user registration and login functionality using JWT for authentication and session management.",
        "Developed RESTful APIs to handle data operations between the frontend and backend efficiently."
      ]
    },
    {
      heading:"Netflix-Clone",
      stack:"Reactjs,Bootstrap,Css",
      image:netflix,
      view:"https://netflix-clone-eight-nu-57.vercel.app/",
      desc:[
        "Built the entire user interface using React.js, focusing on dynamic rendering",
        "Designed a responsive UI using CSS and media queries, ensuring a seamless experience across mobile, tablet, and desktop devices.",
        "Focused on optimizing user experience with smooth transitions, animations, and loading optimizations.",
        "Later i will update on the backend process"
      ]
    },
    {
      heading:"Chat_app",
      stack:"Reactjs, Bootstrap, Nodejs, Expressjs, MongoDB,Socket.io, JWT",
      image:chat,
      view:"https://chat-app-1vjm.onrender.com/",
      desc:[
        "Implemented secure user registration and login functionality using JWT for authentication and session management.",
        "Enabled users to create chat with participants and intuitive interface.",
        "Designed and implemented a MySQL database schema for efficient storage and retrieval of user notes.",
        "Using a socket.io for real time chat application.",
        "Developed RESTful APIs to handle data operations between the frontend and backend efficiently."
      ]
    },
    {
      heading:"E-commerce",
      stack:"Reactjs, Bootstrap, Nodejs, Expressjs, MongoDB, JWT,",
      image:ecom,
      view:"https://e-commerce-fgki.onrender.com/",
      desc:[
        "Designed and implemented dynamic and responsive user interfaces using React.js and Bootstrap, ensuring compatibility across various devices and screen sizes.",
        "Managed application state using React’s built-in state management and hooks for efficient data handling and component updates.",
        "Enabled user login with authentication checks and session management.",
      ]
    }
  ]
  return (
    <div className=" py-28 lg:pt-52">
      <h1 className="text-3xl md:text-4xl text-center font-bold mb-10">Projects</h1>
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-10 m-3'>
            {
              lists.map((e,i)=>(
                <div data-aos="fade-up" key={i} className='relative md:max-w-md mx-auto sm:mx-0 overflow-hidden space-y-4'>
                  <img src={e.image} alt="Sathiya"/>
                  <div>
                    <h1 className='text-xl md:text-2xl'>{e.heading}</h1>
                    <small className='font-josefin'>{e.stack}</small>
                  </div>
                  <div className='mb-15'>
                  {
                    e.desc.map((list,index)=>(
                      <ul key={index} className="text-justify font-mono">
                        <li className="mb-2"><em><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> {list}</em></li>
                      </ul>
                    ))
                  }
                  </div>
                  <a href={e.view}  className="absolute bottom-0 w-full btn btn-neutral mt-3 p-2">View</a>  
              </div>
              ))
            }
      </div>
    </div>
  );
}

export default Projects;
