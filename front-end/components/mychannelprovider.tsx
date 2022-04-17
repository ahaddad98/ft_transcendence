import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useState, useContext } from "react";
import axios from "axios";

const MychannelContext = React.createContext({}) as any;

export function useMychannelContext() {
  return useContext(MychannelContext);
}

export function MychannelProvider({ children }) {
  const [ismute, setIsmute] = useState(false);
  
  return (
    <MychannelContext.Provider value={{ ismute, setIsmute }}>
      {children}
    </MychannelContext.Provider>
  );
}
