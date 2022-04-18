import React, { useState } from "react";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import DropdownLink from "@material-tailwind/react/DropdownLink";
import { blue } from "@mui/material/colors";

const Messagemapconv = (props) => {
  // console.log(props);
  return (
    <>
      {props.conversation.map((stat, key) => (
        <React.Fragment key={key}>
          <div className="flex flex-col mt-5 flex-shrink-0 rounded-2xl ">
            {stat.sender.username === stat.me.username && (
              <div className="flex justify-end mb-4">
                <div className="mr-2 py-3 px-4 bg-orange-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  {stat.content}
                </div>
                <img
                  src={stat.sender.avatar}
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                ></img>
              </div>
            )}
            {stat.sender.username !== stat.me.username && (
              <div className="flex justify-start mb-4">
                <img
                  src={stat.sender.avatar}
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
                <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                  {stat.content}
                </div>
              </div>
            )}
          </div>
        </React.Fragment>
      ))}
    </>
  );
};
export default Messagemapconv;
