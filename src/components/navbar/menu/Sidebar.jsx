import React, { useState } from 'react';
import { TbMenu } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import MenuList from './MenuList';
import Social from './Social';

const Sidebar = ({theme}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
        <TbMenu data-theme={theme} onClick={toggleSidebar} className='p-3 shadow shadow-cyan-400 rounded-full text-6xl cursor-pointer hover:-translate-y-1.5 transform transition duration-500 hover:shadow-xl'/>

      <div data-theme={theme} dir='rtl'
        className={`z-10 fixed top-0 left-0 w-full h-full transform transition-transform duration-500  ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        } lg:translate-x-0 lg:relative lg:block`}
      >
        <div className="flex font-semibold justify-between items-center p-10 px-10">
          <h2 className=" bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent text-4xl font-bold pb-2 font-poppins">Sathiyaseelan</h2>
            <RxCross1 onClick={toggleSidebar} className='text-5xl cursor-pointer p-3 shadow shadow-cyan-400 rounded-full hover:-translate-y-1.5 transform transition duration-500 hover:shadow-xl' />
        </div>
        <MenuList toggleSidebar={toggleSidebar} theme={theme}/>
        <Social/>
      </div>
    </div>
  );
};

export default Sidebar;
