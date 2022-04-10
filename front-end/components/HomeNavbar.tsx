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
      <div className="flex flex-wrap bg-orange-400">
        <MediaQuery minWidth={1060}>
          <section className=" relative mx-auto">
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
                                {/* {localStorage.removeItem("token")} */}
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
          </section>
        </MediaQuery>
        <MediaQuery maxWidth={1059}>
          <section className=" relative mx-auto">
          <nav className="flex justify-between bg-orange-400 text-white w-screen">
          <div className="px-4  flex w-full h-20">
          <input type="checkbox" id="active" style={{ display: "none" }} />
          <label htmlFor="active" className="menu-btn">
            <img src="https://img.icons8.com/color/48/000000/menu--v4.png" />
            <span></span>
          </label>
          <label htmlFor="active" className="close"></label>
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
          {/* <div className="logo-resp">
            <Link href="/">
              <img id="logo" src="/logo.svg"></img>
            </Link>
          </div> */}
          {/* <div className="flex flex-wrap place-items-center">
                  <section className="relative mx-auto">
                    <nav className="flex justify-between bg-orange-500 text-white w-screen">
                      <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                        <a className="text-3xl font-bold font-heading" href="#">
                          Logo Here.
                        </a>

                        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                          <li>
                            <a className="hover:text-gray-200" href="#">
                              Home
                            </a>
                          </li>
                          <li>
                            <a className="hover:text-gray-200" href="#">
                              Catagory
                            </a>
                          </li>
                          <li>
                            <a className="hover:text-gray-200" href="#">
                              Collections
                            </a>
                          </li>
                          <li>
                            <a className="hover:text-gray-200" href="#">
                              Contact Us
                            </a>
                          </li>
                        </ul>

                        <div className="hidden xl:flex items-center space-x-5 items-center">
                          <a className="hover:text-gray-200" href="#">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </a>
                          <a
                            className="flex items-center hover:text-gray-200"
                            href="#"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            <span className="flex absolute -mt-5 ml-4">
                              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                            </span>
                          </a>

                          <a
                            className="flex items-center hover:text-gray-200"
                            href="#"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 hover:text-gray-200"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>

                      <a className="xl:hidden flex mr-6 items-center" href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 hover:text-gray-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span className="flex absolute -mt-5 ml-4">
                          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                        </span>
                      </a>
                      <a
                        className="navbar-burger self-center mr-12 xl:hidden"
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 hover:text-gray-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </a>
                    </nav>
                  </section>
                </div> */}
          {/* <div className="w-1/4">
                  <Link href="/home">
                    <p className="text-3xl font-bold font-heading cursor-pointer">
                      HOME
                    </p>
                  </Link>
                </div> */}
          {/* <div className="w-1/2 flex flex-row justify-arround">
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
                </div> */}
          {/* <div className="w-1/4 space-x-5 flex flex-row justify-end">
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
                </div> */}
          </div>
          </nav>
          </section>
        </MediaQuery>
      </div>
    </>
  );
};

export default HomeNavbar;
