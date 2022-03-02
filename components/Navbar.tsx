import React from "react";
import Link from 'next/link'
import MediaQuery from "react-responsive";

const  Navbar = () =>  {
    return (
      <div className="navbar">
        <Link href="/">
          <img id="logo" src="/logo.svg">
          </img>
        </Link>
        <MediaQuery minWidth={1121}>
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
          </MediaQuery>
      </div>
    )
  }

  export default Navbar;