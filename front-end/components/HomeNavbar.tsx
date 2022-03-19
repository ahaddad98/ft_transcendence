import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Link from 'next/link';
import { Avatar, CssBaseline } from '@mui/material';
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
              <Link href="/home">
                <a className="text-3xl font-bold font-heading">
                  HOME
                </a>
              </Link>
            </div>
            <div className="w-1/2 flex flex-row justify-arround">
            <ul className="hidden md:flex px-2 mx-auto font-semibold font-heading space-x-12">
              <li><Link href="/watchnow"><a className="hover:text-gray-200" >Watch Now</a></Link></li>
              <li><Link href="/playgame"><a className="hover:text-gray-200" >PlayGame</a></Link></li>
              <li><Link href="/friend"><a className="hover:text-gray-200" >Friends</a></Link></li>
              <li><Link href="/userslist"><a className="hover:text-gray-200" >Users List</a></Link></li>
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
                {props.data.username}
              </a>
              <a className="flex items-center hover:text-gray-200">
                    <div className="relative group bg-transparent">
                      {/* <div className=" flex flex-row items-center"> */}
                        <button type="button" className="flex flex-row items-center w-full px-2 py-2 mt-2 text-base font-bold text-left uppercase bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 focus:outline-none font-montserrat"
                          onClick={()=>{
                            setIsopen(!isopen)
                          }}
                          >
                          <span><img id="" src={props.data.avatar} className="h-10 w-auto rounded-full" alt=""/></span>
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
        </nav>
      </section>
    </div>
  );
};

export default HomeNavbar;