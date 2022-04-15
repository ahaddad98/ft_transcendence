import React, { useContext, useEffect, useState } from "react";

const mydata = React.createContext({});

const mydataProvider = props => {
    <mydata.Provider value={{amine: "amine"}}>
        {props.children}
    </mydata.Provider>
}

const context = () => {
    return useContext(mydata)
}
export default mydataProvider