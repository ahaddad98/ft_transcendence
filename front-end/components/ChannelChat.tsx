import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Messagemap from "./Messagemap";
import { socketchannelcontext } from "../pages/home";
import { SocketAddress } from "net";
import { useRouter } from "next/router";
import { useMychannelContext } from "./mychannelprovider";

const ChannelChat = (props) => {
  let mychanneltmp: any = useMychannelContext();
  let socket = useContext(socketchannelcontext);
  useEffect(() => {
    if (props.mychannel.conversation?.id) {
      socket.emit("joinChannelConversation", props.mychannel.conversation?.id);
    }
  }, []);
  const [conversation, setConversation] = useState([]);
  const [object, setObject] = useState({ me: {}, sender: {}, content: "" });
  const fetchconsversation = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/conversations/${props.mychannel.conversation?.id}/messages`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response;
  };
  const router = useRouter()
  useEffect(() => {
    socket.on("newEventChannel", (data) => {
      props
        .fetchmychannel()
        .then((res) => {
          if (res.data) {
            props.setMychannel(res.data);
          }
        })
        .catch((err)=>{
        
          router.push('/home')
        });
    });
    return (()=>{
      socket.off('newEventChannel')
    })
  }, []);
  useEffect(() => {
    fetchconsversation()
      .then((res) => {
        if (res.data) {
          setConversation(res.data);
        }
      })
      .catch((err)=>{
        
        router.push('/home')
      });
  }, []);
  useEffect(() => {
    socket.on("newMessageChannel", (data) => {
      const me1 = props.mydata;
      const sender1 = data.sender;
      const content1 = data.message;
      setObject({ me: me1, sender: sender1, content: content1 });
    });
    // return () => {
    //   socket.off("newMessageChannel");
    // };
  }, []);
  useEffect(() => {
    if (object) {
      fetchconsversation()
        .then((res) => {
          if (res.data) {
            setConversation(res.data);
          }
        })
        .catch((err)=>{
        
          router.push('/home')
        });
    }
  }, [object]);
  const [msg, setMsg] = useState("");
  const sendmsg = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/messages/conversations/${props.mychannel.conversation?.id}/users/me`,
        {
          message: msg,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((err)=>{
        
        router.push('/home')
      });
    socket.emit("sendMessageChannel", {
      sender: props.mydata,
      message: msg,
      id: props.mychannel.conversation?.id,
    });
    setMsg("");
  };

  return (
    <div
      className="flex flex-col flex-auto  p-6  max-h-lg"
      style={{ height: "100%" }}
    >
      <div
        className="flex flex-col flex-auto flex-shrink-0 rounded-2xl  bg-gray-100 p-4 h-inherit"
        style={{ height: "100%" }}
      >
        <div
          className="flex flex-col  overflow-x-auto mb-4  "
          style={{ height: "100%" }}
        >
          <div className="flex flex-col">
            <div className="grid grid-cols-12 gap-y-2">
              {conversation ? (
                <Messagemap conv={conversation} />
              ) : (
                <div>amine</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
          <div>
            <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                ></path>
              </svg>
            </button>
          </div>
          {
            <>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                    <form onSubmit={sendmsg}>
                      {props.mychannel.mute == false &&
                        <input
                          value={msg}
                          className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                          onChange={(e) => setMsg(e.target.value)}
                        />
                      }
                    </form>
                </div>
              </div>
              <div className="ml-4">
                <button
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  onClick={sendmsg}
                >
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default ChannelChat;
