import React, { useEffect, useState } from "react";
import Header from "./components/navbar/Header";
import Home from './components/home/Home'
// import Experience from './components/experience/Experience'
import Projects from './components/projects/Projects'
import Contact from './components/contact/Contact'
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Education from "./components/education/Education";
// import Resume from "./components/resume/Resume";
import { Toaster } from "react-hot-toast";


function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]); 

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
      <div  data-theme={theme} className="font-comfortaa sm:w-[80%] xl:w-[90%] sm:mx-auto mx-5 overflow-x-hidden min-h-screen" >
        <Header 
          toggleTheme ={toggleTheme}
          theme = {theme}  
        />
        <Routes>
          <Route path="/sathiyaseelan_portfolio" element={<Home/>}/>
          {/* <Route path="/experience" element={<Experience/>}/> */}
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/education" element={<Education/>}/>
          <Route path="/contact" element={<Contact/>}/>
          {/* <Route path="/resume" element={<Resume/>}/> */}
        </Routes>
        <Footer/>
        <Toaster/>
      </div>
  )
}

export default App
