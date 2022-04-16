import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import Listfriends from "../components/Listfriends";
import { socketcontext } from "./home";
import { MydataProvider } from "../components/mydataprovider";

const Friend = () => {
  const socket = useContext(socketcontext);
  return (
    <MydataProvider>

    <div>
      <HomeNavbar/>
        <>
          <Listfriends socket={socket}  />
        </>
    </div>
    </MydataProvider>
  );
};
export default Friend;
