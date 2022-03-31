import React, { useEffect, useReducer, useState } from "react";
import HomeNavbar from "../../components/HomeNavbar";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import ChannelPage from "../../components/channelpage";
import axios from "axios";
import { Router, useRouter } from "next/router";

const Channel = () => {
  let data = {
    username: "badboy",
    avatar: "",
  };

  const [mychannel, setMychannel] = useState({});
  const [allmychannel, setAllmychannel] = useState([]);
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
    // const res = await response.data;
    return response;
  }
  //   console.log(response);
    
  // };
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
  const fetchmychannel = async (id) => {
    const response = await axios.get(`http://localhost:3001/channels/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  };
  useEffect(() => {
    fetchAllmychannel().then((res)=>{

      if (router?.query?.channelId) 
      {
         setchanid(router.query.channelId);
      }
      else
      chid = res[0].id;
      }
    // console.log(salam);
    
    );
    fetchmychannel(chid)
      .then((res) => {
        if (res.data) {
          setMychannel(res.data);
          // setconvid(res.data.conversation.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [allmychannel]);

  // conversation
  // channel data url="/channels/id"
  // post message in Channel components
  // admins
  // members

  return (
    <>
      <HomeNavbar data={data} />
      {mychannel && <ChannelPage mychannels={mychannel} />}
    </>
  );
};
export default Channel;
