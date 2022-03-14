import React, { useEffect } from "react";
import HomeNavbar from "../components/HomeNavbar"
import Head from 'next/head'
import Link from 'next/link'
import Background from '../components/Background'
import router, { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import Player from '../components/Player'
import MediaQuery from "react-responsive";
import axios from 'axios';
import SignIN from '../components/Signin'
import { useState } from 'react'
import Home from "./home";

const loginSuccess = () => {
    const { query } = useRouter();
    const Router  = useRouter();
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3001/users/me', {headers: 
        { Authorization: `Bearer ${query.token}` }});
        return response;
    };
    useEffect(() => {
        if (query.token)
        {
            const tok = query.token;
            localStorage.setItem('token', `${tok}`);
            fetchData().then((result) =>{
                if (result.data.username !== null)
                    router.push('/home');
            })
        }
    }, [query]);

    const [selectedfile, setSelectedfile] = useState();
    const [selectedusername, setSelectedUsername] = useState();
    const fileSelectedHundler  = (e) =>  {
        setSelectedfile(e.target.files[0]);
    }
    const fileSelectedHundlerusername  = (e) =>  {
        setSelectedUsername(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", selectedfile);
        formData.append("username", selectedusername);
        axios.post('http://localhost:3001/users/me/updateProfile', formData, 
        { headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then ((res) => {
            if (res.data.succes !== null)
                router.push('/home');
        })
    }
    return (
        <body>
        <div className="login-root">
          <div className="box-root flex-flex flex-direction--column"/* style="min-height: 100vh, flex-grow: 1;"*/>
            <div className="loginbackground box-background--white padding-top--64">
              <div className="loginbackground-gridContainer">
                <div className="box-root flex-flex" /*style="grid-area: top / start / 8 / end;"*/>
                  <div className="box-root" /*style="background-image: linear-gradient(white 0%, rgb(247, 250, 252) 33%); flex-grow: 1;"*/>
                  </div>
                </div>
                <div className="box-root flex-flex" /*style="grid-area: 4 / 2 / auto / 5;"*/>
                  <div className="box-root box-divider--light-all-2 animationLeftRight tans3s" /*style="flex-grow: 1;"*/></div>
                </div>
                <div className="box-root flex-flex" /*style="grid-area: 6 / start / auto / 2;"*/>
                  <div className="box-root box-background--blue800" /*style="flex-grow: 1;"*/></div>
                </div>
                <div className="box-root flex-flex" /*style="grid-area: 7 / start / auto / 4;"*/>
                  <div className="box-root box-background--blue animationLeftRight" /*style="flex-grow: 1;"*/></div>
                </div>
                <div className="box-root flex-flex" /*style="grid-area: 8 / 4 / auto / 6;"*/>
                  <div className="box-root box-background--gray100 animationLeftRight tans3s" /*style="flex-grow: 1;"*/></div>
                </div>
                <div className="box-root flex-flex" /*style="grid-area: 2 / 15 / auto / end;"*/>
                  <div className="box-root box-background--cyan200 animationRightLeft tans4s" /*style="flex-grow: 1;"*/></div>
                </div>
                <div className="box-root flex-flex" /*style="grid-area: 3 / 14 / auto / end;"*/>
                  <div className="box-root box-background--blue animationRightLeft" /*style="flex-grow: 1;"*/></div>
                </div>
                <div className="box-root flex-flex" /*style="grid-area: 4 / 17 / auto / 20;"*/>
                  <div className="box-root box-background--gray100 animationRightLeft tans4s" /*style="flex-grow: 1;"*/></div>
                </div>
                <div className="box-root flex-flex" /*style="grid-area: 5 / 14 / auto / 17;"*/>
                  <div className="box-root box-divider--light-all-2 animationRightLeft tans3s" /*style="flex-grow: 1;"*/></div>
                </div>
              </div>
            </div>
            <div className="box-root padding-top--24 flex-flex flex-direction--column" /*style="flex-grow: 1; z-index: 9;"*/>
              <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
                <h1><a href="http://blog.stackfindover.com/" rel="dofollow">Stackfindover</a></h1>
              </div>
              <div className="formbg-outer">
                <div className="formbg">
                  <div className="formbg-inner padding-horizontal--48">
                    <form id="stripe-login">
                      <div className="field padding-bottom--24">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" />
                      </div>
                      <div className="field padding-bottom--24">
                        <div className="grid--50-50">
                          <label  htmlFor="password">Username</label>
                        </div>
                        <input type="text" name="password" />
                      </div>
                      <div className="field padding-bottom--24">
                        <input type="submit" name="submit" value="Continue" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
</body>
    );
}

export default loginSuccess;
        {/*// <Background>
            // <Player />
            // <div className="form">
            //     <form onSubmit={handleSubmit} encType="multipart/form-data">
            //     <label >Select image:</label>
            //     <input type="file" id="img" name="img" accept="image/*" onChange={fileSelectedHundler}/>
            //     <br />
            //     <label >username:</label>
            //     <input type="text" id="username" name="username" onChange={fileSelectedHundlerusername}/>
            //     <input type="submit" value="Login"/>
            //     </form>
            // </div>
        // </Background>*/}