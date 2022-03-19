import axios from "axios";
import React, { useEffect, useState } from "react";

const LeaderBoard = (props) => {
    
    return (
      <div className="mt-20 w-1/2">
      <div className="  w-10/12 mx-auto">
        <div className="p-4 max-w-md-83 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">LEADER BOARD</h3>
         </div>
         <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className=" y-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                    <div>
                      Rank
                      </div>
                          <div className="flex-shrink-0">
                              Avatar
                          </div>
                          <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                  Username
                              </p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              Status
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              Score
                          </div>
                      </div>
                  </li>
                    {props.data.map((stat, key) =>{
                        return (
                           <li className=" y-3 sm:py-4" key={key}>
                                <div className="flex items-center space-x-4">
                                    <div>
                                        {key+1}
                                      </div>
                                          <div className="flex-shrink-0">
                                              <img className="w-8 h-8 rounded-full" src={stat.user.avatar} alt="Neil image" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                              {stat.user.username}
                                              </p>
                                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                              {stat.user.email}
                                              </p>
                                          </div>
                                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                              ONLINE
                                          </div>
                                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                              {stat.level+1}
                                          </div>
                                    </div>
                            </li>
                        )
                    })}
              </ul>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
				    <div role="button" aria-label="MAIN BUTTON"  className="inline-flex mt-2 xs:mt-0 bg-orange-500	">
				    	<button 
                className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r">
                  View all
              </button>
                    </div>
				    </div>
         </div>
        </div>
      </div>
    </div>
    )
}
export default LeaderBoard;