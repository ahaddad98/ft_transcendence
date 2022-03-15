import Head from 'next/head'
import Link from 'next/link'
import Background from '../components/Background'
import Navbar from '../components/Navbar'
import Player from '../components/Player'
import MediaQuery from "react-responsive";
import axios from 'axios';
import SignIN from '../components/Signin'
import { useState } from 'react'
const App = ({data}) => {
  return (
    <Background>
      <Navbar />
      <MediaQuery minWidth={1060}>
      <Player />
      <div className="title">
      PING PONG GAME
      </div>
      <div className="parag">
      Ping Pong est un jeu de sport créé par MarketJS. Prenez l'une des pagaies numériques et vivez une expérience passionnante de ping-pong. Dans ce jeu de sport simple mais stimulant, vous devez frapper la balle du côté de la table de votre adversaire.
      </div>
      <div>
        <SignIN />
      </div>
      </MediaQuery>
      <MediaQuery maxWidth={1060}>
      <div className="title-resp">
      PING PONG GAME
      </div>
      <div className="parag-resp">
        <p style={{ textAlign: "justify", lineHeight: 1.6 }}>
        Ping Pong est un jeu de sport créé par MarketJS. Prenez l'une des pagaies numériques et vivez une expérience passionnante de ping-pong. Dans ce jeu de sport simple mais stimulant, vous devez frapper la balle du côté de la table de votre adversaire.
        </p>
      </div>
      <div className="button-resp">
        <div>
      <Link href="/about">
        SIGN IN
        </Link>
        </div>
      </div>
      </MediaQuery> 
    </Background>
  )
}
export default App;