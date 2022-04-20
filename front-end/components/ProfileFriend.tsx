import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FriendComponent from "./FriendComponent";
import HomeNavbar from "./HomeNavbar";

const ProfileFriend = (props) => {
    const [myprofile, setMyprofile] = useState({});
  const [hasResult, setHasResult] = useState(false);
  const fetchmyprofile = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/profile/users/${props.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  };
  const router = useRouter()
  useEffect(() => {
    fetchmyprofile()
      .then((res) => {
        if (res.data) {
          setMyprofile(res.data);
          setHasResult(true);
        }
      })
      .catch((err) => {
        router.push('/home')
      });
  }, []);
  const [myhistory, setMyhistory] = useState();

  const fetchmyhistory = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/game/history/users/${props.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
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
        router.push('/home')
      });
  }, []);
  const [data, setData] = useState({});

  const fetchData = async () => {
    const response = await axios.get(process.env.NEXT_PUBLIC_FRONTEND_URL +":3001/users/me", {
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
        router.push('/home')
      });
  }, []);
  return (
    <div>
      {
        hasResult && myhistory && myprofile && data && <FriendComponent mydata={myprofile} myhistory={myhistory} data={data}/>
      }
    </div>
  )
}
export default ProfileFriend;
