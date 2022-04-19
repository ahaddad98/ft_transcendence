import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ChatConversation from "../../components/Chatconversation";
import HomeNavbar from "../../components/HomeNavbar";
import { MydataProvider } from "../../components/mydataprovider";

const Conversation = () => {
  const router = useRouter();
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
  const [Conversations, setConversations] = useState();

  const fetchConversations = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_FRONTEND_URL +":3001/conversations/private/users/me",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
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
    <MydataProvider>
      <>
        {data && Conversations && router.query.conversationId && (
          <ChatConversation
            id={router.query.conversationId}
            data={data}
            conversations={Conversations}
          />
        )}
      </>
    </MydataProvider>
  );
};
export default Conversation;
