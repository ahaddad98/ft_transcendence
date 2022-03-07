import axios from "axios";
import { error } from "console";
import React from "react";
import handler from "../pages/api/hello";

const SignIN = (props) => {
    async function hundelsub(e) {
        axios.post('http://localhost:3001')
        .then ((res) => {
            console.log("amine haddad");
            console.log(res);
            
        })
        .catch((err) => {
            console.log(err);
        });
        // e.preventDefault();
    }
    const {user} = props;
    // console.log(props);
    
    return (
        <div>
            
            <form action="http://localhost:3001">
                <input type="submit" value="SIGN IN" className="button"/>
                <h1>
                    {/* amine */}
                    {props.firstname}
                </h1>
            </form>
        </div>
    )
}

export default SignIN;