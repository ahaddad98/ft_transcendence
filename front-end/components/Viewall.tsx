import React from "react";
import Modal from "@material-tailwind/react/Modal";

const Viewall = ({ props, setViewclick, viewclick }) => {
  return (
    <Modal size="md" active={viewclick} toggler={() => setViewclick(false)}>
      <div className="w-full md:w-auto dark:bg-gray-800 flex flex-col justify-center items-center bg-white py-4 px-4 md:px-24 xl:py-4 xl:px-18">
        <button
          onClick={() => {
            setViewclick(false);
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
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            History Game
          </h3>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="w-full divide-y divide-gray-200 dark:divide-gray-700"
          >
            <li className="y-3 sm:py-4">
              <div className="flex flex-row justify-around space-x-12">
                <div className="flex-shrink-0 flex flex-row space-x-12">
                  <div className="mt-2 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Username
                    </p>
                  </div>
                </div>
                <div className="">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white"></p>
                </div>
                <div className="flex-shrink-0 flex flex-row space-x-4">
                  <div className="mt-2 flex-1 min-w-0">
                    <p className=" text-sm font-medium text-gray-900 dark:text-white">
                      Username
                    </p>
                  </div>
                </div>
              </div>
            </li>
            {props.data.map((stat, key) => {
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
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Modal>
  );
};
export default Viewall;
