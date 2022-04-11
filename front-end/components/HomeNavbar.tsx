import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import { Avatar, CssBaseline } from "@mui/material";
import MediaQuery, { useMediaQuery } from "react-responsive";
import avat from "../public/avatar.svg";
import Navbar from "./Navbar";

const HomeNavbar = (props) => {
  const [isopen, setIsopen] = React.useState(false);
  return (
    <>
      {/* <div className="flex flex-wrap bg-orange-400"> */}
      {/* <section className="relative mx-auto">
          <nav className="flex justify-between bg-orange-400 text-white w-screen">
            <div className="px-20  py-2 flex w-full items-center">
              <div className="w-1/4">
                <Link href="/home">
                  <p className="text-3xl font-bold font-heading cursor-pointer">
                    HOME
                  </p>
                </Link>
              </div>
              <div className="w-1/2 flex flex-row justify-arround">
                <ul className="md:flex px-2 mx-auto font-semibold font-heading space-x-12">
                  <li>
                    <Link href="/Chats/">
                      <p className="hover:text-gray-200 cursor-pointer">
                        Going Chats
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/playgame">
                      <p className="hover:text-gray-200 cursor-pointer">
                        PlayGame
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/friend">
                      <p className="hover:text-gray-200 cursor-pointer">
                        Friends
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/userslist">
                      <p className="hover:text-gray-200 cursor-pointer">
                        Users List
                      </p>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-1/4 space-x-5 flex flex-row justify-end">
                <a className="flex items-center hover:text-gray-200" href="#">
                  <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                  <img id="" src="/message.svg" className="h-7" />
                </a>
                <a className="flex items-center hover:text-gray-200" href="#">
                  <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                  <img id="" src="/notif.svg" className="h-7" />
                </a>
                <a className="flex items-center hover:text-gray-200" href="#">
                  {props.data.username}
                </a>
                <a className="flex items-center hover:text-gray-200">
                  <div className="relative group bg-transparent">
                    <button
                      type="button"
                      className="flex flex-row items-center w-full px-2 py-2 mt-2 text-base font-bold text-left uppercase bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 focus:outline-none font-montserrat"
                      onClick={() => {
                        setIsopen(!isopen);
                      }}
                    >
                      <span>
                        <img
                          id=""
                          src={props.data.avatar}
                          className="h-10 w-auto rounded-full"
                          alt=""
                        />
                      </span>
                    </button>
                    {isopen && (
                      <div className="absolute mb-10 w-32  z-10 bg-grey-200 group-hover:block bg-white">
                        <ul
                          className=" py-1 w-22"
                          aria-labelledby="dropdownBottomButton"
                        >
                          <li>
                            <Link href="/myprofile">
                              <p className="cursor-pointer w-22 block py-2 px-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white ">
                                View Profile
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link href="/editprofile">
                              <p className="w-22 block py-2 px-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                Edit Profile
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link href="/">
                              <p className="w-22 block py-2 px-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                Sign out{" "}
                              </p>
                              
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </a>
              </div>
            </div>
          </nav>
        </section> */}
      <div className="bg-black">
        <div className="antialiased bg-gray-100 dark-mode:bg-gray-900">
          <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
            <div
              
              className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
            >
              <div className="flex flex-row items-center justify-between p-4">
                <a
                  href="#"
                  className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
                >
                  Flowtrail UI
                </a>
                <button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="w-6 h-6"
                  >
                    <path
                      // x-show="!open"
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                    <path
                      // x-show="open"
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="bg-black flex-col flex-grow  pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
                <a
                  className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  href="#"
                >
                  Blog
                </a>
                <a
                  className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  href="#"
                >
                  Portfolio
                </a>
                <a
                  className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  href="#"
                >
                  About
                </a>
                <a
                  className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  href="#"
                >
                  Contact
                </a>
                <div className="relative">
                  <button className="flex flex-row text-gray-900 bg-gray-200 items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <span>More</span>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <div
                    className="absolute right-0 w-full md:max-w-screen-sm md:w-screen mt-2 origin-top-right"
                  >
                    <div className="px-2 pt-2 pb-4 bg-white rounded-md shadow-lg dark-mode:bg-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a
                          className="flex flex row items-start rounded-lg bg-transparent p-2 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                          href="#"
                        >
                          <div className="bg-teal-500 text-white rounded-lg p-3">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              className="md:h-6 md:w-6 h-4 w-4"
                            >
                              <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="font-semibold">Appearance</p>
                            <p className="text-sm">Easy customization</p>
                          </div>
                        </a>

                        <a
                          className="flex flex row items-start rounded-lg bg-transparent p-2 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                          href="#"
                        >
                          <div className="bg-teal-500 text-white rounded-lg p-3">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              className="md:h-6 md:w-6 h-4 w-4"
                            >
                              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="font-semibold">Comments</p>
                            <p className="text-sm">
                              Check your latest comments
                            </p>
                          </div>
                        </a>
                        <a
                          className="flex flex row items-start rounded-lg bg-transparent p-2 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                          href="#"
                        >
                          <div className="bg-teal-500 text-white rounded-lg p-3">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              className="md:h-6 md:w-6 h-4 w-4"
                            >
                              <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                              <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="font-semibold">Analytics</p>
                            <p className="text-sm">
                              Take a look at your statistics
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default HomeNavbar;
