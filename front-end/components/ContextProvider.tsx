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
    const isBrowser = typeof window !== "undefined";

    if(!isBrowser)
        console.log(socket);
    if (!socket && isBrowser) 
    {
        setSocket(io(process.env.NEXT_PUBLIC_FRONTEND_URL + ':3080'));
        console.log("Here");
    }

    const [ShowCanvas, setShowCanvas] = useState(
        {
            show: false,
            gameInfo: {}
        }
    );

    return (
        <MyContext.Provider value={{ ShowCanvas, setShowCanvas, socket }}>
            {children}
        </MyContext.Provider>
    );
}