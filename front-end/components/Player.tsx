import React from "react";
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../public/background.svg'))
const  Player = () =>  {
    return (
      <div className="container">
          <img id="player" src="/player.svg" />
      </div>
    )
  }

  export default Player;