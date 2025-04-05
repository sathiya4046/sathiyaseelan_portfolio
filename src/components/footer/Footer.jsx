import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="text-center py-10 ">
        Copyrights &copy; {new Date().getFullYear()} &rarr;
        <Link className=' bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent text-xl font-bold pb-2 font-poppins' to={'/sathiyaseelan_portfolio'}> Sathiyaseelan</Link>
    </div>
  )
}

export default Footer