import axios from "axios";
import { error } from "console";
import React from "react";
import handler from "../pages/api/hello";
import Link from "next/link";
const SignIN = () => {
    const handleSubmit = async e => {
        e.preventDefault();
        
        try {
            const response = await axios.get('http://localhost:3001/login/intra-42');
            // console.log('sahbi samir');
            // console.log(response);
        } catch (error) {
          console.log(error);
        }
      };
    function hundelsub(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/login/intra-42')
        .then ((res) => {
            // console.log("amine haddad");
            // console.log(res);
            
        })
        .catch((err) => {
            console.log(err);
        });
    }
    return (
        <div>
            <form >
                <Link href="http://localhost:3001/login/intra-42">
                <input type="submit" value="SIGN IN" className="button"/>
                </Link>
            </form>
        </div>
    )
}
export default SignIN;