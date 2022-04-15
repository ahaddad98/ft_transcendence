import axios from "axios";
import { stat, Stats } from "fs";
import React, { useEffect, useState } from "react";
import HomeNavbar from "./HomeNavbar";

const ListUseres = ({ socket, ...props }) => {
  const [stater, setStat] = useState(0);
  useEffect(() => {
    socket.emit("addUser", props.mydata?.id);
  }, []);
  useEffect(() => {
    props
      .fetchData()
      .then((res) => {
        if (res.data) {
          props.setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stater]);
  useEffect(() => {
    
    socket.on("newStat", (data) => {
      console.log('aaaaaaaa');
      props
      .fetchData()
      .then((res) => {
        if (res.data) {
          props.setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }, []);
  const hundelClick1 = async (e, id, state) => {
    console.log(state);
    
    e.preventDefault();
    await axios.post(
      `http://localhost:3001/requests/users/me/friends/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      );
      setStat(stater => stater + 1);
      socket.emit("changeStat", {
        user1 : props.mydata,
        user2: state,
        stat: "requester",
      })
    };
    const hundelClick4 = async (e, req_id, state) => {
      console.log(state);
      e.preventDefault();
      await axios.delete(`http://localhost:3001/requests/${req_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStat(stater => stater + 1);
      // setStat("add");
      socket.emit("changeStat", {
        user1: props.mydata,
        user2: state,
        stat: "add",
      })
    };
    const hundelClick2 = async (e, req_id, state) => {
      console.log(state);
      e.preventDefault();
      await axios.delete(`http://localhost:3001/requests/${req_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStat(stater => stater + 1);
      // setStat("add");
      console.log('click2'+state);
      
      socket.emit("changeStat", {
        user1 : props.mydata,
        user2: state,
        stat: "add",
      })
    };
    const hundelClick3 = async (e, req_id, id, state) => {
      console.log(state);
      e.preventDefault();
      await axios.post(
        `http://localhost:3001/requests/${req_id}/users/me/friends/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
        );
        setStat(stater => stater + 1);
        socket.emit("changeStat", {
      user1 : props.mydata,
      user2: state,
      stat: "accept",
    })
  };
  return (
    <div>
      <HomeNavbar data={props.mydata} />
      <div className="mb-16">
        <div className="container flex justify-center mx-auto pt-16">
          <div>
            <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">
              USERS LIST
            </h1>
          </div>
        </div>
        <div className="w-full bg-gray-100 px-10 pt-10">
          <div className="container mx-auto">
            <div
              role="list"
              aria-label="Behind the scenes People "
              className="space-x-px lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
            >
              {props.data.map((stat, key) => {
                return (
                  <>
                    {stat.stats !== "remove" && (
                      <div
                        role="listitem"
                        className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5"
                        key={key}
                      >
                        <div className="rounded overflow-hidden shadow-md bg-white">
                          <div className="absolute -mt-20 w-full flex justify-center">
                            <div className="h-32 w-32">
                              <img
                                src={stat.avatar}
                                alt="Display Picture of Andres Berlin"
                                role="img"
                                className="rounded-full object-cover h-full w-full shadow-md"
                              />
                            </div>
                          </div>
                          <div className="px-6 mt-16">
                            <h1 className="font-bold text-3xl text-center mb-1">
                              {stat.username}
                            </h1>
                            <p className="text-gray-800 text-sm text-center">
                              {stat.level}
                              {stat.status}
                            </p>
                            <div className="w-full flex justify-center pt-5 pb-5"></div>
                            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                              <div
                                role="button"
                                aria-label="MAIN BUTTON"
                                className="inline-flex mt-2 xs:mt-0 bg-orange-500	"
                              >
                                {stat.stats === "add" && (
                                  <button
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r"
                                    onClick={(e) => {
                                      hundelClick1(e, stat.id, stat);
                                      // setStat(stat.stats);
                                    }}
                                  >
                                    <div>{stat.stats}</div>
                                  </button>
                                )}
                                {stat.stats === "recipient" && (
                                  <div className="flex flex-row ">
                                    <button
                                      className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r "
                                      onClick={(e) => {
                                        hundelClick2(e, stat.requestId, stat);
                                        // setStat(stat.stats);
                                      }}
                                    >
                                      <div>Cancel</div>
                                    </button>
                                    <button
                                      className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r"
                                      onClick={(e) => {
                                        hundelClick3(
                                          e,
                                          stat.requestId,
                                          stat.id
                                          ,stat
                                        );
                                        // setStat(stat.stats);
                                      }}
                                    >
                                      <div>Accept</div>
                                    </button>
                                  </div>
                                )}
                                {stat.stats === "requester" && (
                                  <button
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r"
                                    onClick={(e) => {
                                      hundelClick2(e, stat.requestId, stat);
                                      // setStat(stat.stats);
                                    }}
                                  >
                                    <div>Cancel</div>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListUseres;
