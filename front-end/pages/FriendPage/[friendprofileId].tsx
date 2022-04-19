import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MydataProvider } from "../../components/mydataprovider";
import ProfileFriend from "../../components/ProfileFriend";

const friendprofile = () => {
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
  const router = useRouter();

  return (
    <MydataProvider>
      <div>
        {router.query.friendprofileId && (
          <ProfileFriend id={router.query.friendprofileId} />
        )}
      </div>
    </MydataProvider>
  );
};
export default friendprofile;
