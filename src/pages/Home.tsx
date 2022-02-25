import React from "react";
// import Background from "../components/Background";
import "../styles/components/style.css"
//@ts-ignore
import player from "../assets/player.svg"
//@ts-ignore
import {ReactComponent as Background} from "../assets/background.svg"
// import button_singin from "../assets/button_singin.svg"

const Home = () => {
    return (
        <div className="home">
            <Background className="bg" />
            <div className="background">
                <div className="Section1">
                    <h1 className="title">PING PONG GAME</h1>
                    <p className="Section3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, corporis. Magni enim sit eos quia ad dicta beatae sint, esse modi at unde asperiores dolor eaque laudantium, voluptates provident suscipit.
                    <br ></br>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni assumenda optio ea eligendi laboriosam odit nobis atque nostrum sit, dolorum commodi eius repudiandae reiciendis aut consectetur labore temporibus hic maxime? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab rem incidunt odio minima, reiciendis ipsam facilis porro omnis sit similique ipsa corrupti dolore, dolores a numquam quibusdam eum expedita amet?
                    </p>
                    <button className="button">SING IN</button>
                </div>
                <div className="Section2">
                <img src={player} />
                </div>
            </div>
        </div>
    );
}
export default Home;