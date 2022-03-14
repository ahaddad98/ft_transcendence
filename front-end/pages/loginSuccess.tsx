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
    <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label >Select image:</label>
        <input type="file" id="img" name="img" accept="image/*" onChange={fileSelectedHundler}/>
        <label >username:</label>
        <input type="text" id="username" name="username" onChange={fileSelectedHundlerusername}/>
        <input type="submit" value="Login"/>
        </form>
    </div>
    );
}

export default loginSuccess;