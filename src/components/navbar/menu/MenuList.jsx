import React from 'react'
import {Link}  from 'react-router-dom'


const MenuList = ({toggleSidebar,theme}) => {
  return (
    <div>
        <ul className=" font-josefin font-semibold lg:flex gap-5 justify-center items-center lg:text-lg text-2xl tracking-widest lg:space-y-0 space-y-6 lg:px-0 px-10 pt-4 pb-24 lg:pb-0">
          <li>
            <Link onClick={toggleSidebar} to={"/sathiyaseelan_portfolio"} className="relative group">
              Home
              <span
            className={`absolute group-hover:rounded-2xl left-1/2 -bottom-2 w-0 h-0.5 ${theme==='dark' ? 'bg-white' : 'bg-black'} transform transition-all duration-500 group-hover:w-full group-hover:left-0 group-hover:right-auto group-hover:h-1 group-hover:translate-x-0`}></span>
            </Link>
          </li>
          {/* <li>
            <Link onClick={toggleSidebar} to={"/experience"} className="relative group">
              Experience
              <span
            className={`absolute group-hover:rounded-2xl left-1/2 -bottom-2 w-0 h-0.5 ${theme==='dark' ? 'bg-white' : 'bg-black'} transform transition-all duration-500 group-hover:w-full group-hover:left-0 group-hover:right-auto group-hover:h-1 group-hover:translate-x-0`}></span>
            </Link>
          </li> */}
          <li>
            <Link onClick={toggleSidebar} to={"/projects"} className="relative group">
              Projects
              <span
            className={`absolute group-hover:rounded-2xl left-1/2 -bottom-2 w-0 h-0.5 ${theme==='dark' ? 'bg-white' : 'bg-black'} transform transition-all duration-500 group-hover:w-full group-hover:left-0 group-hover:right-auto group-hover:h-1 group-hover:translate-x-0`}></span>
            </Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} to={"/education"} className="relative group">
              Education
              <span
            className={`absolute group-hover:rounded-2xl left-1/2 -bottom-2 w-0 h-0.5 ${theme==='dark' ? 'bg-white' : 'bg-black'} transform transition-all duration-500 group-hover:w-full group-hover:left-0 group-hover:right-auto group-hover:h-1 group-hover:translate-x-0`}></span>
            </Link>
          </li>
          {/* <li>
            <Link onClick={toggleSidebar} to={"/resume"} className="relative group">
              Resume
              <span
            className={`absolute group-hover:rounded-2xl left-1/2 -bottom-2 w-0 h-0.5 ${theme==='dark' ? 'bg-white' : 'bg-black'} transform transition-all duration-500 group-hover:w-full group-hover:left-0 group-hover:right-auto group-hover:h-1 group-hover:translate-x-0`}></span>
            </Link>
          </li> */}
          <li>
            <Link onClick={toggleSidebar} to={"/contact"} className="relative group">
              Contact
              <span
            className={`absolute group-hover:rounded-2xl left-1/2 -bottom-2 w-0 h-0.5 ${theme==='dark' ? 'bg-white' : 'bg-black'} transform transition-all duration-500 group-hover:w-full group-hover:left-0 group-hover:right-auto group-hover:h-1 group-hover:translate-x-0`}></span>
            </Link>
          </li>
        </ul>
    </div>
  )
}

export default MenuList