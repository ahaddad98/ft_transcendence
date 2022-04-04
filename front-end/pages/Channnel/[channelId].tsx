import React, { useEffect, useReducer, useState } from "react";
import HomeNavbar from "../../components/HomeNavbar";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import ChannelPage from "../../components/channelpage";
import axios from "axios";
import { Router, useRouter } from "next/router";

const Channel = () => {
  const [mychannel, setMychannel] = useState({});
  const [allmychannel, setAllmychannel] = useState();
  const [convid, setconvid] = useState();
  const [chanid, setchanid] = useState();
  const router = useRouter();
  const fetchAllmychannel = async () => {
    const response = await axios.get(
      `http://localhost:3001/channels/users/me`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    return response;
  }
  useEffect(() => {
    fetchAllmychannel()
      .then((res) => {
        if (res.data) {
          setAllmychannel(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);
  const [data, setData] = useState({});

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/users/me", {
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

  return (
    <div className="h-screen">
      { 
        <HomeNavbar data={data} />
      }
      {allmychannel && router.query.channelId  && <ChannelPage allmychannels={allmychannel} id={router.query.channelId} mydata={data} />}
    </div>
  );
};
export default Channel;
