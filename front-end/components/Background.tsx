import React from "react";
import dynamic from 'next/dynamic'
import MediaQuery from "react-responsive";

const  Background = ({children}) =>  {
    return (
      <div className="container">
        <MediaQuery minWidth={1060}>
          <img id="cover" src="/background.svg" />
        </MediaQuery>
          {children}
      </div>
    )
  }

  export default Background;