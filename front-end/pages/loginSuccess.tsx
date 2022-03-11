import React from "react";
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

const loginSuccess = () => {
    const router = useRouter();
    console.log(router.query);
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            console.log('hhasiygha');
            
            const response = await axios.get('http://localhost:3001/users/me', {headers: 
            { Authorization: `Bearer ${router.query}` }});
            console.log(response);
        } catch (error) {
          console.log(error);
        }
    }
    
    
    return (
    <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label >Select image:</label>
        <input type="file" id="img" name="img" accept="image/*" />
        <label >username:</label>
        <input type="text" id="username" name="username"/>
        <input type="submit" value="Login"/>
        </form>
    </div>
    );
}

export default loginSuccess;