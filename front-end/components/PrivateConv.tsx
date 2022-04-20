import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import Messagemapconv from "./Messagemapconv";
import { io, Socket } from "socket.io-client";
import { socketchatcontext } from "../pages/home";
import { useRouter } from "next/router";

const PrivateConv = (props) => {

  let socket = useContext(socketchatcontext)
  useEffect(() => {
    socket.emit("addUser", props.data.id);
  }, [socket]);
  const [conversation, setConversation] = useState([]);
  const fetchconsversation = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/conversations/${props.convid}/messages`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response;
  };
  const [conversationdata, setConversationdata] = useState();
  const [object, setObject] = useState({me:{}, sender:{id: -1}, receiver:{}, content: ""});
  const fetchconsversationdata = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/conversations/${props.convid}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response;
  };
  const router = useRouter()
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (conversation.length == 0)
    {
      fetchconsversation()
      .then((res) => {
        if (res.data) {
          setConversation(res.data);
        }
      })
      .catch((err) => {
        router.push('/home')  
        });
    }
  }, []);
  useEffect(() => {
    if (conversation.length >= 0)
    {
      fetchconsversation()
      .then((res) => {
        if (res.data) {
          setConversation(res.data);
        }
      })
      .catch((err) => {
        router.push('/home')  
        });
    }
  }, [props.convid]);

  useEffect(() => {
    socket.on("newMessage", (data) => {
      const me1 = props.data;
      const sender1 = data.sender;
      const receiver1 = data.receiver;
      const content1 = data.message;
      setObject({me: me1, sender:sender1, receiver:receiver1, content:content1});
    });
    return(()=>{
      socket.off('newMessage')
    })
  }, []);

  useEffect(() => {
    if(object)
      if(props.reciver.id == object.sender?.id)
        setConversation((conversation) => [...conversation, object]);
  }, [object])
  const sendmsg = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/messages/conversations/${props.convid}/users/me`,
        {
          message: msg,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
      }).catch((err) => {
        router.push('/home')  
      });
      if (conversation) {
        fetchconsversation()
        .then((res) => {
          if (res.data) {
            setConversation(res.data);
          }
        })
        .catch((err) => {
          router.push('/home')  
        });
      socket.emit("sendMessage", {
        sender: props.data,
        message: msg,
        receiver: props.reciver,
      });
    }
    setMsg("");
  };
  return (
    <div
      className="w-full py-2 flex flex-col justify-between"
      style={{ height: "95%" }}
    >
      <div
        className="flex flex-col  overflow-x-auto "
        style={{ height: "100%" }}
      >
        {conversation && <Messagemapconv conversation={conversation} />}
      </div>
      <div className="py-5">
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
          <div className="flex-grow ml-4">
            <div className="relative w-full">
              <form onSubmit={sendmsg} id="myForm">
                <input
                  type="text"
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                />
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
        </div>
      </div>
    </div>
  );
};
export default PrivateConv;
