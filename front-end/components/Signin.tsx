import axios from "axios";
import { error } from "console";
import React from "react";
import handler from "../pages/api/hello";
import Link from "next/link";
import { Router } from "@mui/icons-material";
import { useRouter } from "next/router";
const SignIN = () => {
    const router = useRouter()
    const handleSubmit = async e => {
        e.preventDefault();
        
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_FRONTEND_URL +' :3001/login/intra-42');
            // console.log('sahbi samir');
            // console.log(response);
        } catch (error) {
          router.push('home')
        }
    };
    function hundelsub(e) {
        e.preventDefault();
        axios.post(process.env.NEXT_PUBLIC_FRONTEND_URL +' :3001/login/intra-42')
        .then ((res) => {
            // console.log("amine haddad");
            // console.log(res);
            
        })
        .catch ((error) => {
            router.push('home')
          })
    }
    return (
        <div>
            <form >
                <Link href={process.env.NEXT_PUBLIC_FRONTEND_URL+":3001/login/intra-42"}>
                <input type="submit" value="SIGN IN" className="button"/>
                </Link>
            </form>
        </div>
    )
}
export default SignIN;