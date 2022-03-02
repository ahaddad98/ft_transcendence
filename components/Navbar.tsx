import React from "react";
import Link from 'next/link'
import MediaQuery from "react-responsive";

const  Navbar = () =>  {
    return (
      <div className="navbar">
        <MediaQuery minWidth={1060}>
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
        </MediaQuery>
        <MediaQuery maxWidth={1060}>
          <input type="checkbox" id="active" style={{display: "none"}}/>
            <label htmlFor="active" className="menu-btn">
            <img src="https://img.icons8.com/color/48/000000/menu--v4.png"/>
              <span></span></label>
            <label htmlFor="active" className="close">
            </label>
            <div className="wrapper">
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
          <div className="logo-resp">
            <Link href="/">
          <img id="logo" src="/logo.svg">
          </img>
        </Link>
          </div>
        </MediaQuery>
        
        </div>
    )
  }

  export default Navbar;