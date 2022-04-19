import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HomeNavbar from "./HomeNavbar";
import Modal from "@material-tailwind/react/Modal";
import UpdateProfile from "./updateprofile";
const Profile = (props) => {
  console.log(props.mydata);

  const router = useRouter();
  const [clickupdateprofile, setclickupdateprofile] = useState(false);
  const [restwofactor, setRestwofactor] = useState<any>("");
  const [data1, setdata1] = useState<any>();
  const [clicktwofactor, setclickufactor] = useState(
    props.mydata.user.twoFactor
  );
  const [checkmodel, setCheckmodel] = useState(false);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    console.log(clicktwofactor);
  }, [clicktwofactor]);
  const fetchmyprofile = async () => {
    const response = await axios.get(process.env.NEXT_PUBLIC_FRONTEND_URL +":3001/profile/users/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  };
  const handlerclickleave = async (e, id) => {
    e.preventDefault();
    axios
      .delete(`${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/channels/leave/${id}/users/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log(res);
      });
  };
  const handlerTwoFactor = async (e) => {
    console.log("handlerTwoFactor");
    e.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/profile/add/twoFactor`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        props.mydata.user.twoFactor = true;
        if (res.data) setRestwofactor(res.data.secret);
      });
  };
  const handlerremoveTwoFactor = async (e) => {
    e.preventDefault();
    axios
      .delete(`${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/profile/remove/twoFactor`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        props.mydata.user.twoFactor = false;
      });
  };
  const handlerclickparticipate = async (e, id) => {
    e.preventDefault();
    {
      router.push(`/Channnel/${id}`);
    }
  };
  const data = {
    username: props.mydata.user.username,
    avatar: props.mydata.user.avatar,
  };
  const [click, setClick] = useState(false);
  const [participatechannel, setParticipatechannel] = useState("");
  return (
    <div className="profile-page">
      <HomeNavbar />
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
                    <button
                      className="text-sm bg-orange-500 text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r"
                      onClick={() => {
                        setclickupdateprofile(true);
                      }}
                    >
                      Edit profile
                    </button>
                    {clickupdateprofile && (
                      <Modal
                        size="lg"
                        active={clickupdateprofile}
                        toggler={() => setclickupdateprofile(false)}
                      >
                        <UpdateProfile />
                      </Modal>
                    )}
                  </div>
                  {!clicktwofactor && (
                    <div className="flex flex-col">
                      <label
                        htmlFor="unchecked"
                        className="mt-3 inline-flex items-center cursor-pointer"
                      >
                        <span className="relative">
                          <span className="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                          <span className="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out">
                            <input
                              id="unchecked"
                              type="checkbox"
                              className="absolute opacity-0 w-0 h-0"
                              onClick={(e) => {
                                setclickufactor(!clicktwofactor);
                                setCheckmodel(true);
                                handlerTwoFactor(e);
                              }}
                            />
                          </span>
                        </span>
                        <span className="ml-3 text-sm">TwoFactor</span>
                      </label>
                    </div>
                  )}
                  {clicktwofactor && (
                    <div className="flex flex-col">
                      <label
                        htmlFor="checked"
                        className="mt-3 inline-flex items-center cursor-pointer"
                      >
                        <span className="relative">
                          <span className="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                          <span className="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 right-1 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-orange-600 transform translate-x-full">
                            <input
                              id="checked"
                              type="checkbox"
                              className="absolute opacity-0 w-0 h-0"
                              onClick={(e) => {
                                setclickufactor(!clicktwofactor);
                                handlerremoveTwoFactor(e);
                              }}
                            />
                          </span>
                        </span>
                        <span className="ml-3 text-sm">TwoFactor</span>
                      </label>
                    </div>
                  )}
                  {clicktwofactor && (
                    <Modal
                      size="lg"
                      active={checkmodel}
                      toggler={() => setCheckmodel(false)}
                    >
                      <div>Your Secret IS: {restwofactor}</div>
                    </Modal>
                  )}
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
              {click && (
                <>
                  <ul id="tabs" className="inline-flex w-full px-1 pt-2 ">
                    <li className="px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50">
                      <a
                        id="default-tab"
                        href="#first"
                        onClick={() => {
                          setClick(!click);
                        }}
                      >
                        My Channels
                      </a>
                    </li>
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
                      {props.myhistory?.map((stat, key) => {
                        return (
                          <li className=" y-3 sm:py-4" key={key}>
                            <div className="flex flex-row justify-around space-x-4">
                              <div className="flex-shrink-0 flex flex-row space-x-4">
                                <img
                                  className="w-8 h-8 rounded-full"
                                  src={stat.user1.avatar}
                                  alt="Neil image"
                                />
                                <div className="mt-2 flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {stat.user1.username}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                  {stat.user1.score}-{stat.user2.score}
                                </p>
                              </div>
                              <div className="flex-shrink-0 flex flex-row space-x-4">
                                <div className="mt-2 flex-1 min-w-0">
                                  <p className=" text-sm font-medium text-gray-900 dark:text-white">
                                    {stat.user2.username}
                                  </p>
                                </div>
                                <img
                                  className="w-8 h-8 rounded-full"
                                  src={stat.user2.avatar}
                                  alt="Neil image"
                                />
                              </div>
                              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                Vicotry
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              )}
              {!click && (
                <>
                  <ul id="tabs" className="inline-flex w-full px-1 pt-2 ">
                    <li className="px-4 py-2 -mb-px font-semibold text-gray-800 border-b-2 border-orange-400 rounded-t opacity-50">
                      <a id="default-tab" href="#first">
                        My Channels
                      </a>
                    </li>
                    <li className="px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50">
                      <a
                        id="default-tab"
                        href="#first"
                        onClick={() => {
                          setClick(!click);
                        }}
                      >
                        History Game
                      </a>
                    </li>
                  </ul>
                  <div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                          <thead>
                            <tr>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Name
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Admin
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Created at
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Members
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {props.mychannels?.map((stat, key) => {
                              return (
                                <tr key={key}>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0 w-10 h-10">
                                        <img
                                          className="w-full h-full rounded-full"
                                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                          alt=""
                                        />
                                      </div>
                                      <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                          {stat.name}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {stat.role}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {stat.createdAt}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {stat.members}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div
                                      role="button"
                                      aria-label="MAIN BUTTON"
                                      className="inline-flex mt-2 xs:mt-0 bg-orange-500	"
                                    >
                                      <button
                                        className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r"
                                        onClick={(e) => {
                                          handlerclickparticipate(e, stat.id);
                                        }}
                                      >
                                        Participate
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Profile;
