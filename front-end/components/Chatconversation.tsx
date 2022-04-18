import React, { useEffect, useState } from "react";
import HomeNavbar from "./HomeNavbar";
import PrivateConv from "./PrivateConv";
import { io, Socket } from "socket.io-client";

const ChatConversation = (props) => {
  const [clickconv, setClickconv] = useState(false);
  const [clickconvresp, setClickconvresp] = useState(false);
  const [convid, setConvid] = useState(-1);
  const [reciever, setReciever] = useState();
  const [clickprofile, setClickprofile] = useState(false);
  return (
    <div className="h-screen justify-center">
      <div>{props.data && <HomeNavbar />}</div>
      <div
        className="lg:mt-10 container mx-auto shadow-lg rounded-lg flex"
        style={{ height: "80%" }}
      >
        <div className="px-5 py-5 flex justify-between items-center  border-b-2">
          <div
            className="font-semibold text-2xl text-orange-500"
            onClick={() => {
              setClickconvresp(false);
            }}
          >
            GoingChat
          </div>
          <div className="lg:hidden font-semibold text-2xl text-orange-500">
            <button
              className="outline-none menu-button"
              onClick={() => {
                setClickconvresp(true);
              }}
            >
              <img src="/members.svg"></img>
            </button>
            {clickconvresp && (
              <div
                className=" absolute right-0 py-2 mt-2 bg-white rounded-md shadow-xl  w-full  md:w-600 "
                style={{ height: "500px" }}
              >
                {props.conversations.map((stat, key) => (
                  <div
                    className="flex flex-row py-4 px-2 items-center border-b-2"
                    key={key}
                    onClick={() => {
                      setClickconv(!clickconv);
                      setConvid(stat.id);
                      setReciever(stat.user);
                    }}
                  >
                    <div className="w-1/4">
                      <img
                        src={stat.user.avatar}
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="w-full">
                      {stat.user.username}
                      <div className="text-lg font-semibold"></div>
                      <span className="text-gray-500">{stat.user.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex  justify-between" style={{ height: "100%" }}>
          <div
            className="hidden lg:block flex flex-col w-2/5 border-r-2 overflow-y-auto"
            style={{ height: "93%" }}
          >
            {props.conversations.map((stat, key) => (
              <div
                className="flex flex-row py-4 px-2 items-center border-b-2"
                key={key}
                onClick={() => {
                  setClickconv(!clickconv);
                  setConvid(stat.id);
                  setReciever(stat.user);
                }}
              >
                <div className="w-1/4">
                  <img
                    src={stat.user.avatar}
                    className="object-cover h-12 w-12 rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-full">
                  {stat.user.username}
                  <div className="text-lg font-semibold"></div>
                  <span className="text-gray-500">{stat.user.message}</span>
                </div>
                <div>
                  <img
                    src="/menupoints.svg"
                    alt=""
                    className="cursor-pointer"
                    onClick={() => {
                      setClickprofile(!clickprofile);
                    }}
                  />
                  {
                    clickprofile && 
                    <div className="absolute mb-10 w-32  z-10 bg-grey-200 group-hover:block bg-white">
                      <ul
                        className=" py-1 w-22"
                        aria-labelledby="dropdownBottomButton"
                      >
                        <li>
                          {/* <Link href="/myprofile"> */}
                          <p className="cursor-pointer w-22 block py-2 px-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white ">
                            View Profile
                          </p>
                          {/* </Link> */}
                        </li>
                        <li>
                          {/* <Link href="/"> */}
                          <p
                            className="w-22 block py-2 px-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            onClick={() => {
                             
                            }}
                          >
                            Invite game
                          </p>
                          {/* </Link> */}
                        </li>
                      </ul>
                    </div>
                  }
                </div>
              </div>
            ))}
          </div>
          {convid !== -1 && props.data && reciever && (
            <PrivateConv convid={convid} data={props.data} reciver={reciever} />
          )}
          {convid === -1 && props.data && props.id && reciever && (
            <PrivateConv
              convid={props.id}
              data={props.data}
              reciver={reciever}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatConversation;
