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

const EditProfile = () => {
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
        // http://localhost:3001/profile/update/users/me
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
      <div className="container-form">
             <form onSubmit={handleSubmit} className="myform" encType="multipart/form-data">
              <input type="file" className="custom-file-input" name="img" accept="image/*" placeholder="Select Avatar" onChange={fileSelectedHundler} />
              <br />
              <input type="text" id="username" name="username" placeholder="Username" onChange={fileSelectedHundlerusername}/>
              <br />
              <input type="submit" value="Save"/>
              </form>
        <div className="drops">
          <div className="drop drop-1"></div>
          <div className="drop drop-2"></div>
          <div className="drop drop-3"></div>
          <div className="drop drop-4"></div>
          <div className="drop drop-5"></div>
        </div>
      </div>
    );
}
export default EditProfile;