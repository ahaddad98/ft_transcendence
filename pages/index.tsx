import Head from 'next/head'
import Link from 'next/link'
import Background from '../components/Background'
import Navbar from '../components/Navbar'
import Player from '../components/Player'
import MediaQuery from "react-responsive";

export default function Home() {
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
      <div className="button">
        SIGN IN
      </div>
      </MediaQuery> 
    </Background>
  )
}
