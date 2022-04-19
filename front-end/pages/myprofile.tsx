import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import Profile from "../components/Profile";
import { MydataProvider } from "../components/mydataprovider";

const Myprofile = () => {
  const [myprofile, setMyprofile] = useState({});
  const [hasResult, setHasResult] = useState(false);
  const fetchmyprofile = async () => {
    const response = await axios.get(process.env.NEXT_PUBLIC_FRONTEND_URL +":3001/profile/users/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  };
  useEffect(() => {
    fetchmyprofile()
      .then((res) => {
        if (res.data) {
          setMyprofile(res.data);
          setHasResult(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [myhistory, setMyhistory] = useState();

  const fetchmyhistory = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_FRONTEND_URL +":3001/game/history/users/me",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response;
  };
  useEffect(() => {
    fetchmyhistory()
      .then((res) => {
        if (res.data) {
          setMyhistory(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [mychannel, setMychannel] = useState();
  const fetchmychannel = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_FRONTEND_URL +":3001/channels/users/me",
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
  const is_me = {
    check: true,
  };
  return (
    <MydataProvider>
      <div>
        {hasResult && mychannel && (
          <Profile
            mydata={myprofile}
            myhistory={myhistory}
            mychannels={mychannel}
            fetchmyprofile={fetchmyprofile}
            setMyprofile={setMyprofile}
          />
        )}
      </div>
    </MydataProvider>
  );
};
export default Myprofile;
