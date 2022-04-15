import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import Listfriends from "../components/Listfriends";
import { socketcontext } from "./home";

const Friend = (props) => {
  const [data, setData] = useState();
  const socket = useContext(socketcontext);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/friends/users/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  };
  useEffect(() => {
    fetchData()
      .then((res) => {
        if (res.data) setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [mydata, setmyData] = useState({});

  const fetchmyData = async () => {
    const response = await axios.get("http://localhost:3001/users/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  };
  useEffect(() => {
    fetchmyData()
      .then((res) => {
        if (res.data) setmyData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {data && mydata && (
        <>
          <HomeNavbar data={mydata} />
          <Listfriends socket={socket} data={data} fetchData={fetchData} setData={setData}/>
        </>
      )}
    </div>
  );
};
export default Friend;
