import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import ChannelBar from "./Channelbar";
import ChannelChat from "./ChannelChat";
import HomeNavbar from "./HomeNavbar";
import { useMydataContext } from "./mydataprovider";
import { socketchannelcontext } from "../pages/home";
import { MychannelProvider } from "./mychannelprovider";
const ChannelPage = (props) => {
  let socket = useContext(socketchannelcontext);
  let data1: any = useMydataContext();
  const [mychannel, setMychannel] = useState<any>();
  const router = useRouter();
  const fetchmychannel = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/channels/${props.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response;
    } catch {
      // router.push("/myprofile");
    }
  };
  const [mychannelusers, setMychannelusers] = useState();

  const fetchmychannelusers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/channels/${props.id}/users/all`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response;
    } catch {
      // router.push("/myprofile");
    }
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
        // router.push("/myprofile");
      });
  }, []);

  useEffect(() => {
    fetchmychannelusers()
      .then((res) => {
        if (res.data) {
          setMychannelusers(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        // router.push("/myprofile");
      });
      return (()=>{
        false
      })
  }, []);

  return (
    <MychannelProvider>
      <div className="flex antialiased text-gray-800" style={{ height: "90%" }}>
        <div className="flex flex-row w-full overflow-x-hidden">
          {mychannel && mychannelusers && props.allmychannels && (
            <ChannelBar
              mychannel={mychannel}
              setMychannelusers={setMychannelusers}
              fetchmychannelusers={fetchmychannelusers}
              mychannelusers={mychannelusers}
              allmychannel={props.allmychannels}
              fetchmychannel={fetchmychannel}
              setMychannel={setMychannel}
            ></ChannelBar>
          )}
          {mychannel && mychannel.conversation && (
            <ChannelChat
              mydata={data1.data}
              mychannel={mychannel}
              fetchmychannel={fetchmychannel}
              setMychannel={setMychannel}
              id={props.id}
            />
          )}
        </div>
      </div>
    </MychannelProvider>
  );
};
export default ChannelPage;
