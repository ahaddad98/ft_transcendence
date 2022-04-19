import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useState, useContext } from "react";
import axios from "axios";

const MydataContext = React.createContext({}) as any;

export function useMydataContext() {
  return useContext(MydataContext);
}

export function MydataProvider({ children }) {
  const router = useRouter();
  const [data, setData] = useState();
  const [check, setCheck] = useState(false);
  const fetchData = async () => {
    const response = await axios.get(process.env.NEXT_PUBLIC_FRONTEND_URL +":3001/users/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  };
  useEffect(() => {
    let tok = localStorage.getItem("token");

    if (tok && tok.length > 0) {
        fetchData()
        .then((res) => {
            if (res.data) {
            setData(res.data);
            setCheck(true);
          }
        })
        .catch((err) => {
          localStorage.removeItem('token')
          router.push(`/`);
        });
      }
      else
      router.push(`/`);
  }, []);

  return (
    <>
      {check ? (
        <MydataContext.Provider value={{ data }}>
          {children}
        </MydataContext.Provider>
      ) : (
        ""
      )}
    </>
  );
}
