import React from "react";
import ListUseres from "../components/Listuseres";
import { io, Socket } from "socket.io-client";

const ListuseresCompon = (props) => {
  return (
    <ListUseres
      // data={props.data}
      socket={props.socket}
      // fetchData={props.fetchData}
      // setData={props.setData}
      mydata={props.mydata}
    />
  );
};
export default ListuseresCompon;
