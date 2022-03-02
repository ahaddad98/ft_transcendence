import React from "react";
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../public/background.svg'))
const  Background = ({children}) =>  {
    return (
      <div className="container">
          <img id="cover" src="/background.svg" />
          {children}
      </div>
    )
  }

  export default Background;