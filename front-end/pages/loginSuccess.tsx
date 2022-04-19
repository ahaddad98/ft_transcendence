import React, { useEffect } from "react";
import HomeNavbar from "../components/HomeNavbar";
import Head from "next/head";
import Link from "next/link";
import Background from "../components/Background";
import router, { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import MediaQuery from "react-responsive";
import axios from "axios";
import SignIN from "../components/Signin";
import { useState } from "react";
import Home from "./home";
import UpdateProfile from "../components/updateprofile";
import { MydataProvider } from "../components/mydataprovider";

import { useMydataContext } from "../components/mydataprovider";

const loginSuccess = () => {
  const { query } = useRouter();
  const Router = useRouter();
  const [data, setData] = useState<any>();
  const fetchData = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_FRONTEND_URL + ":3001/users/me",
      {
        headers: { Authorization: `Bearer ${query.token}` },
      }
    );
    return response;
  };
  useEffect(() => {
    if (query.token) {
      const tok = query.token;
      localStorage.setItem("token", `${tok}`);
      if (localStorage.getItem("token")) router.push("/home");
    }
  }, [query]);

  const [selectedfile, setSelectedfile] = useState();
  const [selectedusername, setSelectedUsername] = useState();
  const fileSelectedHundler = (e) => {
    setSelectedfile(e.target.files[0]);
  };
  const fileSelectedHundlerusername = (e) => {
    setSelectedUsername(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("file", selectedfile);
    formData.append("username", selectedusername);
    axios
      .post(
        process.env.NEXT_PUBLIC_FRONTEND_URL + ":3001/profile/update/users/me",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.succes !== null) router.push("/home");
      });
  };
  return (
    <>
      <UpdateProfile />
    </>
  );
};

export default loginSuccess;
