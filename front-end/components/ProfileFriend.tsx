import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FriendComponent from "./FriendComponent";
import HomeNavbar from "./HomeNavbar";

const ProfileFriend = (props) => {
    // console.log(props);
    const [myprofile, setMyprofile] = useState({});
  const [hasResult, setHasResult] = useState(false);
  const fetchmyprofile = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/profile/users/${props.id}`, {
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
        console.log(err);
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
        console.log(err);
      });
  }, []);
  // const router = useRouter()
  // const handlerclickparticipate = async (e, id) => {
  //   e.preventDefault()
  //     {
  //       router.push(`FriendPage/${id}`)
  //     }
  // };
  // const data = {
  //   username: props.mydata.user.username,
  //   avatar: props.mydata.user.avatar,
  // };
  // const [click, setClick] = useState(false);
  // const [participatechannel, setParticipatechannel] = useState("");
  return (
    <div>
      {
        hasResult && myhistory && myprofile && data && <FriendComponent mydata={myprofile} myhistory={myhistory} data={data}/>
      }
    </div>
  )
}
export default ProfileFriend;
