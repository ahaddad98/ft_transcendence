import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import ListUseres from "../components/Listuseres";
import { io, Socket } from "socket.io-client";
const UsersList = () => {
    let socket; //io("http://localhost:3085");
    console.log('asdas');
    
    const [data, setData] = useState();
    const fetchData = async () => {
        const response = await axios.get("http://localhost:3001/users/me/all", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        return response;
    };
    useEffect(() => {
        if (!data) {
            console.log("amine sba3");
            fetchData()
            .then((res) => {
                if (res.data) setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
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
    useEffect((
        socket = io("http://localhost:6209")
    ) => {}, [mydata])
  return (
    <div>
      {data && mydata && (
        <ListUseres
          data={data}
          socket={socket}
          fetchData={fetchData}
          setData={setData}
          mydata={mydata}
        />
      )}
    </div>
  );
};

export default UsersList;
