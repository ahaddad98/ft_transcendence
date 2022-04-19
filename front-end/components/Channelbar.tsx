import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "@material-tailwind/react/Modal";
import { useRouter } from "next/router";
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverHeader from "@material-tailwind/react/PopoverHeader";
import PopoverBody from "@material-tailwind/react/PopoverBody";
import Button from "@material-tailwind/react/Button";
import axios from "axios";
import { MydataProvider, useMydataContext } from "./mydataprovider";
import { socketchannelcontext } from "../pages/home";
import { useMychannelContext } from "./mychannelprovider";

const ChannelBar = (props) => {
  let mychanneltmp: any = useMychannelContext();
  let socket = useContext(socketchannelcontext);
  const [userid, setUserid] = useState(-1);
  let data1: any = useMydataContext();
  const buttonRef = useRef();
  const router = useRouter();
  const [viewchannels, setViewchannles] = useState(false);
  const [selectedpassword, setSelectedPassword] = useState("");
  const [imowner, setImowner] = useState(false);
  const [imadmin, setImadmin] = useState(false);
  const [Clickmember, setClickmember] = useState(false);
  const [Clickadmin, setClickadmin] = useState(false);
  const [Clickban, setClickban] = useState(false);
  const [Clickmute, setClickmute] = useState(false);
  const [isban1, setisban1] = useState(false);
  const [ismute1, setIsmute1] = useState(false);
  const [isbanadmin, setisbanadmin] = useState(false);
  const [ismuteadmin, setIsmuteadmin] = useState(false);
  const [isresetpassword, setIsresetpassword] = useState(false);
  const [isedit, setIsedit] = useState(false);
  let isban = false;
  let ismute = false;
  const [selectedtime, setSelectedtime] = useState("");
  const handlerclickparticipate = async (e, id) => {
    e.preventDefault();
    setViewchannles(!viewchannels);
    {
      router.push(`/Channnel/${id}`);
    }
  };

  useEffect(() => {
    socket.on("newEventChannel", (data) => {
      props
        .fetchmychannelusers()
        .then((res) => {
          if (res.data) {
            props.setMychannelusers(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
          router.push("/myprofile");
        });
    });
  }, []);
  useEffect(() => {
    if (props.mychannelusers.owner?.username === data1.data.username) {
      setImowner(true);
    } else if (props.mychannel.myRole === "admin") {
      setImadmin(true);
    } else {
      setImadmin(false);
      setImowner(false);
    }
  }, [props]);
  useEffect(() => {
    if (props.mychannelusers.owner?.username === data1.data.username) {
      setImowner(true);
    } else if (props.mychannel.myRole === "admin") {
      setImadmin(true);
    }
    if (props.mychannel?.id) {
      socket.emit("joinChannel", props.mychannel?.id);
    } else {
      setImadmin(false);
      setImowner(false);
    }
  }, []);
  const hundelkickuser = async (e) => {
    e.preventDefault();
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/channels/kick/${props.mychannel.id}/users/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        socket.emit("eventChannel", {
          id: props.mychannel?.id,
        });
      });
  };
  const hundelsetasadmin = async (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/channels/admin/${props.mychannel.id}/users/${userid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        socket.emit("eventChannel", {
          id: props.mychannel?.id,
        });
      });
    setClickmember(false);
    setClickadmin(false);
  };
  const hundelfireadmin = async (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/channels/user/${props.mychannel.id}/users/${userid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        socket.emit("eventChannel", {
          id: props.mychannel?.id,
        });
      });
    setClickmember(false);
    setClickadmin(false);
  };
  const hundelsubmittime = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("time", selectedtime);
    axios
      .put(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/channels/ban/${props.mychannel.id}/users/${userid}`,
        {
          time: selectedtime,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        socket.emit("eventChannel", {
          id: props.mychannel?.id,
        });
      });
    setClickmember(false);
    setClickadmin(false);
    setClickban(false);
  };
  const handlerclickleave = async (e, id) => {
    e.preventDefault();
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/channels/leave/${id}/users/me`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        socket.emit("leaveRoom", {
          id: props.mychannel?.id,
        });
        router.push("/home");
      });
  };
  const hundelsubmiteditpassword = async (e, id) => {
    e.preventDefault();
    console.log(selectedpassword);
    axios
      .put(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/channels/update/${id}/password/users/me`,{
          password: selectedpassword
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        // socket.emit("eventChannel", {
        //   id: props.mychannel?.id,
        // });
      });
  };
  const hundelremoveban = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("time", selectedtime);
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/channels/remove/ban/${props.mychannel.id}/users/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        socket.emit("eventChannel", {
          id: props.mychannel?.id,
        });
      });
    setClickmember(false);
    setClickadmin(false);
    setClickban(false);
  };
  const hundelremovemute = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("time", selectedtime);
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/channels/remove/mute/${props.mychannel.id}/users/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        socket.emit("eventChannel", {
          id: props.mychannel?.id,
        });
      });
    setClickmember(false);
    setClickadmin(false);
    setClickban(false);
  };
  const hundelsubmittimemute = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("time", selectedtime);
    axios
      .put(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/channels/mute/${props.mychannel.id}/users/${userid}`,
        {
          time: selectedtime,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        socket.emit("eventChannel", {
          id: props.mychannel?.id,
        });
      });
    setClickmember(false);
    setClickadmin(false);
    setClickmute(false);
  };
  return (
    <div>
      <div className="flex flex-col py-8 pl-6 pr-2 w-72 bg-white flex-shrink-0">
        <div className="flex flex-row items-center justify-center h-12 w-full">
          <div className="ml-2 font-bold text-2xl">{props.mychannel.name}</div>
        </div>
        <div className="flex flex-col items-center bg-orange-300 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
          <div className="h-20 w-20 rounded-full border overflow-hidden">
            <img
              src={props.mychannelusers.owner?.avatar}
              alt="Avatar"
              className="w-full"
            />
          </div>
          <div className="text-sm font-semibold mt-2">
            {props.mychannelusers.owner?.username}
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="flex flex-row items-center justify-between text-xs">
            <span className="font-bold">Members</span>
            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
              {props.mychannelusers.usersNumber}
            </span>
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
            {props.mychannelusers?.users.map((stat, key) => (
              <React.Fragment key={key}>
                <button
                  className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 border-0"
                  key={key}
                  onClick={() => {
                    setClickmember(!Clickmember);
                    setUserid(stat.id);
                    if (stat.stat === "ban") {
                      setisban1(true);
                      setIsmute1(false);
                    } else if (stat.stat === "mute") {
                      setisban1(false);
                      setIsmute1(true);
                    } else {
                      setisban1(false);
                      setIsmute1(false);
                    }
                  }}
                >
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full border-0">
                    <img src={stat.avatar} />
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    {stat.username}
                  </div>
                  {stat.stat == "ban" && (
                    <div className="ml-32 text-sm font-semibold">
                      <img src="/ban.svg" alt="" />
                    </div>
                  )}
                  {stat.stat == "mute" && (
                    <div className="ml-32 text-sm font-semibold">
                      <img src="/mute.svg" alt="" />
                    </div>
                  )}
                </button>
                {Clickmember && imowner && ismute1 && (
                  <Modal
                    size="lg"
                    active={Clickmember}
                    toggler={() => setClickmember(false)}
                  >
                    <div className="w-full md:w-auto dark:bg-gray-800 flex flex-col justify-center items-center bg-white  md:px-24 xl:py-4 xl:px-18">
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32 w-32"
                          onClick={(e) => {
                            hundelkickuser(e);
                          }}
                        >
                          Kicke
                        </button>
                      </div>
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={() => {
                            setClickban(!Clickban);
                          }}
                        >
                          Ban
                        </button>
                      </div>
                      {Clickban && (
                        <form onSubmit={(e) => hundelsubmittime(e)}>
                          <div className="w-32">
                            <div>
                              <input
                                type="text"
                                id="time"
                                placeholder="Time"
                                className="bg-indigo-50 px-2 py-2 outline-none rounded-md w-32 mt-1"
                                onChange={(e) =>
                                  setSelectedtime(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </form>
                      )}
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={(e) => {
                            setClickmute(!Clickmute);
                            hundelremovemute(e);
                          }}
                        >
                          Remove Mute
                        </button>
                      </div>
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={(e) => {
                            hundelsetasadmin(e);
                          }}
                        >
                          Set as admin
                        </button>
                      </div>
                    </div>
                  </Modal>
                )}
                {Clickmember && imadmin && ismute1 && (
                  <Modal
                    size="lg"
                    active={Clickmember}
                    toggler={() => setClickmember(false)}
                  >
                    <div className="w-full md:w-auto dark:bg-gray-800 flex flex-col justify-center items-center bg-white  md:px-24 xl:py-4 xl:px-18">
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={(e) => {
                            hundelkickuser(e);
                          }}
                        >
                          Kicke
                        </button>
                      </div>

                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={() => {
                            setClickban(!Clickban);
                          }}
                        >
                          Ban
                        </button>
                      </div>
                      {Clickban && (
                        <form onSubmit={(e) => hundelsubmittime(e)}>
                          <div className="w-32">
                            <div>
                              <input
                                type="text"
                                id="time"
                                placeholder="Time"
                                className="bg-indigo-50 px-2 py-2 outline-none rounded-md w-32 mt-1"
                                onChange={(e) =>
                                  setSelectedtime(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </form>
                      )}
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={(e) => {
                            setClickmute(!Clickmute);
                            hundelremovemute(e);
                          }}
                        >
                          Remove Mute
                        </button>
                      </div>

                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={(e) => {
                            hundelsetasadmin(e);
                          }}
                        >
                          Set as admin
                        </button>
                      </div>
                    </div>
                  </Modal>
                )}
                {Clickmember && imowner && isban1 && (
                  <Modal
                    size="lg"
                    active={Clickmember}
                    toggler={() => setClickmember(false)}
                  >
                    <div className="w-full md:w-auto dark:bg-gray-800 flex flex-col justify-center items-center bg-white  md:px-24 xl:py-4 xl:px-18">
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={(e) => {
                            setClickban(!Clickban);
                            hundelremoveban(e);
                          }}
                        >
                          Remove Ban
                        </button>
                      </div>
                    </div>
                  </Modal>
                )}
                {Clickmember && imadmin && isban1 && (
                  <Modal
                    size="lg"
                    active={Clickmember}
                    toggler={() => setClickmember(false)}
                  >
                    <div className="w-full md:w-auto dark:bg-gray-800 flex flex-col justify-center items-center bg-white  md:px-24 xl:py-4 xl:px-18">
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={() => {
                            setClickban(!Clickban);
                            hundelremoveban;
                          }}
                        >
                          Remove Ban
                        </button>
                      </div>
                    </div>
                  </Modal>
                )}
                {Clickmember && imowner && !isban1 && !ismute1 && (
                  <Modal
                    size="lg"
                    active={Clickmember}
                    toggler={() => setClickmember(false)}
                  >
                    <div className="w-full md:w-auto dark:bg-gray-800 flex flex-col justify-center items-center bg-white  md:px-24 xl:py-4 xl:px-18">
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32 "
                          onClick={(e) => {
                            hundelkickuser(e);
                          }}
                        >
                          Kick
                        </button>
                      </div>

                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={() => {
                            setClickban(!Clickban);
                          }}
                        >
                          Ban
                        </button>
                      </div>
                      {Clickban && (
                        <form onSubmit={(e) => hundelsubmittime(e)}>
                          <div className="w-32">
                            <div>
                              <input
                                type="text"
                                id="time"
                                placeholder="Time"
                                className="bg-indigo-50 px-2 py-2 outline-none rounded-md w-32 mt-1"
                                onChange={(e) =>
                                  setSelectedtime(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </form>
                      )}
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={() => {
                            setClickmute(!Clickmute);
                          }}
                        >
                          Mute
                        </button>
                      </div>
                      {Clickmute && (
                        <form onSubmit={(e) => hundelsubmittimemute(e)}>
                          <div className="w-32">
                            <div>
                              <input
                                type="text"
                                id="time"
                                placeholder="Time"
                                className="bg-indigo-50 px-2 py-2 outline-none rounded-md w-32 mt-1"
                                onChange={(e) =>
                                  setSelectedtime(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </form>
                      )}
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={(e) => {
                            hundelsetasadmin(e);
                          }}
                        >
                          Set as admin
                        </button>
                      </div>
                    </div>
                  </Modal>
                )}
                {Clickmember && imadmin && !isban1 && !ismute1 && (
                  <Modal
                    size="lg"
                    active={Clickmember}
                    toggler={() => setClickmember(false)}
                  >
                    <div className="w-full md:w-auto dark:bg-gray-800 flex flex-col justify-center items-center bg-white  md:px-24 xl:py-4 xl:px-18">
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={(e) => {
                            hundelkickuser(e);
                          }}
                        >
                          Kick amine
                        </button>
                      </div>
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={() => {
                            setClickban(!Clickban);
                          }}
                        >
                          Ban
                        </button>
                      </div>
                      {Clickban && (
                        <form onSubmit={(e) => hundelsubmittime(e)}>
                          <div className="w-32">
                            <div>
                              <input
                                type="text"
                                id="time"
                                placeholder="Time"
                                className="bg-indigo-50 px-2 py-2 outline-none rounded-md w-32 mt-1"
                                onChange={(e) =>
                                  setSelectedtime(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </form>
                      )}
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={() => {
                            setClickmute(!Clickmute);
                          }}
                        >
                          Mute
                        </button>
                      </div>
                      {Clickmute && (
                        <form onSubmit={(e) => hundelsubmittimemute(e)}>
                          <div className="w-32">
                            <div>
                              <input
                                type="text"
                                id="time"
                                placeholder="Time"
                                className="bg-indigo-50 px-2 py-2 outline-none rounded-md w-32 mt-1"
                                onChange={(e) =>
                                  setSelectedtime(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  </Modal>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="flex flex-row items-center justify-between text-xs">
            <span className="font-bold">Admins</span>
            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
              {props.mychannelusers.adminsNumber}
            </span>
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
            {props.mychannelusers.admins.map((stat, key) => (
              <React.Fragment key={key}>
                <button
                  className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                  key={key}
                  onClick={() => {
                    setClickadmin(!Clickadmin);
                    setUserid(stat.id);
                    if (stat.stat === "ban") {
                      setisbanadmin(true);
                      setIsmuteadmin(false);
                    } else if (stat.stat === "mute") {
                      setisbanadmin(false);
                      setIsmuteadmin(true);
                    } else {
                      setisbanadmin(false);
                      setIsmuteadmin(false);
                    }
                  }}
                >
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    <img src={stat.avatar} />
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    {stat.username}
                  </div>
                  {stat.stat == "ban" && (
                    <div className="ml-32 text-sm font-semibold">
                      <img src="/ban.svg" alt="" />
                    </div>
                  )}
                  {stat.stat == "mute" && (
                    <div className="ml-32 text-sm font-semibold">
                      <img src="/mute.svg" alt="" />
                    </div>
                  )}
                </button>
                {Clickadmin && imowner && !isbanadmin && !ismuteadmin && (
                  <Modal
                    size="lg"
                    active={Clickadmin}
                    toggler={() => setClickadmin(false)}
                  >
                    <div className="w-full md:w-auto dark:bg-gray-800 flex flex-col justify-center items-center bg-white  md:px-24 xl:py-4 xl:px-18">
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={(e) => {
                            hundelkickuser(e);
                          }}
                        >
                          Kick
                        </button>
                      </div>
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={() => {
                            setClickban(!Clickban);
                          }}
                        >
                          Ban
                        </button>
                      </div>
                      {Clickban && (
                        <form onSubmit={(e) => hundelsubmittime(e)}>
                          <div className="w-32">
                            <div>
                              <input
                                type="text"
                                id="time"
                                placeholder="Time"
                                className="bg-indigo-50 px-2 py-2 outline-none rounded-md w-32 mt-1"
                                onChange={(e) =>
                                  setSelectedtime(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </form>
                      )}
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={() => {
                            setClickmute(!Clickmute);
                          }}
                        >
                          Mute
                        </button>
                      </div>
                      {Clickmute && (
                        <form onSubmit={(e) => hundelsubmittimemute(e)}>
                          <div className="w-32">
                            <div>
                              <input
                                type="text"
                                id="time"
                                placeholder="Time"
                                className="bg-indigo-50 px-2 py-2 outline-none rounded-md w-32 mt-1"
                                onChange={(e) =>
                                  setSelectedtime(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </form>
                      )}
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={(e) => {
                            hundelfireadmin(e);
                          }}
                        >
                          Fire the admin
                        </button>
                      </div>
                    </div>
                  </Modal>
                )}
                {Clickadmin && imowner && ismuteadmin && (
                  <Modal
                    size="lg"
                    active={Clickadmin}
                    toggler={() => setClickadmin(false)}
                  >
                    <div className="w-full md:w-auto dark:bg-gray-800 flex flex-col justify-center items-center bg-white  md:px-24 xl:py-4 xl:px-18">
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={(e) => {
                            hundelkickuser(e);
                          }}
                        >
                          Kick
                        </button>
                      </div>
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={() => {
                            setClickban(!Clickban);
                          }}
                        >
                          Ban
                        </button>
                      </div>
                      {Clickban && (
                        <form onSubmit={(e) => hundelsubmittime(e)}>
                          <div className="w-32">
                            <div>
                              <input
                                type="text"
                                id="time"
                                placeholder="Time"
                                className="bg-indigo-50 px-2 py-2 outline-none rounded-md w-32 mt-1"
                                onChange={(e) =>
                                  setSelectedtime(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </form>
                      )}
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={(e) => {
                            setClickmute(!Clickmute);
                            hundelremovemute(e);
                          }}
                        >
                          Remove Mute
                        </button>
                      </div>

                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={(e) => {
                            hundelfireadmin(e);
                          }}
                        >
                          Fire the admin
                        </button>
                      </div>
                    </div>
                  </Modal>
                )}
                {Clickadmin && imowner && isbanadmin && (
                  <Modal
                    size="lg"
                    active={Clickadmin}
                    toggler={() => setClickadmin(false)}
                  >
                    <div className="w-full md:w-auto dark:bg-gray-800 flex flex-col justify-center items-center bg-white  md:px-24 xl:py-4 xl:px-18">
                      <div
                        role="button"
                        aria-label="MAIN BUTTON"
                        className="inline-flex mt-2 xs:mt-0 bg-orange-500	w-32"
                      >
                        <button
                          className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                          onClick={(e) => {
                            setClickban(!Clickban);
                            hundelremoveban(e);
                          }}
                        >
                          Remove Ban admin
                        </button>
                      </div>
                    </div>
                  </Modal>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 bg-orange-500 font-semibold py-2 px-4 rounded-r"
              onClick={() => {
                setViewchannles(!viewchannels);
              }}
            >
              Switch channel
            </button>
          </div>
        </div>
        {imowner && (
          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 bg-orange-500 font-semibold py-2 px-4 rounded-r w-34"
                onClick={() => {
                  setIsedit(!isedit);
                  setIsresetpassword(true)
                }}
              >
                Edit Password
              </button>
            </div>
          </div>
        )}
        {isedit && (
          <Modal size="lg" active={isedit} toggler={() => setIsedit(false)}>
            {isresetpassword && (
              <div className="space-y-4">
                <form onSubmit={(e)=>hundelsubmiteditpassword(e,props.mychannel.id)}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-1 text-gray-600 font-semibold w-34"
                    >
                      New Password
                    </label>
                    <input
                      type="text"
                      id="password"
                      className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                      onChange={(e) => setSelectedPassword(e.target.value)}
                    />
                  </div>
                  <button className="mt-4 w-full bg-yellow-500 font-semibold py-2 rounded-md  tracking-wide text-white">
                    <div className="h-1 mt-1">Submit</div>
                    <input type="submit" value=""></input>
                  </button>
                </form>
              </div>
            )}
          </Modal>
        )}
        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 bg-orange-500 font-semibold py-2 px-4 rounded-r"
              onClick={(e) => {
                handlerclickleave(e, props.mychannel.id);
              }}
            >
              Leave channel
            </button>
          </div>
        </div>
        {viewchannels && (
          <Modal
            size="lg"
            active={viewchannels}
            toggler={() => setViewchannles(false)}
          >
            <div className="w-full md:w-auto dark:bg-gray-800 flex flex-col justify-center items-center bg-white  md:px-24 xl:py-4 xl:px-18">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Channels List
                </h3>
              </div>
              <button
                onClick={() => {
                  setViewchannles(false);
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
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Admin
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created at
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Members
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {props.allmychannel.map((stat, key) => (
                    <tr key={key}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {stat.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {stat.role}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {stat.createdAt}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">43</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div
                          role="button"
                          aria-label="MAIN BUTTON"
                          className="inline-flex mt-2 xs:mt-0 bg-orange-500	"
                        >
                          <button
                            className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r w-32"
                            onClick={(e) => {
                              handlerclickparticipate(e, stat.id);
                            }}
                          >
                            Join
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ChannelBar;
