import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import Profile from "../components/Profile";

const Myprofile = () => {
  const [myprofile, setMyprofile] = useState({});
  const [hasResult, setHasResult] = useState(false);  
  const fetchmyprofile = async () => {
        const response = await axios.get('http://localhost:3001/profile/me', {headers: 
        { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        return response;
    };
    useEffect(() => {
        fetchmyprofile()
        .then((res) => {
            if (res.data)
            {
                setMyprofile(res.data);
                setHasResult(true);
                }
        })
        .catch((err) => {
            console.log(err);    
        });
    }, [])
    return (
    <div>
        {hasResult && (
            <Profile mydata={myprofile} me={"me"}/>
            )
        }
        </div>
    ) 
}
export default Myprofile;