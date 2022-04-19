import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const TwoFactor = () => {
  const [token, setToken] = useState("");
  const router = useRouter()
  const sendtoken = async (e) => {
    e.preventDefault();
      axios
      .post(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3001/login/twoFactor/`,
        {
          token: token,
          id: router.query.id,
        },
        )
        .then((res)=>{
          if(res.data)
          {
              router.push(res.data.url)
          }
          // console.log(res.data); 
        }).catch((err)=>{
          console.log('errrroooor');
        })
        console.log('asdasda');
  };
  return (
    <>
    {
      router.query.id && 
      <div className="w-screen h-screen flex flex-col justify-center">
      <form className="flex  justify-center" onSubmit={sendtoken}>
        <input
          className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white xl:w-2/5 sm:w-4/5"
          placeholder="..."
          onChange={(e) => setToken(e.target.value)}
          />
        <input type="submit" className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-orange-500 border-t border-b border-r" />
      </form>
    </div>
        }
    </>
  );
};
export default TwoFactor;