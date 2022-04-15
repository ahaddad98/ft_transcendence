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
  const [check, setCheck] = useState(false);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/users/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  };
  useEffect(() => {
    fetchData()
      .then((res) => {
        if (res.data) {
          setData(res.data);
          console.log(data);

          setCheck(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [ShowCanvas, setShowCanvas] = useState({
    show: false,
    gameInfo: {},
  });

  return (
      <>
      {
        check ? 
          <MyContext.Provider value={{ ShowCanvas, setShowCanvas , data}}>
          {children}
          </MyContext.Provider> : ""
        }
        </>
  );
}
