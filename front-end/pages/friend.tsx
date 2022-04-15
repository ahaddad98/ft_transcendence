import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import Listfriends from "../components/Listfriends";
import { socketcontext } from "./home";

const Friend = () => {
  const socket = useContext(socketcontext);
  return (
    <div>
      <HomeNavbar/>
        <>
          <Listfriends socket={socket}  />
        </>
    </div>
  );
};
export default Friend;
