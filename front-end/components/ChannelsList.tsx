import React, { useContext, useState } from "react";
import Modal from "@material-tailwind/react/Modal";
import Checkbox from "@material-tailwind/react/Checkbox";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import Radio from "@material-tailwind/react/radio";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { socketchannelcontext } from "../pages/home";
const ChannlesList = (props) => {
  let socket = useContext(socketchannelcontext)
  const router = useRouter();
  const [isjoin, setIsjoin] = useState(false);
  const [isjoinpublic, setIsjoinpublic] = useState(false);
  const [isjoinprivate, setIsjoinprivate] = useState(false);
  const [statuus, setStatus] = useState(0);
  const [selectedname, setSelectedname] = useState("");
  const [selectedpassword, setSelectedPassword] = useState("");
  const [selectedpasswordjoin, setSelectedPasswordjoin] = useState("");
  const [createchannel, setCreatechannel] = useState(false);
  const [viewchannels, setViewchannles] = useState(false);
  const [isprivate, setIsprivate] = useState(false);
  const hundelsubmitprivate = async (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.NEXT_PUBLIC_FRONTEND_URL +":3001/channels/create/private/users/me",
        {
          name: selectedname,
          password: selectedpassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setCreatechannel(!createchannel);
      });
  };
  const hundelsubmitprivatejoin = async (e, id) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("password", selectedpasswordjoin);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/channels/join/${id}/private/users/me`,
        {
          password: selectedpasswordjoin,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
        )
        .then((res) => {
          console.log('im in then');
          console.log(res);
          router.push(`/Channnel/${id}`);
        })
      .catch((res)=>{
        console.log('im in catch');
        router.push(`/home`);
      })
      ;
  };
  const hundelsubmitpublic = async (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.NEXT_PUBLIC_FRONTEND_URL +":3001/channels/create/public/users/me",
        {
          name: selectedname,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setCreatechannel(!createchannel);
      });
  };
  const hundelsubmitpublicjoin = async (e, id) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/channels/join/${id}/public/users/me`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        {
          router.push(`/Channnel/${id}`);
        }
      });
  };
  const hundelsubmit = async (e) => {
    if (isprivate) hundelsubmitprivate(e);
    if (!isprivate) hundelsubmitpublic(e);
  };
  return (
    <div className="flex justify-center">
      <div className="w-3/5 mt-14 bg-white p-8 rounded-md">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">Channels</h2>
          </div>
          <div className="flex items-center justify-between">
            <div className="lg:ml-40 ml-10 space-x-8">
              <button
                className="hover:bg-orange-400 bg-orange-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                onClick={() => {
                  setCreatechannel(!createchannel);
                }}
              >
                Create Channel
              </button>
            </div>
          </div>
        </div>
        {
          <Modal
            size="lg"
            active={createchannel}
            toggler={() => setCreatechannel(false)}
          >
            <ModalHeader toggler={() => setCreatechannel(false)}>
              Create Channel
            </ModalHeader>
            <ModalBody>
              <form onSubmit={hundelsubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-1 text-gray-600 font-semibold"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                      onChange={(e) => setSelectedname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-80 mb-4"></div>
                <Radio
                  color="orange"
                  text="Public"
                  id="option-1"
                  name="option"
                  onClick={() => {
                    setIsprivate(false);
                  }}
                ></Radio>
                <Radio
                  color="orange"
                  text="Private"
                  id="option-2"
                  name="option"
                  className="mb-10"
                  onClick={() => {
                    setIsprivate(true);
                  }}
                ></Radio>
                {isprivate && (
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-1 text-gray-600 font-semibold"
                      >
                        Password
                      </label>
                      <input
                        type="text"
                        id="password"
                        className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                        onChange={(e) => setSelectedPassword(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                <button className="mt-4 w-full bg-yellow-500 font-semibold py-2 rounded-md  tracking-wide text-white">
                  <div className="h-1 mt-1">
                  Create
                  </div>
                  <input type="submit" value="">
                    </input>
                </button>
              </form>
            </ModalBody>
          </Modal>
        }
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
                  {props.data.map((stat, key) => 
                      <React.Fragment key={key}>
                      {
                        key < 3 && 
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
                              {stat.owner.username}
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
                              {stat.type === "private" && (
                                <>
                                  <button
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r"
                                    onClick={() => {
                                      setIsjoinprivate(!isjoinprivate);
                                    }}
                                  >
                                    Join
                                  </button>
                                  {isjoinprivate && (
                                    <Modal
                                      size="lg"
                                      active={isjoinprivate}
                                      toggler={() =>
                                        setIsjoinprivate(!isjoinprivate)
                                      }
                                    >
                                      <ModalBody>
                                        <form
                                          onSubmit={(e) =>
                                            hundelsubmitprivatejoin(e, stat.id)
                                          }
                                        >
                                          <div className="space-y-4">
                                            <div>
                                              <label
                                                htmlFor="email"
                                                className="block mb-1 text-gray-600 font-semibold"
                                              >
                                                Password
                                              </label>
                                              <input
                                                type="text"
                                                id="password"
                                                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                                onChange={(e) => {
                                                  setSelectedPasswordjoin(
                                                    e.target.value
                                                  );
                                                }}
                                              />
                                            </div>
                                          </div>
                                          {
                                            <button className="mt-4 w-full bg-yellow-500 font-semibold py-2 rounded-md  tracking-wide">
                                              <div className="h-1 text-white">
                                                Join
                                                </div>
                                              <Link href="/channel">
                                                <input
                                                  type="submit"
                                                  value=""
                                                />
                                              </Link>
                                            </button>
                                          }
                                        </form>
                                      </ModalBody>
                                    </Modal>
                                  )}
                                </>
                              )}
                              {stat.type === "public" && (
                                <>
                                  <button
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r"
                                    onClick={(e) => {
                                      hundelsubmitpublicjoin(e, stat.id);
                                    }}
                                  >
                                    Join
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                          <td>
                            {stat.type === "private" && (
                              <div className="mt-6">
                                <img src="/private.svg" alt="" />
                              </div>
                            )}
                          </td>
                        </tr>
                      }
                      </React.Fragment>
                  )}
                </tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <div className="inline-flex mt-2 xs:mt-0">
                  <button
                    className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 bg-orange-500 font-semibold py-2 px-4 rounded-r"
                    onClick={() => {
                      setViewchannles(!viewchannels);
                    }}
                  >
                    View all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {viewchannels && (
        <Modal
          size="lg"
          active={viewchannels}
          toggler={() => setViewchannles(false)}
        >
          <div className="w-full md:w-auto dark:bg-gray-800 flex flex-col justify-center items-center bg-white  md:px-24 xl:py-4 xl:px-18">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                LEADER BOARD
              </h3>
            </div>
            <button
              onClick={() => {
                setViewchannles(false);
              }}
              className="text-gray-800 dark:text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              aria-label="close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
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
                  {props.data.map((stat, key) => {
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
                            {stat.owner.username}
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
                            {stat.type === "private" && (
                              <>
                                <button
                                  className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r"
                                  onClick={() => {
                                    setIsjoinprivate(!isjoinprivate);
                                  }}
                                >
                                  Join
                                </button>
                                {isjoinprivate && (
                                  <Modal
                                    size="lg"
                                    active={isjoinprivate}
                                    toggler={() =>
                                      setIsjoinprivate(!isjoinprivate)
                                    }
                                  >
                                    <ModalBody>
                                      <form
                                        onSubmit={(e) =>
                                          hundelsubmitprivatejoin(e, stat.id)
                                        }
                                      >
                                        <div className="space-y-4">
                                          <div>
                                            <label
                                              htmlFor="email"
                                              className="block mb-1 text-gray-600 font-semibold"
                                            >
                                              Password
                                            </label>
                                            <input
                                              type="text"
                                              id="password"
                                              className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                              onChange={(e) => {
                                                setSelectedPasswordjoin(
                                                  e.target.value
                                                );
                                              }}
                                            />
                                          </div>
                                        </div>
                                        {
                                          <button className="mt-4 w-full bg-yellow-500 font-semibold py-2 rounded-md  tracking-wide">
                                            <Link href="/channel">
                                              <input
                                                type="submit"
                                                value="Join"
                                              />
                                            </Link>
                                          </button>
                                        }
                                      </form>
                                    </ModalBody>
                                  </Modal>
                                )}
                              </>
                            )}
                            {stat.type === "public" && (
                              <>
                                <button
                                  className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r"
                                  onClick={(e) => {
                                    hundelsubmitpublicjoin(e, stat.id);
                                  }}
                                >
                                  Join
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                        <td>
                          {stat.type === "private" && (
                            <div className="mt-6">
                              <img src="/private.svg" alt="" />
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default ChannlesList;
