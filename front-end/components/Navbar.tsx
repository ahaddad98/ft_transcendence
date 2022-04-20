import React from "react";
import Link from "next/link";
import MediaQuery from "react-responsive";

const Navbar = () => {
  return (
    <div className="navbar">
      <MediaQuery minWidth={1060}>
        <Link href="/">
          <img id="logo" src="/logo.svg"></img>
        </Link>
      </MediaQuery>
    </div>
  );
};

export default Navbar;
