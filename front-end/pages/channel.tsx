import React from "react";
import HomeNavbar from "../components/HomeNavbar";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";

const Channel = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="relative h-auto sm:h-96 w-full rounded-lg flex flex-row">
        <div className="w-64 h-full">
          <nav className="flex flex-col bg-orange-400 w-3/4 h-3/4 px-4 tex-gray-900 border border-orange-500">
            <div className="flex flex-wrap mt-8 ml-10">
              <div className="w-full">
                <span className="font-semibold text-white">Ava Harper</span>
              </div>
            </div>
            <div className="mt-10 mb-4">
              <ul className="ml-4">
                <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg">
                  <span>
                    <svg
                      className="fill-current h-5 w-5 "
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clip-rule="evenodd"
                        d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                        fill="currentColor"
                      />
                      <path
                        d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <a href="#">
                    <span className="ml-2">Members</span>
                  </a>
                </li>
                <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg">
                  <span>
                    <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
                      <path
                        d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2
                           2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0
                           00-2-2h-1V1m-1 11h-5v5h5v-5z"
                      ></path>
                    </svg>
                  </span>
                  <a href="#">
                    <span className="ml-2">Milestones</span>
                  </a>
                </li>
                <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg">
                  <span>
                    <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0
                           014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4
                           8-4z"
                      ></path>
                    </svg>
                  </span>
                  <a href="#">
                    <span className="ml-2">Team</span>
                  </a>
                </li>
                <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg">
                  <span>
                    <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
                      <path
                        d="M12 13H7v5h5v2H5V10h2v1h5v2M8
                           4v2H4V4h4m2-2H2v6h8V2m10 9v2h-4v-2h4m2-2h-8v6h8V9m-2
                           9v2h-4v-2h4m2-2h-8v6h8v-6z"
                      ></path>
                    </svg>
                  </span>
                  <a href="#">
                    <span className="ml-2">Tasks</span>
                  </a>
                </li>
                <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg">
                  <span>
                    <svg
                      className="fill-current h-5 w-5 "
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7 3C8.86384 3 10.4299 4.27477 10.874 6H19V8H10.874C10.4299 9.72523 8.86384 11 7 11C4.79086 11 3 9.20914 3 7C3 4.79086 4.79086 3 7 3ZM7 9C8.10457 9 9 8.10457 9 7C9 5.89543 8.10457 5 7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17 20C15.1362 20 13.5701 18.7252 13.126 17H5V15H13.126C13.5701 13.2748 15.1362 12 17 12C19.2091 12 21 13.7909 21 16C21 18.2091 19.2091 20 17 20ZM17 18C18.1046 18 19 17.1046 19 16C19 14.8954 18.1046 14 17 14C15.8954 14 15 14.8954 15 16C15 17.1046 15.8954 18 17 18Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <a href="#">
                    <span className="ml-2">Settings</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="h-inherit w-inherit">
          <div className="flex flex-col h-96 w-full bg-white ">
            <div
              id="chat"
              className="flex flex-col mt-2 flex-col-reverse overflow-y-scroll	 space-y-3 mb-20 pb-3"
            >
              <div className="w-max ml-auto break-all mt-2 mb-1 p-2 rounded-br-none bg-blue-500 rounded-2xl text-white text-left mr-5">
                2/10
              </div>
              <div className="w-max ml-auto break-all mt-2 mb-1 p-2 rounded-br-none bg-blue-500 rounded-2xl text-white text-left mr-5">
                But numbers can
              </div>
              <div className="other break-all mt-2  ml-5 rounded-bl-none float-none bg-gray-300 mr-auto rounded-2xl p-2">
                Aww thx!!
              </div>
              <div className="other break-all mt-2  ml-5 rounded-bl-none float-none bg-gray-300 mr-auto rounded-2xl p-2">
                Aww thx!!
              </div>
              <div className="other break-all mt-2  ml-5 rounded-bl-none float-none bg-gray-300 mr-auto rounded-2xl p-2">
                Aww thx!!
              </div>
              <div className="other break-all mt-2  ml-5 rounded-bl-none float-none bg-gray-300 mr-auto rounded-2xl p-2">
                Aww thx!!
              </div>
              <div className="other break-all mt-2  ml-5 rounded-bl-none float-none bg-gray-300 mr-auto rounded-2xl p-2">
                Aww thx!!
              </div>
              <div className="w-max ml-auto break-all mt-2 mb-1 p-2 rounded-br-none bg-blue-500 rounded-2xl text-white text-left mr-5">
                Words can't describe how beautiful you are :)
              </div>
              <div className="other break-all mt-2  ml-5 rounded-bl-none float-none bg-gray-300 mr-auto rounded-2xl p-2">
                Words can't decsribe how ugly you are ;)
              </div>
            </div>
            <div className="flex flex-row  items-center  bottom-0 my-2 w-full">
              <div className="ml-2 flex flex-row border-gray items-center w-full border rounded-3xl h-12 px-2">
                <button className="focus:outline-none flex items-center justify-center h-10 w-10 hover:text-red-600 text-red-400 ml-1">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    ></path>
                  </svg>
                </button>
                <div className="w-full">
                  <input
                    type="text"
                    id="message"
                    className="border rounded-2xl border-transparent w-full focus:outline-none text-sm h-10 flex items-center"
                    placeholder="Type your message...."
                  />
                </div>
                <div className="flex flex-row">
                  <button className="focus:outline-none flex items-center justify-center h-10 w-8 hover:text-blue-600  text-blue-400">
                    <svg
                      className="w-5 h-5 "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                  </button>
                  <button
                    id="capture"
                    className="focus:outline-none flex items-center justify-center h-10 w-8 hover:text-green-600 text-green-400 ml-1 mr-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-3 mr-2">
                <button
                  id="other"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 text-white focus:outline-none"
                >
                  <svg
                    className="w-5 h-5 transform -rotate-90 -mr-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </button>
              </div>
              <div>
                <button
                  id="self"
                  className="flex items-center justify-center h-10 w-10 mr-2 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 text-white focus:outline-none"
                >
                  <svg
                    className="w-5 h-5 transform rotate-90 -mr-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Channel;
