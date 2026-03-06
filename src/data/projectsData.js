import ecom from "../assets/images/ecom.png";
import chat from "../assets/images/chat.png";
import netflix from "../assets/images/netflix.png";
import notes from "../assets/images/notes thumbnail.png";
import ownway from "../assets/images/ownway.png";
import servi from "../assets/images/servizzone.png";

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
];

export const projectsData = [
  {
    id: "servizzone",
    heading: "Servizzone",
    stack: "Next.js, React, Tailwind CSS, Node.js, MongoDB",
    image: servi,
    view: "https://www.servizzone.com/",
    github: "",
    category: "fullstack",
    desc: [
      "Built a full-stack social media platform using the MERN stack with Next.js for the frontend and Node.js/Express for backend APIs, enabling users to perform complete CRUD operations.",
      "Implemented TanStack Query for efficient server-state management, background data synchronization, caching, and real-time UI updates.",
      "Developed responsive and modern UI components using React.js and Tailwind CSS, ensuring seamless performance across all screen sizes.",
      "Integrated secure user authentication with JWT-based login, protected routes, and session handling to safeguard user data.",
      "Designed and optimized MongoDB database schemas for scalable data storage and faster query performance.",
    ],
  },
  {
    id: "ownway",
    heading: "Ownway Tech",
    stack: "React, Tailwind, Node.js, MongoDB",
    image: ownway,
    view: "https://ownwaytech.com/",
    github: "",
    category: "fullstack",
    desc: [
      "Developed a MERN complete full stack social media website; users can perform CRUD operations with TanStack.",
      "Dynamic and responsive user interfaces using React.js, Material UI and Bootstrap ensuring compatibility across various devices and screen sizes.",
      "Managed application state using React's built-in state management and hooks for efficient data handling and component updates.",
      "Enabled user login with authentication checks and session management.",
    ],
  },
  // {
  //   id: "notes",
  //   heading: "Notes App",
  //   stack: "React, Bootstrap, Node.js, Express, MySQL, MongoDB, JWT",
  //   image: notes,
  //   view: "https://notes-mern-hlxh.onrender.com/",
  //   github: "",
  //   category: "fullstack",
  //   desc: [
  //     "Facilitated user registration with input validation and secure data handling.",
  //     "Enabled user login with authentication checks and session management.",
  //     "Enabled users to create, read, update, and delete notes with a responsive and intuitive interface.",
  //     "Designed and implemented a MySQL database schema for efficient storage and retrieval of user notes.",
  //     "Implemented secure user registration and login functionality using JWT for authentication and session management.",
  //     "Developed RESTful APIs to handle data operations between the frontend and backend efficiently.",
  //   ],
  // },
  // {
  //   id: "netflix",
  //   heading: "Netflix Clone",
  //   stack: "React, Bootstrap, CSS",
  //   image: netflix,
  //   view: "https://netflix-clone-eight-nu-57.vercel.app/",
  //   github: "",
  //   category: "frontend",
  //   desc: [
  //     "Built the entire user interface using React.js, focusing on dynamic rendering.",
  //     "Designed a responsive UI using CSS and media queries, ensuring a seamless experience across mobile, tablet, and desktop devices.",
  //     "Focused on optimizing user experience with smooth transitions, animations, and loading optimizations.",
  //     "Backend integration planned for future updates.",
  //   ],
  // },
  // {
  //   id: "chat",
  //   heading: "Chat App",
  //   stack: "React, Bootstrap, Node.js, Express, MongoDB, Socket.io, JWT",
  //   image: chat,
  //   view: "https://chat-app-1vjm.onrender.com/",
  //   github: "",
  //   category: "fullstack",
  //   desc: [
  //     "Implemented secure user registration and login functionality using JWT for authentication and session management.",
  //     "Enabled users to create chats with participants and an intuitive interface.",
  //     "Designed and implemented a MongoDB schema for efficient storage and retrieval of chat data.",
  //     "Real-time messaging using Socket.io for instant communication.",
  //     "Developed RESTful APIs to handle data operations between the frontend and backend efficiently.",
  //   ],
  // },
  // {
  //   id: "ecom",
  //   heading: "E-commerce",
  //   stack: "React, Bootstrap, Node.js, Express, MongoDB, JWT",
  //   image: ecom,
  //   view: "https://e-commerce-fgki.onrender.com/",
  //   github: "",
  //   category: "fullstack",
  //   desc: [
  //     "Designed and implemented dynamic and responsive user interfaces using React.js and Bootstrap, ensuring compatibility across various devices and screen sizes.",
  //     "Managed application state using React's built-in state management and hooks for efficient data handling and component updates.",
  //     "Enabled user login with authentication checks and session management.",
  //   ],
  // },
];
