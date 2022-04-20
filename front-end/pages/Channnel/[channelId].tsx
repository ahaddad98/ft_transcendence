import React, { useEffect, useReducer, useState } from "react";
import HomeNavbar from "../../components/HomeNavbar";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import ChannelPage from "../../components/channelpage";
import axios from "axios";
import { Router, useRouter } from "next/router";
import { MydataProvider } from "../../components/mydataprovider";

const Channel = () => {
  // console.log('1555');
  
  const [mychannel, setMychannel] = useState({});
  const [allmychannel, setAllmychannel] = useState();
  const [convid, setconvid] = useState();
  const [chanid, setchanid] = useState();
  const router = useRouter();
  // const { query, isReady } = useRouter();
  const fetchAllmychannel = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/channels/users/me`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response;
  };
  useEffect(() => {
      fetchAllmychannel()
      .then((res) => {
        if (res.data) {
          setAllmychannel(res.data);
        }
      })
      .catch((err) => {
        router.push('home')
      });
  }, []);

  return (
    <MydataProvider>
      <div className="h-screen">
        {
          <HomeNavbar/>
        }
        { router.query.channelId  ?  <ChannelPage allmychannels={allmychannel} id={router.query.channelId} /> : <div>21321564</div>}
      </div>
    </MydataProvider>
  );
};
export default Channel;
