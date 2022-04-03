import React, { useState } from "react";
import Modal from "@material-tailwind/react/Modal";
import { useRouter } from "next/router";

const ChannelBar = (props) => {
   console.log(props);
  const router = useRouter()
  const [viewchannels, setViewchannles] = useState(false);
  const [imowner, setImowner] = useState(false);
  const [Clickmember, setClickmember] = useState(false);
  const handlerclickparticipate = async (e, id) => {
    e.preventDefault()
    setViewchannles(!viewchannels)  
    {
        router.push(`/Channnel/${id}`);
      }
  };
  return (
    <div>
      {
        props.mychannelusers.owner?.username === props.mydata.username && setImowner(!imowner)
      }
      <div className="flex flex-col py-8 pl-6 pr-2 w-72 bg-white flex-shrink-0">
        <div className="flex flex-row items-center justify-center h-12 w-full">
          <div className="ml-2 font-bold text-2xl">{props.mychannel.name}</div>
        </div>
        <div className="flex flex-col items-center bg-orange-300 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
          <div className="h-20 w-20 rounded-full border overflow-hidden">
            <img
              src={props.mychannelusers.owner?.avatar}
              alt="Avatar"
              className="w-full"
            />
          </div>
          <div className="text-sm font-semibold mt-2">
            {props.mychannelusers.owner?.username}
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="flex flex-row items-center justify-between text-xs">
            <span className="font-bold">Members</span>
            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
              {props.mychannel.members}
            </span>
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
            {props.mychannelusers.users.map((stat, key) => {
              return (
                <button
                  className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                  key={key}
                  onClick={()=>{
                    setClickmember(!Clickmember)
                  }}
                >
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    <img src={stat.avatar} />
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    {stat.username}
                  </div>
                </button>
              );
            })}
            {
              Clickmember && imowner && (
                <Modal
                size="lg"
                active={viewchannels}
                toggler={() => setViewchannles(false)}
              >
                <div className="w-full md:w-auto dark:bg-gray-800 flex flex-col justify-center items-center bg-white  md:px-24 xl:py-4 xl:px-18">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                      Channels List
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
                      </tr>
                    </thead>
                    <tbody>
                      {props.allmychannel.map((stat, key) => {
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
                              <p className="text-gray-900 whitespace-no-wrap">43</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div
                                role="button"
                                aria-label="MAIN BUTTON"
                                className="inline-flex mt-2 xs:mt-0 bg-orange-500	"
                              >
                                <button className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r"
                                onClick={(e)=>{
                                    handlerclickparticipate(e, stat.id)
                                  }}>
                                  Join
                                </button>
                              </div>
                            </td>
                          </tr>
                         );
                      })} 
                    </tbody>
                  </table>
                </div>
              </Modal>
              )
            }
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="flex flex-row items-center justify-between text-xs">
            <span className="font-bold">Admins</span>
            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
              {props.mychannelusers.admins.length}
            </span>
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
            {props.mychannelusers.admins.map((stat, key) => {
              return (
                <button
                  className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                  key={key}
                >
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    H
                  </div>
                  <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 bg-orange-500 font-semibold py-2 px-4 rounded-r"
              onClick={() => {
                setViewchannles(!viewchannels);
              }}
            >
              Switch channel
            </button>
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
                  Channels List
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
                  </tr>
                </thead>
                <tbody>
                  {props.allmychannel.map((stat, key) => {
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
                          <p className="text-gray-900 whitespace-no-wrap">43</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div
                            role="button"
                            aria-label="MAIN BUTTON"
                            className="inline-flex mt-2 xs:mt-0 bg-orange-500	"
                          >
                            <button className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r"
                            onClick={(e)=>{
                                handlerclickparticipate(e, stat.id)
                              }}>
                              Join
                            </button>
                          </div>
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
    </div>
  );
};

export default ChannelBar;
