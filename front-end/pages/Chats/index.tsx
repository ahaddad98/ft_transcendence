import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ChatConversation from "../../components/Chatconversation";
import HomeNavbar from "../../components/HomeNavbar";

const Conversation = () => {
  const router = useRouter();
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
  const [Conversations, setConversations] = useState();

  const fetchConversations = async () => {
    const response = await axios.get("http://localhost:3001/conversations/private/users/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  };
  useEffect(() => {
    fetchConversations()
      .then((res) => {
        if (res.data) setConversations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
    {
      data && Conversations &&  <ChatConversation id={undefined} data={data} conversations={Conversations}/>
    }
    </>
  );
};
export default Conversation;