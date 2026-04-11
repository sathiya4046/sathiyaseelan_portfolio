import React from 'react'
import Link from 'next/link'
import NameBoard from '../navbar/menu/NameBoard'

const Footer = () => {
  return (
    <footer className="flex gap-3 justify-center text-center py-10 ">
        <div>
          Copyrights &copy; {new Date().getFullYear()} &rarr;
        </div>
        <Link className="bg-clip-text text-transparent" href="/">
            <NameBoard 
              name={"Sathiyaseelan"}
              className="text-xl font-extrabold tracking-wider font-SansOne"
              colors={["#8e44ad", "#e91e63", "#f39c12", "#8e44ad"]}
            />
        </Link>
    </footer>
  )
}

export default Footer