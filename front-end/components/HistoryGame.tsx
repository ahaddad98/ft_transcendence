import React, { useState } from "react";
import Viewall from "./Viewall";
import MediaQuery, { useMediaQuery } from "react-responsive";

const HistoryGame = (props) => {

  const [viewclick, setViewclick] = useState(false);
  return (
    <>
      {viewclick && (
        <Viewall
          props={props}
          setViewclick={setViewclick}
          viewclick={viewclick}
        />
      )}
  
      <div className="mt-20 w-full lg:w-1/2">
        <div className=" w-10/12 mx-auto">
          <div className="w-full p-4 max-w-md-83 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                History Games
              </h3>
            </div>
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
                    {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      WIN
                    </div> */}
                  </div>
                </li>
                {props.data.map((stat, key) => 
                <React.Fragment key={key}>
                  {
                    key < 3 && 
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
                        {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          Vicotry
                        </div> */}
                      </div>
                    </li>
                  }
                </React.Fragment>
            )}
              </ul>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <div
                  role="button"
                  aria-label="MAIN BUTTON"
                  className="inline-flex mt-2 xs:mt-0 bg-orange-500	"
                >
                  <button
                    className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r"
                    onClick={() => {
                      setViewclick(!viewclick);
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
   

    </>
  );
};

export default HistoryGame;
