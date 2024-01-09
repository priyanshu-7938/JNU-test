import React from "react";
import { useTheContext } from "../context";
import { Link } from "react-router-dom";
import { Profile } from "./";  

export default function Navbar(){
    const { userData } = useTheContext();
    return <>
        <div className="flex justify-between text-[#647D87] font-bold text-2xl p-3">
            <div className="flex items-center">
                <Link to="/">
                    <img src="src\assets\kelo.png" alt="logo" className="h-[40px]"/>
                </Link>
            </div>
            {userData? <>
                <div className="flex gap-3 items-center">
                    <Link to="/my-proofs">
                        <p>My Proofs</p>
                    </Link>
                    <Link to="/genrate-proof">
                        <p>Genrate One</p>
                    </Link>
                    <Profile/>
                </div>
            </>:
            <>
                <div className="flex gap-1">
                    <Link to="/login">
                            <p>Login</p>
                    </Link>
                    <Link to="/signup">
                            <p>Signup</p>
                    </Link>    
                </div>
                
            </>}
            
        </div>
    </>
}