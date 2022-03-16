import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar"
import LeaderBoard  from "../components/LeaderBoard";
import ChannlesList from "../components/ChannelsList";
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
            <div >
        <HomeNavbar data={data}>
                </HomeNavbar>
            <div className="flex flex-row ">
            <LeaderBoard />
            {/* <div> */}
                
            <ChannlesList />
            {/* </div> */}
            </div>
        </div>
    )
}

export default Home;