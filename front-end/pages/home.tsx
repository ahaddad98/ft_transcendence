import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar"

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
        </div>
    )
}

// export async function getStaticProps(context) {
//     const fetchData = async () => {
//         const response = await axios.get('http://localhost:3001/users/me', {headers: 
//         { Authorization: `Bearer ${localStorage.getItem('token')}` }});
//         return response.data;
//     };
//     const result = await fetchData();
//     // will be passed to the page component as props
//     return {
//         props :{result}
//     }
//   }
export default Home;