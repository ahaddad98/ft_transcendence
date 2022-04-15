import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import Listfriends from "../components/Listfriends";
import { socketcontext } from "./home";

const Friend = (props) => {
  // const [data, setData] = useState([]);
  const socket = useContext(socketcontext);
  // const fetchData = async () => {
  //   const response = await axios.get("http://localhost:3001/friends/users/me", {
  //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //   });
  //   return response;
  // };
  // useEffect(() => {
  //   fetchData()
  //   .then((res) => {
  //     if (res.data) setData(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }, []);
  const [mydata, setmyData] = useState({});
  
  const fetchmyData = async () => {
    const response = await axios.get("http://localhost:3001/users/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  };
  useEffect(() => {
    console.log('freind dtadad');
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
      {mydata && (
        <>
          <HomeNavbar data={mydata} />
          <Listfriends socket={socket}  />
        </>
      )}
    </div>
  );
};
export default Friend;
