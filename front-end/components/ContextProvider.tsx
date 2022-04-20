import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useState, useContext } from "react";
import io from 'socket.io-client';

const MyContext = React.createContext({}) as any;


export function useMyContext() {
    return useContext(MyContext);
}

export function MyProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const [myData, setMydata] = useState(null);
    const isBrowser = typeof window !== "undefined";
    // const [MyData, setMyData] = useState(null);

    if(!isBrowser)
        console.log(socket);
    if (!socket && isBrowser) 
    {
        setSocket(io(process.env.NEXT_PUBLIC_FRONTEND_URL + ':3083'));
    }

    const [ShowCanvas, setShowCanvas] = useState(
        {
            show: false,
            gameInfo: {}
        }
    );

    return (
        <MyContext.Provider value={{ ShowCanvas, setShowCanvas, socket,setMydata,myData }}>
            {children}
        </MyContext.Provider>
    );
}
