import React from "react";
import './layout.module.css'
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../public/background.svg'))
// import background from "../public/background.svg";
const  Background = ({children}) =>  {
    return (
      <div className="container">
          <DynamicComponent />
          <img id="cover" src="/background.svg" />
          {children}
      </div>
    )
  }

  export default Background;