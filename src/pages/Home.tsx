import React from "react";
// import Background from "../components/Background";
import "../styles/components/style.css"
//@ts-ignore
import player from "../assets/player.svg"
//@ts-ignore
import {ReactComponent as Background} from "../assets/background.svg"
//@ts-ignore
import {ReactComponent as Logo} from "../assets/logo.svg"
// import button_singin from "../assets/button_singin.svg"
import { NavLink } from "react-router-dom";
const Home = () => {
    return (
        <div className="home">
            <Background className="bg">
            </Background>
            <div className="background">
                <div className="Section1">
                <Logo className="logo" />
                    <h1 className="title">PING PONG GAME</h1>
                    <p className="parag">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, corporis. Magni enim sit eos quia ad dicta beatae sint, esse modi at unde asperiores dolor eaque laudantium, voluptates provident suscipit.
                    </p>
                    <button className="button">SIGN IN</button>
                </div>
                <div className="navigation">
                <NavLink className={(navData) => navData.isActive ? "nav-active" : "" }  to="/" 
                    >
                    Home
                </NavLink>
                <NavLink className={(navData) => navData.isActive ? "nav-active" : "" }  to="/" 
                    >
                    About
                </NavLink>
                <NavLink className={(navData) => navData.isActive ? "nav-active" : "" }  to="/" 
                    >
                    Learning
                </NavLink>
                <NavLink className={(navData) => navData.isActive ? "nav-active" : "" }  to="/" 
                    >
                    Servises
                </NavLink>
                    {/* <section className="home-button">
                        Home
                    </section> */}
                </div>
                <div className="Section2">
                <img src={player} />
                </div>
            </div>
        </div>
    );
}
export default Home;