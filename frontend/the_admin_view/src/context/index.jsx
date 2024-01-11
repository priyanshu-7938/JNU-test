import React,{ useContext, createContext } from "react";
import { useState } from "react";
import { message } from 'react-message-popup';

const Context = createContext();
export default function ContextProviderAllOver({children}){

    const [ userData, setUserData ] = useState(null);
    
    function MessageBar(msg, type, _dur){
        let duration = 2000;
        if(_dur)
            duration = _dur;        
        if(type == "info"){
            message.info(msg, duration);
        }
        else if(type == "success"){
            message.success(msg, duration);
        }
        else if(type == "error"){
            message.error(msg,duration);
        }
        else if(type =="warning"){
            message.warning(msg,duration);
        }
        else if(type == "loading"){
            message.loading(msg,duration);
        }
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