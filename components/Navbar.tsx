import React from "react";
import Link from 'next/link'

const  Navbar = () =>  {
    return (
      <div className="navbar">
        <Link href="/">
          <img id="logo" src="/logo.svg">
          </img>
        </Link>
        <div className="menu">
          <div className="menu-bar">
            <Link href="/">
              <a>HOME</a>
            </Link>
          </div>
          <div className="menu-bar">
          <Link href="/about">
            <a>ABOUT</a>
          </Link>
          </div>
          <div className="menu-bar">
          <Link href="/about">
            <a>SERVICES</a>
            </Link>
          </div>
          </div>
      </div>
    )
  }

  export default Navbar;