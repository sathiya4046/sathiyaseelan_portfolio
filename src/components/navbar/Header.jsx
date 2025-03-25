import React from 'react'
import Sidebar from './menu/Sidebar'
import MenuList from './menu/MenuList'
import Dark from './menu/Dark'


const Header = ({toggleTheme,theme}) => {

  return (
    <header className='mt-5 fixed top-0 left-5 right-5 sm:left-10 sm:right-10  md:left-20 md:right-20 z-50'>
            <nav className="lg:hidden navbar justify-between cursor-pointer">
                <Sidebar theme = {theme} />
                <Dark toggleTheme ={toggleTheme}  theme = {theme}/>
            </nav>
            <nav data-theme={theme} className="hidden lg:flex justify-evenly mt-12  rounded-4xl w-[40rem] mx-auto navbar cursor-pointer border-b-2">
                <MenuList/>
                <Dark toggleTheme ={toggleTheme}/>
            </nav>
    </header>
  )
}

export default Header