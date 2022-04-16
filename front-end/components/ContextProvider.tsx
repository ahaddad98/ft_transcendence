import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useState, useContext } from "react";
import axios from "axios";

const MyContext = React.createContext({}) as any;

export function useMyContext() {
  return useContext(MyContext);
}

export function MyProvider({ children }) {
  const [data, setData] = useState();
 
  const [ShowCanvas, setShowCanvas] = useState({
    show: false,
    gameInfo: {},
  });

  return (
    
          <MyContext.Provider value={{ ShowCanvas, setShowCanvas , data}}>
          {children}
          </MyContext.Provider> 
       
  );
}
