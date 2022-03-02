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
      <div>
      </div>
    </Background>
  )
}
