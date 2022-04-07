import axios from "axios";
import React, { useEffect, useState } from "react";
import Messagemapconv from "./Messagemapconv";

const PrivateConv = (props) => {
  console.log(props);

  const [conversation, setConversation] = useState();
  const fetchconsversation = async () => {
    const response = await axios.get(
      `http://localhost:3001/conversations/${props.convid}/messages`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response;
  };
  useEffect(() => {
    fetchconsversation()
      .then((res) => {
        if (res.data) {
          setConversation(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.mychannels]);
  const [msg, setMsg] = useState("");
  const sendmsg = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `http://localhost:3001/messages/conversations/${props.convid}/users/me`,
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
        console.log(res);
      });
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
              <form onSubmit={sendmsg}>
                <input
                  type="text"
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
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
