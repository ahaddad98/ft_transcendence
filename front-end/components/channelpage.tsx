import axios from "axios";
import React, { useEffect, useState } from "react";
import ChannelBar from "./Channelbar";
import ChannelChat from "./ChannelChat";
import HomeNavbar from "./HomeNavbar";

const ChannelPage = (props) => {
  console.log(props);
  
  const [mychannel, setMychannel] = useState({});

  const fetchmychannel = async () => {
    const response = await axios.get(
      `http://localhost:3001/channels/${props.id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response;
  };
  useEffect(() => {
    fetchmychannel()
      .then((res) => {
        if (res.data) {
          setMychannel(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [mychannelusers, setMychannelusers] = useState();

  const fetchmychannelusers = async () => {
    const response = await axios.get(
      `http://localhost:3001/channels/${props.id}/users/all`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response;
  };
  useEffect(() => {
    fetchmychannelusers()
      .then((res) => {
        if (res.data) {
          setMychannelusers(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex antialiased text-gray-800" style={{ height: "90%" }}>
      <div className="flex flex-row w-full overflow-x-hidden">
        {
          mychannel && mychannelusers && props.allmychannels  && props.mydata  && <ChannelBar mydata={props.mydata} mychannel={mychannel} mychannelusers={mychannelusers} allmychannel={props.allmychannels}></ChannelBar>
        }
        {mychannel.conversation && <ChannelChat mychannel={mychannel} />}
      </div>
    </div>
  );
};
export default ChannelPage;
