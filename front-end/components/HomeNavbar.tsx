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
//contact@1genei.com
//
const HomeNavbar = (props) => {
  const [isopen, setIsopen] = React.useState(false);
  const [clickmenu, setClickmenu] = React.useState(false);
  const [clickimage, setClickimage] = React.useState(false);
  return (
    <>
      <nav className="lg:hidden bg-white shadow-lg bg-gradient-to-r from-white via-orange-500 to-orange-300 h-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative flex justify-between">
            <div className="mr-4">
              <div className="mt-3">
                <button className="outline-none menu-button"
                onClick={()=>{
                  setClickimage(!clickimage)
                  setClickmenu(false);
                }}>
                  <img
                    id=""
                    src={props.data.avatar}
                    className="h-10 w-auto rounded-full"
                    alt=""
                  />
                </button>
                {clickimage&& (
                  <div
                    className="flex flex-col justify-around justify-items-center absolute left-0 py-2 mt-2 bg-white rounded-md shadow-xl  w-64 h-auto md:w-600 "
                    style={{ height: "150px" }}
                  >
                    <div className="flex justify-around justify-items-center block px-4 py-2 text-sm text-white text-gray-700 hover:bg-gradient-to-r hover:from-white hover:via-orange-500 hover:to-orange-300 hover:text-white">
                      <button
                        type="button"
                        className="bg-gradient-to-r from-orange-500 to-orange-300 hover:from-orange-100 hover:to-yellow-500 w-32 h-10"
                        onClick={() => {
                          setClickimage(false);
                        }}
                      >
                        View profile
                      </button>
                    </div>
                    <div className="flex justify-around justify-items-center block px-4 py-2 text-sm text-white text-gray-700 hover:bg-gradient-to-r hover:from-white hover:via-orange-500 hover:to-orange-300 hover:text-white">
                      <button
                        type="button"
                        className="bg-gradient-to-r from-orange-500 to-orange-300 hover:from-orange-100 hover:to-yellow-500 w-32 h-10"
                        onClick={() => {
                          setClickimage(false);
                        }}
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mr-4">
              <div className="mt-3">
                <button className="outline-none menu-button">
                  <svg
                    className="w-10 h-10 text-gray-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 00 24 24"
                    stroke="currentColor"
                    onClick={() => {
                      setClickmenu(!clickmenu);
                      setClickimage(false);
                    }}
                  >
                    <path d="m4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
                {clickmenu && (
                  <div
                    className="flex flex-col justify-around justify-items-center absolute right-0 py-2 mt-2 bg-white rounded-md shadow-xl  w-64 h-auto md:w-600 "
                    style={{ height: "450px" }}
                  >
                    <div className="flex justify-around justify-items-center block px-4 py-2 text-sm text-white text-gray-700 hover:bg-gradient-to-r hover:from-white hover:via-orange-500 hover:to-orange-300 hover:text-white">
                      <button
                        type="button"
                        className="bg-gradient-to-r from-orange-500 to-orange-300 hover:from-orange-100 hover:to-yellow-500 w-32 h-10"
                        onClick={() => {
                          setClickmenu(false);
                        }}
                      >
                        Going Chat
                      </button>
                    </div>
                    <div className="flex justify-around justify-items-center block px-4 py-2 text-sm text-white text-gray-700 hover:bg-gradient-to-r hover:from-white hover:via-orange-500 hover:to-orange-300 hover:text-white">
                      <button
                        type="button"
                        className="bg-gradient-to-r from-orange-500 to-orange-300 hover:from-orange-100 hover:to-yellow-500 w-32 h-10"
                        onClick={() => {
                          setClickmenu(false);
                        }}
                      >
                        Playgame
                      </button>
                    </div>
                    <div className="flex justify-around justify-items-center block px-4 py-2 text-sm text-white text-gray-700 hover:bg-gradient-to-r hover:from-white hover:via-orange-500 hover:to-orange-300 hover:text-white">
                      <button
                        type="button"
                        className="bg-gradient-to-r from-orange-500 to-orange-300 hover:from-orange-100 hover:to-yellow-500 w-32 h-10"
                        onClick={() => {
                          setClickmenu(false);
                        }}
                      >
                        Friends
                      </button>
                    </div>
                    <div className=" flex justify-around justify-items-center block px-4 py-2 text-sm text-white text-gray-700 hover:bg-gradient-to-r hover:from-white hover:via-orange-500 hover:to-orange-300 hover:text-white">
                      <button
                        type="button"
                        className="bg-gradient-to-r from-orange-500 to-orange-300 hover:from-orange-100 hover:to-yellow-500 w-32 h-10"
                        onClick={() => {
                          setClickmenu(false);
                        }}
                      >
                        Users
                      </button>
                    </div>
                    <div className="flex justify-around justify-items-center block px-4 py-2 text-sm text-white text-gray-700 hover:bg-gradient-to-r hover:from-white hover:via-orange-500 hover:to-orange-300 hover:text-white">
                      <button
                        type="button"
                        className="bg-gradient-to-r from-orange-500 to-orange-300 hover:from-orange-100 hover:to-yellow-500 w-32 h-10"
                        onClick={() => {
                          setClickmenu(false);
                        }}
                      >
                        View Profile
                      </button>
                    </div>
                    <div className="flex justify-around justify-items-center block px-4 py-2 text-sm text-white text-gray-700 hover:bg-gradient-to-r hover:from-white hover:via-orange-500 hover:to-orange-300 hover:text-white">
                      <button
                        type="button"
                        className="bg-gradient-to-r from-orange-500 to-orange-300 hover:from-orange-100 hover:to-yellow-500 w-32 h-10"
                        onClick={() => {
                          setClickmenu(false);
                        }}
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="hidden lg:block flex flex-wrap bg-orange-400">
        <section className="relative mx-auto">
          <nav className="flex justify-between bg-gradient-to-r from-white via-orange-500 to-orange-300 text-white w-screen">
            <div className="px-20  py-2 flex w-full items-center">
              <div className="w-1/4">
                <Link href="/home">
                  <p className="text-3xl font-bold font-heading cursor-pointer">
                    <img src="/logo.svg" alt="Logo" className=" h-8 w-8 mr-2" />
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
                    <Link href="/game">
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
        </section>
      </div>
    </>
  );
};

export default HomeNavbar;
