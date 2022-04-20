import React, { useEffect, useReducer, useState } from "react";
import HomeNavbar from "./HomeNavbar";
import PrivateConv from "./PrivateConv";
import { io, Socket } from "socket.io-client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMyContext } from "./ContextProvider";
import { MychannelProvider } from "./mychannelprovider";
import axios from "axios";
import {
  Card,
  Avatar,
  Badge,
  Result,
  Row,
  Col,
  Space,
  Modal,
  List,
} from "antd";
import { Button, notification, Image, Comment } from "antd";
import Game from "../../server/src/core/entities/game.entity";
import {
  ArrowLeftOutlined,
  PlayCircleOutlined,
  ArrowRightOutlined,
  DislikeOutlined,
  FlagOutlined,
  LikeOutlined,
  FieldNumberOutlined,
  EnvironmentOutlined,
  InfoCircleFilled,
  ArrowUpOutlined,
  ArrowDownOutlined,
  HeartOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";

const datas = [
  {
    title: "Map1",
    render: (res) => (
      <Space>
        <Image src="/default.png" />
      </Space>
    ),
  },
  {
    title: "Map2",
    render: (res) => (
      <Space>
        <Image src="/map1.png" />
      </Space>
    ),
  },
  {
    title: "Map3",
    render: (res) => (
      <Space>
        <Image src="/map2.png" />
      </Space>
    ),
  },
  {
    title: "Map4",
    render: (res) => (
      <Space>
        <Image src="/map3.png" />
      </Space>
    ),
  },
];

const ChatConversation = (props) => {
  const [clickconv, setClickconv] = useState(false);
  const [clickconvresp, setClickconvresp] = useState(false);
  const [convid, setConvid] = useState(-1);
  const [reciever, setReciever] = useState();
  const [clickprofile, setClickprofile] = useState<any>([]);
  const [profilehref, setProfilehref] = useState("false");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userInvite, setuserInvite] = useState(null);
  const [userWatch, setuserWatch] = useState(null);
  const [GameInfo, setGameInfo] = useState(null);

  let context = useMyContext();
  // let socket: any = context.socket;
  const router = useRouter();
  const hundelfriendprofile = async (e, id) => {
    e.preventDefault();
    router.push(`FriendPage/${id}`);
  };
  const hundelinvitegame = async (e, id) => {
    e.preventDefault();
    setuserInvite(id);
    context.setMydata(props.data);
    axios
      .post(process.env.NEXT_PUBLIC_FRONTEND_URL + ":3001/game/invite", {
        username1: props.data.username,
        username2: id,
        map: "default",
      })
      .then((res) => {
        if (res.data.length !== 0) {
          context.setShowCanvas({
            show: true,
            gameInfo: res.data,
          });
          setIsModalVisible(false);
          router.push("/game");
        }
      });
  };

  const hundelWatchgame = async (e, id) => {
    e.preventDefault();
    setuserWatch(id);
    context.setMydata(props.data);
    context.setShowCanvas({
      show: true,
      gameInfo: GameInfo,
    });
    setIsModalVisible(false);
    router.push("/game");
  };

  const getCurrentGameOfUser = async (data) => {
    axios
      .get(
        process.env.NEXT_PUBLIC_FRONTEND_URL +
          ":3001/game/currentMatch/" +
          data.id
      )
      .then((res) => {
        setGameInfo(res.data);
      });
  };

  return (
    <div className="h-screen justify-center">
      <div>{props.data && <HomeNavbar />}</div>
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
                {props.conversations.map((stat, key) => (
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
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex  justify-between" style={{ height: "100%" }}>
          <div
            className="hidden lg:block flex flex-col w-2/5 border-r-2 overflow-y-auto"
            style={{ height: "93%" }}
          >
            {props.conversations.map((stat, key) => (
             <React.Fragment key={key}>
              <div
              className="flex flex-row py-4 px-2 items-center border-b-2"
              key={key}
              onClick={() => {
                  setClickconv(!clickconv);
                  setConvid(stat.id);
                  setReciever(stat.user);
                  getCurrentGameOfUser(stat.user);
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
                <div>
                  <img
                    src="/menupoints.svg"
                    alt=""
                    className="cursor-pointer"
                    onClick={() => {
                      setProfilehref("FriendPage/" + stat.user.id);
                      clickprofile[key] = (!clickprofile[key]);
                    }}
                  />
                  {clickprofile[key] && (
                    <div className="absolute mb-10 w-32  z-10 bg-grey-200 group-hover:block bg-white">
                      <ul
                        className=" py-1 w-22"
                        aria-labelledby="dropdownBottomButton"
                      >
                        <li>
                          <Link href={profilehref}>
                            <p className="cursor-pointer w-22 block py-2 px-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white ">
                              View Profile
                            </p>
                          </Link>
                        </li>
                        <li>
                          <p
                            className="w-22 block py-2 px-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            onClick={(e) => {
                              hundelinvitegame(e, stat.user.username);
                            }}
                          >
                            Invite game
                          </p>
                        </li>
                        <li>
                          <p
                            className="w-22 block py-2 px-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            onClick={(e) => {
                              hundelWatchgame(e, stat.user.username);
                            }}
                          >
                            Watch game
                          </p>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              </React.Fragment>
            ))}
          </div>
          {convid !== -1 && props.data && reciever && (
            <PrivateConv convid={convid} data={props.data} reciver={reciever} />
          )}
          {convid === -1 && props.data && props.id && reciever && (
            <PrivateConv
              convid={props.id}
              data={props.data}
              reciver={reciever}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatConversation;
