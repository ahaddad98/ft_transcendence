import React from "react";

const Submitmessage = (props) => {
  return (
    <>
      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <form onSubmit={props.sendmsg}>
            {props.mychannel.mute == false && (
              <input
                // type="text"
                value={props.msg}
                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                onChange={(e) => props.setMsg(e.target.value)}
              />
            )}
          </form>
        </div>
      </div>
      <div className="ml-4">
        <button
          className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
          onClick={props.sendmsg}
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
  );
};

export default Submitmessage;
