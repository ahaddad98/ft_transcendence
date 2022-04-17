import React, { useEffect, useState } from "react";
import HomeNavbar from "./HomeNavbar";
import PrivateConv from "./PrivateConv";
import { io, Socket } from "socket.io-client";

const ChatConversation = (props) => {
  const [clickconv, setClickconv] = useState(false);
  const [clickconvresp, setClickconvresp] = useState(false);
  const [convid, setConvid] = useState(-1);
  const [reciever, setReciever] = useState();

  return (
    <div className="h-screen justify-center">
      <div>{props.data && <HomeNavbar  />}</div>
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
                {props.conversations.map((stat, key) => 
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
                        <span className="text-gray-500">
                          {stat.user.message}
                        </span>
                      </div>
                    </div>
                 )}
              </div>
            )}
          </div>
        </div>
        <div
          className="flex  justify-between"
          style={{ height: "100%" }}
        >
          <div
            className="hidden lg:block flex flex-col w-2/5 border-r-2 overflow-y-auto"
            style={{ height: "93%" }}
          >
            {props.conversations.map((stat, key) => 
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
             )}
          </div>
          {convid !== -1 && props.data && reciever && <PrivateConv convid={convid} data={props.data}  reciver={reciever}/>}
          {convid === -1 && props.data && props.id && reciever && <PrivateConv convid={props.id} data={props.data}  reciver={reciever}/>}
        </div>
      </div>
    </div>
  );
};

export default ChatConversation;
