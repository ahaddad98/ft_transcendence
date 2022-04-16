import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import LeaderBoard from "../components/LeaderBoard";
import ChannlesList from "../components/ChannelsList";
import HistoryGame from "../components/HistoryGame";
import ListUseres from "../components/Listuseres";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { io, Socket } from "socket.io-client";
let socket = io("http://localhost:6209");
let socketchat = io("http://localhost:3080");
export const socketcontext = React.createContext(socket);
export const socketchatcontext = React.createContext(socketchat);
import mydataProvider from "../stats/mydata";
import { useMyContext } from "../components/ContextProvider";
import { MydataProvider } from "../components/mydataprovider";

const Home = () => {
  const [channel, setChannel] = useState([]);

  const fetchChannel = async () => {
    const response = await axios.get("http://localhost:3001/channels/home", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  };
  useEffect(() => {
    fetchChannel()
      .then((res) => {
        if (res.data) setChannel(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [stats, setStats] = useState([]);
  const fetchStats = async () => {
    const response = await axios.get(
      "http://localhost:3001/users/leaderboard",
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    return response;
  };
  useEffect(() => {
    fetchStats()
      .then((res) => {
        if (res.data) {
          setStats(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [history, setHistory] = useState([]);
  const fetchhistory = async () => {
    const response = await axios.get(
      "http://localhost:3001/game/history/home",
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    return response;
  };
  useEffect(() => {
    fetchhistory()
      .then((res) => {
        if (res.data) {
          setHistory(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <MydataProvider>
        <div>
          <HomeNavbar></HomeNavbar>
          <div className="flex flex-col lg:flex-row">
            {stats && <LeaderBoard data={stats} />}
            {history && <HistoryGame data={history} />}
          </div>
          {channel && <ChannlesList data={channel} />}
        </div>
      </MydataProvider>
    </>
  );
};

export default Home;
