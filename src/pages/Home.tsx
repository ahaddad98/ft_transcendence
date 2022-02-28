import React from "react";
import "../styles/components/style.css";
//@ts-ignore
import player from "../assets/player.svg";
//@ts-ignore
import { ReactComponent as Background } from "../assets/background.svg";
//@ts-ignore
import { ReactComponent as Logo } from "../assets/logo.svg";
// import button_singin from "../assets/button_singin.svg"
import { NavLink } from "react-router-dom";
import MediaQuery from "react-responsive";
// import { MediaQuery } from 'react-responsive'
const Home = () => {
  return (
    <div className="home">
      <MediaQuery minWidth={1121}>
        <Background className="bg"></Background>
        <div className="background">
          <div className="Section1">
            <Logo className="logo" />
            <h1 className="title">PING PONG GAME</h1>
            <div className="paragresp">
              <p style={{ textAlign: "justify", lineHeight: 1.6 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
                corporis. Magni enim sit eos quia ad dicta beatae sint, esse
                modi at unde asperiores dolor eaque laudantium, voluptates
                provident suscipit.
              </p>
            </div>
            <div className="button">
                <div className="butt-des">SIGN IN</div>
            </div>
          </div>
          <div className="navigation">
            <div className="nav-active">
              <NavLink
                className={(navData) => (navData.isActive ? "nave-active" : "")}
                to="/"
              >
                Home
              </NavLink>
            </div>
            <div className="nav-active">
              <NavLink
                className={(navData) => (navData.isActive ? "nave-active" : "")}
                to="/"
              >
                About
              </NavLink>
            </div>
            <div className="nav-active">
              <NavLink
                className={(navData) => (navData.isActive ? "nave-active" : "")}
                to="/"
              >
                Services
              </NavLink>
            </div>
          </div>
          <div className="Section2">
            <img src={player} />
          </div>
        </div>
        </MediaQuery>
        <MediaQuery minResolution="2dppx">
            <input type="checkbox" id="active" style={{display: "none"}}/>
            <label htmlFor="active" className="menu-btn">
            <img src="https://img.icons8.com/color/48/000000/menu--v4.png"/>
              <span></span></label>
            <label htmlFor="active" className="close">
            </label>
            <div className="wrapper">
            <div>
              <NavLink
                className={(navData) => (navData.isActive ? "nave-active-resp" : "")}
                to="/"
              >
                Home
              </NavLink>
              </div>
            <div>
              <NavLink
                className={(navData) => (navData.isActive ? "nave-active-resp" : "")}
                to="/"
              >
                About
              </NavLink>
              </div>
            <div>
              <NavLink
                className={(navData) => (navData.isActive ? "nave-active-resp" : "")}
                to="/"
              >
                Services
              </NavLink>
              </div>
            </div>
        <div className="logo-resp">
          <Logo />
        </div>
        <div className="resp">
          <div style={{width: "60%"}}>
            <div>
              <h1 className="title-resp">PING PONG GAME</h1>
            </div>
            <div className="paragresp">
              <p style={{ textAlign: "justify", lineHeight: 1.6 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
                corporis. Magni enim sit eos quia ad dicta beatae sint, esse
                modi at unde asperiores dolor eaque laudantium, voluptates
                provident suscipit.
              </p>
            </div>
          </div>
        </div>
        <div className="button-resp">
          <div className="butt-des">SIGN IN</div>
        </div>
      </MediaQuery>
    </div>
  );
};
export default Home;