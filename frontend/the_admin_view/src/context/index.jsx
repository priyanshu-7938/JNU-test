import React,{ useContext, createContext } from "react";
import { useState } from "react";

const Context = createContext();
export default function ContextProviderAllOver({children}){

    const [ value, setValue ] = useState(0); 



    return(
        <Context.Provider value={{
            value,
            setValue
        }}>
            {children}
        </Context.Provider>
    )
}

export const useTheContext = ()=>{
    return useContext(Context);
}