import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar"
import LeaderBoard  from "../components/LeaderBoard";

const Home = () => {
    const [data, setData] = useState({})
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3001/users/me', {headers: 
        { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        return response;
    };
    useEffect (() => {
        fetchData()
        .then((res) => {
            if (res.data)
                setData(res.data);
        })
        .catch((err) => {
            console.log(err);    
        });
    }, [])
    
    return (
        <div>
            <HomeNavbar data={data}>
                </HomeNavbar>
            <LeaderBoard />
        </div>
    )
}

export default Home;