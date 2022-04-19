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
  const [clickprofile, setClickprofile] = useState(false);
  const [profilehref, setProfilehref] = useState("false");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userInvite, setuserInvite] = useState(null);
  // let context = useMyContext();
  // let socket: any = context.socket;
  const router = useRouter();
  const hundelfriendprofile = async (e, id) => {
    e.preventDefault();
    router.push(`FriendPage/${id}`);
  };
  const hundelinvitegame = async (e, id) => {
    e.preventDefault();
    setuserInvite(id);
    isModalVisible(true);
    // axios.post(process.env.NEXT_PUBLIC_FRONTEND_URL + ":3001/game/invite",
    // {
    //     "username1": MyData['username'],
    //     "username2": data['username'],
    //     "map": item.title
    // })
    // .then(res => {
    //     if (res.data.length !== 0) {
    //         setData(res.data);
    //         context.setShowCanvas(
    //             {
    //                 show: true,
    //                 gameInfo: res.data
    //             }
    //         )
    //         setOneTime(1);
    //         setIsModalVisible(false);
    //         // socket = io(process.env.NEXT_PUBLIC_FRONTEND_URL + ':3080');
    //         socket.emit("notificationServer",
    //             {
    //                 data: res.data,
    //                 idUser: res.data['user2']['id']
    //             });
    //     }
    // });
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="h-screen justify-center">
      {/* {isModalVisible && (
        <Modal
          title="Choose A Map To Play"
          visible={true}
          onOk={handleOk}
          maskClosable={true}
          mask={true}
          onCancel={handleCancel}
          style={{ top: "10%", width: "100%", height: "100%" }}
          footer={[]}
        >
          <div style={{ padding: "24px", width: "100%", height: "100%" }}>
            <Space>
              <Comment
                content={
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "25px",
                      fontFamily: "Ro",
                    }}
                  >
                    <h3>Rules:</h3>
                    <li>
                      You Press [<ArrowUpOutlined /> or W] key to Move Up{" "}
                    </li>
                    <li>
                      You Press [<ArrowDownOutlined /> or S] key to Move Down{" "}
                    </li>
                    <li>You Press [P] or Space key to Pause the Game</li>
                    <li>
                      You can join back to play befor 10s(click [P] or Space) or
                      you lose{" "}
                    </li>
                    <li>If you Quit the Game , You will lose </li>
                    <li>
                      Good Luck <HeartOutlined />{" "}
                    </li>
                  </div>
                }
              />
            </Space>
          </div>
          <div>
            <List
              grid={{
                gutter: 16,
                column: 4,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 4,
              }}
              dataSource={datas}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    title={
                      <Space direction="vertical">
                        {item.title}
                        <Button
                          type="primary"
                          onClick={() => {
                            {
                              axios
                                .post(
                                  process.env.NEXT_PUBLIC_FRONTEND_URL +
                                    ":3001/game/invite",
                                  {
                                    username1: props.data.user.username,
                                    username2: userInvite,
                                    map: item.title,
                                  }
                                )
                                .then((res) => {
                                  if (res.data.length !== 0) {
                                    // setData(res.data);

                                    context.setShowCanvas({
                                      show: true,
                                      gameInfo: res.data,
                                    });
                                    // setOneTime(1);
                                    setIsModalVisible(false);
                                    // socket = io(process.env.NEXT_PUBLIC_FRONTEND_URL + ':3080');
                                    // socket.emit("notificationServer", {
                                    //   data: res.data,
                                    //   idUser: res.data["user2"]["id"],
                                    // });
                                  }
                                });
                            }
                          }}
                        >
                          Play
                        </Button>
                      </Space>
                    }
                  >
                    {item.render(item)}
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </Modal>
      )} */}
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
                <div>
                  <img
                    src="/menupoints.svg"
                    alt=""
                    className="cursor-pointer"
                    onClick={() => {
                      setProfilehref("FriendPage/" + stat.user.id);
                      setClickprofile(!clickprofile);
                    }}
                  />
                  {clickprofile && (
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
                          {/* <Link href="/"> */}
                          <p
                            className="w-22 block py-2 px-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            onClick={(e) => {
                              hundelinvitegame(e, stat.user.username)
                            }}
                          >
                            Invite game
                          </p>
                          {/* </Link> */}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
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
