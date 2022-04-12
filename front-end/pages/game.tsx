import exp from "constants";
import React from "react";
import { useRef, useEffect } from "react";
import { useState } from "react";
import "antd/dist/antd.css";
import { Card, Avatar, Badge, Result, Row, Col, Space, Modal, List } from "antd";
import { ArrowLeftOutlined, PlayCircleOutlined, ArrowRightOutlined, DislikeOutlined, FlagOutlined, LikeOutlined, FieldNumberOutlined, EnvironmentOutlined, InfoCircleFilled, ArrowUpOutlined, ArrowDownOutlined, HeartOutlined, PauseCircleOutlined } from "@ant-design/icons";
// import Canvas from "./Game";
import axios from "axios";
import MatchLive from "../components/MatchLive";
// import Leaderboard from "./leaderboard";
import { MyProvider, useMyContext } from "../components/ContextProvider";
const { Meta } = Card;

import { Button, notification, Image, Comment } from 'antd';
import { Content } from "antd/lib/layout/layout";
// import Choose from "./choices";
import moment from "moment";
import Canvas from "../components/Canvas";
// const DemoBox = props => <p className={`height-${props.value}`} >{props.children}</p>;
// import "../styles/components/playgame";
import HomeNavbar from "../components/HomeNavbar";
import { io, Socket } from "socket.io-client";


const contentStyle = {
    height: '30%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    fontSize: '2em',
    background: 'transparent',
    margin: '5%% auto',
    zIndex: '2',
};

const datas = [
    {
        title: 'Map1',
        render: (res) =>
            <Space>
                <Image src="/default.png" />
            </Space>,

    },
    {
        title: 'Map2',
        render: (res) =>
            <Space>
                <Image src="/map1.png" />
            </Space>,

    },
    {
        title: 'Map3',
        render: (res) =>
            <Space>
                <Image src="map3.png" />
            </Space>,

    },
    {
        title: 'Map4',
        render: (res) =>
            <Space>
                <Image src="map4.png" />
            </Space>,
    },
];

const Game = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [MyData, setMyData] = useState([]);
    const [isRandom, setisRandom] = useState(-1);
    const [oneTime, setOneTime] = useState(0);
    const [oneTime1, setOneTime1] = useState(0);
    const [choosable, setChoosable] = useState(false);
    let context: any = useMyContext();
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3001/users/me', {
            headers:
                { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(res => {
            if (res.data) {
                setMyData(res.data);
            }
        }).catch((err) => {
        });
        return response;
    };
    useEffect(() => {
        if (MyData.length === 0)
            fetchData();
        // console.log(MyData);
    }, [MyData, context.ShowCanvas])


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);

    };

    // add event for button
    const handleClick = (e: any) => {
    };


    //create close for component
    const handleClose = (e: any) => {
    };

    const close = (key: string, data: string) => {
        axios.get("http://localhost:3001/game/invited/reject/" + MyData['id'] + "/" + data['id']).then(res => {

            socket.emit('ConnectServer', {
                GameInfo: res.data,
                idUser: MyData['id'],
            });
            notification.close(key);
        });
    };
    // const [ShowCanvas, setShowCanvas] = useState(false);
    const onclick = (key: string, data: any) => {
        // console.log(data);
        axios.get("http://localhost:3001/game/invited/confirm/" + MyData['id'] + '/' + data['id']).then(res => {
            // console.log('data',res.data);
            context.setShowCanvas(
                {
                    gameInfo: res.data,
                    show: true
                }
            )
            // setOneTime1(0);
            notification.close(key);
        });
    };
    const openNotification = (data: any) => {
        const key = `open${Date.now()}`;
        const btn = (
            <div>
                <Button type="primary" size="small" onClick={() => onclick(key, data)}>
                    Confirm
                </Button>
                <span> </span>
                <Button size="small" style={{ background: 'red' }} onClick={() => close(key, data)}>
                    Reject
                </Button>
            </div>
        );
        notification.open({
            message: data['user1']['username'] + ' is inviting You to play a game',
            description:
                'Do you want to play',
            btn,
            key,
            style: {
                zIndex: 3,
            },
            duration: 100,
            // onClose: close,
        });
    };
    let socket: Socket;

    const fetradom = async () => {
        axios.get("http://localhost:3001/users/random/" + MyData['id'])
            .then(res => {
                setData(res.data);
                setOneTime(1);
            });
    };
    useEffect(() => {
        let i: number = 0;
        // openNotification("Hello");
        socket = io('http://localhost:3080');
        socket.on("notificationClient", (msg) => {
            if (msg.idUser == MyData['id']) {

                openNotification(msg.data);
            }
        });
        // const inter = setInterval(() => {
        if (MyData.length !== 0 && oneTime1 === 0) {
            // axios.get("http://localhost:3001/game/is_invited/" + MyData['id'])
            //     .then(res => {
            //         if (res.data['id'] !== undefined && oneTime1 === 0) {
            //             context.setShowCanvas(
            //                 {
            //                     show: false,
            //                     gameInfo: res.data
            //                 }
            //             );
            //             setOneTime1(1);
            //             openNotification(res.data)
            //         }
            //     });
        }
        fetradom();


    }, [MyData, context.ShowCanvas]);
    return (
        <div>
            <HomeNavbar data={MyData} />
            <link
                rel="stylesheet"
                href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
            />
            <link
                rel="stylesheet"
                href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
            />
            <Content style={{ padding: '5%' }}>
                <div style={{ textAlign: 'center' }}>
                    {context.ShowCanvas.show &&
                        <Canvas data={context.ShowCanvas['gameInfo']} mydata={MyData} />
                    }
                </div>
                {!context.ShowCanvas.show &&
                    <Row justify="center" align="top" gutter={[48, 32]}>
                        <Col span={18} push={6} style={{ background: 'white' }} >
                            {/* <div className="ant-col { xs: 10, sm: 16, md: 24, lg: 32 }"> */}
                            {!context.ShowCanvas.show &&
                                <div style={{ width: "auto", height: "auto" }}>
                                    <MatchLive />
                                </div>
                            }
                            {/* </div> */}
                        </Col>
                        <Col span={6} pull={18} style={{ background: 'transparent' }}>

                            <div style={{ width: "auto", height: "auto" }}>

                                <Card
                                    id="_card"
                                    style={{ width: "auto", height: "auto" }}
                                    loading={MyData['id'] === undefined && data['id'] === undefined}
                                    cover={
                                        <div style={{ textAlign: 'center' }}>
                                            <Badge.Ribbon text="online" style={{ backgroundColor: '#87d068', width: "auto", height: "auto" }} placement='start' />
                                            <Avatar shape="square" style={{ width: "50%", height: "auto", borderRadius: "20px" }} src={data['avatar']} />
                                        </div>
                                    }
                                    actions={
                                        [
                                            <ArrowLeftOutlined key="previous" onClick={() => { fetradom(); }} />,
                                            <PlayCircleOutlined
                                                key="play" onClick={() => {
                                                    setisRandom(0);
                                                    setIsModalVisible(true);
                                                }} />,
                                            <ArrowRightOutlined key="next" onClick={() => { fetradom(); }} />]}>
                                    <Meta
                                        title={data['username']}
                                        description={
                                            <ul>
                                                <i id="icons" style={{ width: "auto", height: "auto", margin: "auto", borderRadius: "20px" }}>
                                                    <li>
                                                        <FieldNumberOutlined /> : Level {data['level']}
                                                    </li>
                                                    <li>
                                                        <LikeOutlined /> : wins {data['wins']} Match(s)
                                                    </li>

                                                    <li>
                                                        <DislikeOutlined /> : lost {data['loses']} Match(s)
                                                    </li>
                                                    <li>
                                                        <FlagOutlined /> : Quit {data['quit']} Match(s)
                                                    </li>
                                                </i>
                                            </ul>}
                                    />
                                </Card>

                            </div>
                            <div className="ant-col { xs: 10, sm: 16, md: 24, lg: 32 }">
                                {!context.ShowCanvas.show && <Button id="btnp" size="large"
                                    style={{
                                        width: "100%", height: "auto", zIndex: "999", color: "white", background: "#fa982f",
                                        border: "none", marginTop: "10px"
                                    }}

                                    onClick={() => {
                                        setIsModalVisible(true);
                                        setisRandom(1);
                                    }}>
                                    <div id="_random_match">
                                        Random Match
                                    </div>
                                    <div id="_txt_random_match">
                                        <PlayCircleOutlined />
                                    </div>
                                </Button>
                                }
                            </div>
                        </Col>
                    </Row>
                }
                {/* {!context.ShowCanvas.show &&
                    <Row justify="center" align="top" gutter={[48, 32]}>
                        <Col span={6} pull={18} style={{ background: 'transparent' }} >
                         

                        </Col>
                    </Row>
                } */}
                {isModalVisible && <Modal title="Choose A Map To Play" visible={true} onOk={handleOk} maskClosable={true} mask={true} onCancel={handleCancel} style={{ top: "10%", width: "100%", height: "100%" }}
                    footer={[
                    ]}>
                    <div style={{ padding: "24px", width: "100%", height: "100%" }}>
                        <Space>
                            <Comment content={
                                <div style={{ textAlign: "center", fontSize: "25px", fontFamily: "Ro" }} >
                                    <h3 >
                                        Rules:
                                    </h3>
                                    <li>You Press [< ArrowUpOutlined /> or W] key to Move Up  </li>
                                    <li>You Press [<ArrowDownOutlined />  or S] key to Move Down </li>
                                    <li>You Press [P]  or Space key to Pause the Game</li>
                                    <li>You can join back to play befor 10s(click [P] or Space) or you lose </li>
                                    <li>If you Quit the Game , You will lose the game </li>
                                    <li>Good Luck <HeartOutlined /> </li>
                                </div>
                            }
                            />
                        </Space>
                    </div>
                    <div>
                        <List
                            grid={{ gutter: 16, column: 4, xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
                            dataSource={datas}
                            renderItem={item => (
                                <List.Item>
                                    <Card title={
                                        <Space direction="vertical">
                                            {item.title}
                                            <Button type="primary" onClick={() => {
                                                if (isRandom === 1) {
                                                    axios.get("http://localhost:3001/game/matchmaking/" + MyData["id"] + '/' + item.title)
                                                        .then(res => {
                                                            if (res.data.length !== 0) {
                                                                context.setShowCanvas(
                                                                    {
                                                                        show: true,
                                                                        gameInfo: res.data
                                                                    }
                                                                )
                                                            }
                                                            setIsModalVisible(false);
                                                            setisRandom(-1);
                                                        }
                                                        )
                                                }
                                                else if (isRandom === 0) {
                                                    axios.post("http://localhost:3001/game/invite",
                                                        {
                                                            "username1": MyData['username'],
                                                            "username2": data['username'],
                                                            "map": item.title
                                                        })
                                                        .then(res => {
                                                            if (res.data.length !== 0) {
                                                                setData(res.data);
                                                                context.setShowCanvas(
                                                                    {
                                                                        show: true,
                                                                        gameInfo: res.data
                                                                    }
                                                                )
                                                                setOneTime(1);
                                                                setIsModalVisible(false);
                                                                socket = io('http://localhost:3080');
                                                                socket.emit("notificationServer",
                                                                    {
                                                                        data: res.data,
                                                                        idUser: res.data['user2']['id']
                                                                    });
                                                            }
                                                        });
                                                }
                                            }}>
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
                }

            </Content >
        </div>
    )
}

export default Game;