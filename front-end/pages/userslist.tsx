import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import ListUseres from "../components/Listuseres";
import { io, Socket } from "socket.io-client";
import ListuseresCompon from "../components/Listuserscompon";
import { socketcontext } from "./home";
import { MydataProvider } from "../components/mydataprovider";

const UsersList = () => {
  const socket = useContext(socketcontext);
  return (
    <MydataProvider>
    <div>
      <HomeNavbar />
      <ListUseres socket={socket} />
    </div>
    </MydataProvider>
  );
};

export default UsersList;
