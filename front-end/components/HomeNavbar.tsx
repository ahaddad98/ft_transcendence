import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Link from 'next/link';
import { CssBaseline } from '@mui/material';
import MediaQuery from "react-responsive";
import avat from "../public/avatar.svg"
const HomeNavbar = (props) => {
  const [isopen, setIsopen] = React.useState(false);
        return (
    <div className="flex flex-wrap bg-orange-400">
      <section className=" relative mx-auto">
        <nav className="flex justify-between bg-orange-400 text-white w-screen">
          <div className="px-20  py-2 flex w-full items-center">
            <div className="w-1/4">
            <a className="text-3xl font-bold font-heading" href="#">
              HOME
            </a>
            </div>
            <div className="w-1/2 flex flex-row justify-arround">
            <ul className="hidden md:flex px-2 mx-auto font-semibold font-heading space-x-12">
              <li><a className="hover:text-gray-200" href="#">Watch Now</a></li>
              <li><a className="hover:text-gray-200" href="#">PlayGame</a></li>
              <li><a className="hover:text-gray-200" href="/friend">Friends</a></li>
              <li><a className="hover:text-gray-200" href="/userslist">Users List</a></li>
            </ul>
            </div>
            <div className="w-1/4 space-x-5 flex flex-row justify-end">
              <a className="flex items-center hover:text-gray-200" href="#">
                <span className="flex absolute -mt-5 ml-4">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                    </span>
                  </span>
                  <img id="" src="/message.svg" className="h-7"/>
              </a>
              <a className="flex items-center hover:text-gray-200" href="#">
                <span className="flex absolute -mt-5 ml-4">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                    </span>
                  </span>
                  <img id="" src="/notif.svg" className="h-7"/>
              </a>
              <a className="flex items-center hover:text-gray-200" href="#">
                Username
              </a>
              <a className="flex items-center hover:text-gray-200">
                    <div className="relative group bg-transparent">
                      {/* <div className=" flex flex-row items-center"> */}
                        <button type="button" className="flex flex-row items-center w-full px-2 py-2 mt-2 text-base font-bold text-left uppercase bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 focus:outline-none font-montserrat"
                          onClick={()=>{
                            setIsopen(!isopen)
                          }}
                          >
                          <span><img id="" src="/avatar.svg" className="h-10 w-auto rounded-full" alt=""/></span>
                          </button>
                          {isopen && (
                            <div className="absolute mb-10 w-32  z-10 bg-grey-200 group-hover:block bg-white">
                            <ul className=" py-1 w-22" aria-labelledby="dropdownBottomButton">
                                <li>
                                    <a href="#" className="w-22 block py-2 px-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">View Profile</a>
                                  </li>
                                  <li>
                                    <a href="#" className="w-22 block py-2 px-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit Profile</a>
                                  </li>
                                  <li>
                                    <a href="#" className="w-22 block py-2 px-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                  </li>
                                </ul>
                            </div>
                              )}
                            {/* </div> */}
                    </div>  

              </a>
            </div>
          </div>
          {/* <a className="xl:hidden flex mr-6 items-center" href="#">
            <svg className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="flex absolute -mt-5 ml-4">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
              </span>
            </span>
          </a>
          <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
          </a> */}
        </nav>
      </section>
    </div>
  );
};

export default HomeNavbar;