import react,{ useState } from "react";
import qs from 'querystring';
import { useTheContext } from "../context";
import { useNavigate } from "react-router-dom";


export default function Signup(){ 
    const navigate = useNavigate();
    const [ password, setPassword ] = useState(null);
    const [ username, setUsername ] = useState(null);
    const [ fullname, setFullname ] = useState(null);
    //ui states...
    const [ visited, setVisited ] = useState(false);
    const [ notSame, setNotSame ] = useState(false);
    const { MessageBar } = useTheContext();

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleFullName = (event) => {
        setFullname(event.target.value);
    };
    const handleRePassword = (event) => {
        const value = event.target.value;
        setNotSame(value!=password);
        setVisited(true);
    }
    const handelCreation = (status) => {
        switch(status){
            case 201:
                MessageBar("Account Created SucessFully....","success");
                navigate("/login");
                break;
            default:
                MessageBar("Something Went wrong.......","error");
                break;
        }
    }
    const HandelSubmit = ()=>{
        if(!(password && username && fullname)){
            MessageBar("Fill all entries...","info");
            return;
        }
        const url = "http://localhost:2024/user/register";
        var data = new URLSearchParams();
        data.append("fullName", fullname);
        data.append("username", username);
        data.append("password", password);
        
        fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
        redirect:'follow'
        })
        .then(response => handelCreation(response.status))
        .catch(error => {
            console.error('Error:', error);
        });
    }


    return (<>
        <div className="font-bold mt-[100px] mx-auto w-[400px] border-2 p-5 text-[#6DA4AA]">
            <p className="text-6xl py-2">Sign up</p>
            <p className="py-1 font-2xl text-[#647D87]">Username</p>
            <input required type="text" className="focus:outline-none p-2 px-3 h-[50px] border-3 bg-[#FAEF9B] rounded-[20px] w-full text-xl" onChange={handleUsername}/>
            <p className="py-1 font-2xl text-[#647D87]">Full Name</p>
            <input required type="text" className="focus:outline-none p-2 px-3 h-[50px] border-3 bg-[#FAEF9B] rounded-[20px] w-full text-xl" onChange={handleFullName}/>
            <p className="py-1 font-2xl text-[#647D87]">Password</p>
            <input required type="password" className="focus:outline-none p-2 px-3 h-[50px] border-3 bg-[#FAEF9B] rounded-[20px] w-full text-3xl" onChange={handlePassword}/>
            <p className="py-1 font-2xl text-[#647D87]">Re-Password</p>
            <input required type="password" className="focus:outline-none p-2 px-3 h-[50px] border-3 bg-[#FAEF9B] rounded-[20px] w-full text-3xl" onChange={handleRePassword}/>
            <p className={`${(visited&&notSame)?" flex text-red-700 ":"hidden"}`}>
                ! the password must be same
            </p>
            <button className={`m-1 my-3 bg-yellow-300 rounded-[10px] p-2 ${(notSame)?" hidden ":""}`} onClick={HandelSubmit}>Submit</button>
        </div>
    </>)
    
}