import ownway from "../assets/images/ownway.png";
import servi from "../assets/images/servizzone.png";
import frost from "../assets/images/frostmaster.png";
import tit from "../assets/images/tit.png";

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
    category: "frontend",
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
    category: "frontend",
    desc: [
      "Developed a MERN complete full stack social media website; users can perform CRUD operations with TanStack.",
      "Dynamic and responsive user interfaces using React.js, Material UI and Bootstrap ensuring compatibility across various devices and screen sizes.",
      "Managed application state using React's built-in state management and hooks for efficient data handling and component updates.",
      "Enabled user login with authentication checks and session management.",
    ],
  },
  {
    id: "frostmaster",
    heading: "Frost Master",
    stack: "Next.js, React, Tailwind CSS, Node.js, MongoDB",
    image: frost,
    view: "https://www.frostmasters.com/",
    category: "frontend",
    desc: [
      "Built a full-stack social media platform using the MERN stack with Next.js for the frontend and Node.js/Express for backend APIs, enabling users to perform complete CRUD operations.",
      "Implemented TanStack Query for efficient server-state management, background data synchronization, caching, and real-time UI updates.",
      "Developed responsive and modern UI components using React.js and Tailwind CSS, ensuring seamless performance across all screen sizes.",
      "Integrated secure user authentication with JWT-based login, protected routes, and session handling to safeguard user data.",
      "Designed and optimized MongoDB database schemas for scalable data storage and faster query performance.",
    ],
  },
  {
    id: "tit",
    heading: "Travel In Trips",
    stack: "Next.js, React, Tailwind CSS, Node.js, MongoDB",
    image: tit,
    view: "https://travelindiatrips.com/",
    category: "frontend",
    desc: [
      "Built a full-stack social media platform using the MERN stack with Next.js for the frontend and Node.js/Express for backend APIs, enabling users to perform complete CRUD operations.",
      "Implemented TanStack Query for efficient server-state management, background data synchronization, caching, and real-time UI updates.",
      "Developed responsive and modern UI components using React.js and Tailwind CSS, ensuring seamless performance across all screen sizes.",
      "Integrated secure user authentication with JWT-based login, protected routes, and session handling to safeguard user data.",
      "Designed and optimized MongoDB database schemas for scalable data storage and faster query performance.",
    ],
  },
];
