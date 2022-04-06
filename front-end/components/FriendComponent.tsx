import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import HomeNavbar from "./HomeNavbar";

const FriendComponent = (props) => {
  const router = useRouter()
  const hundelconnect= async (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3001/conversations/private/users/me/${props.mydata.user.id}`,{},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ).then((res)=>{
        router.push(`/Chats/${res.data.id}`)
      })
  };
  return (
    <div className="profile-page">
      <HomeNavbar data={props.data} />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />
      <section className="relative block h-500-px"></section>
      <section className="relative py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src={props.mydata.user.avatar}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button className="text-sm bg-orange-500 text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r"
                      onClick={hundelconnect}
                      >
                        Connect
                      </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {props.mydata.numberOfFriends}
                      </span>
                      <span className="text-sm text-blueGray-400">Friends</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        20
                        {/* {props.mydata.user.xp} */}
                      </span>
                      <span className="text-sm text-blueGray-400">Scores</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {props.mydata.user.wins}
                      </span>
                      <span className="text-sm text-blueGray-400">Wins</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {props.mydata.user.loses}
                      </span>
                      <span className="text-sm text-blueGray-400">Loses</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {props.mydata.user.username}
                </h3>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  LeveL {props.mydata.user.level}
                </h3>
              </div>
              <ul id="tabs" className="inline-flex w-full px-1 pt-2 ">
                <li className="px-4 py-2 -mb-px font-semibold text-gray-800 border-b-2 border-orange-400 rounded-t opacity-50">
                  <a id="default-tab" href="#first">
                    History Game
                  </a>
                </li>
              </ul>
              <div className=" low-root">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <li className="y-3 sm:py-4">
                    <div className="flex flex-row justify-around space-x-4">
                      <div className="flex-shrink-0 flex flex-row space-x-4">
                        <div className="mt-2 flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            USERNAME
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white"></p>
                      </div>
                      <div className="flex-shrink-0 flex flex-row space-x-4">
                        <div className="mt-2 flex-1 min-w-0">
                          <p className=" text-sm font-medium text-gray-900 dark:text-white">
                            USERNAME
                          </p>
                        </div>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        WIN
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default FriendComponent;
