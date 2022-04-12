import React from "react";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {useState,useContext} from "react";

const MyContext = React.createContext({}) as any;


export function useMyContext()
{
    return useContext(MyContext);
}

export function MyProvider({ children }) {
    const [ShowCanvas, setShowCanvas] = useState(
        {
            show: false,
            gameInfo: {}
        }
    );

    return (
        <MyContext.Provider value={{ShowCanvas, setShowCanvas}}>
            {children}
        </MyContext.Provider>
    );
}