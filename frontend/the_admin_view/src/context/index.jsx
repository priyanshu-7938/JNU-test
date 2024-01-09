import React,{ useContext, createContext } from "react";
import { useState } from "react";

const Context = createContext();
export default function ContextProviderAllOver({children}){

    const [ userData, setUserData ] = useState(null);
    
    function MessageBar(msg){
        alert(msg);
    }

    return(
        <Context.Provider value={{
            userData,
            setUserData,
            MessageBar,
        }}>
            {children}
        </Context.Provider>
    )
}

export const useTheContext = ()=>{
    return useContext(Context);
}