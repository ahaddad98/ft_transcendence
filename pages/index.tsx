import Head from 'next/head'
import Link from 'next/link'
import Background from '../components/Background'
import Navbar from '../components/Navbar'
import Player from '../components/Player'

export default function Home() {
  return (
    <Background>
      <Navbar />
      <Player />
      <div className="title">
      PING PONG GAME
      </div>
      <div className="parag">
      Ping Pong est un jeu de sport créé par MarketJS. Prenez l'une des pagaies numériques et vivez une expérience passionnante de ping-pong. Dans ce jeu de sport simple mais stimulant, vous devez frapper la balle du côté de la table de votre adversaire. Le premier joueur à atteindre 10 gagne le match ! Soyez donc rapide et confondez votre adversaire avec des tirs difficiles. Vous pouvez même contrôler la vitesse de vos coups en faisant attention à l'intensité de votre coup. Allez-y et battez les adversaires intelligents de l'IA de ce jeu !
      </div>
      <div className="button">
        SIGN IN
      </div>
    </Background>
  )
}
