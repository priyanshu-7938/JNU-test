import react,{ useState, useEffect } from "react";
import { useTheContext } from "../context";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();
    const [ password, setPassword ] = useState(null);
    const [ username, setUsername ] = useState(null);
    const { MessageBar, userData, setUserData } = useTheContext();

    useEffect(()=>{
        if(userData){
            navigate("/");
        }
    },[]);
    const handleUsername = (event) => {
        setUsername(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const handelCreation = (status) => {
        switch(status){
            case 201:
                MessageBar("Account Created SucessFully....");
                //todo
                break;
            case 401:
                MessageBar("Wrong Password....");
                break;
            case 404:
                MessageBar("Invalid username....");
                break;
            default:
                MessageBar("Something Went wrong.......");
                break;
        }
    }
    console.log(import.meta.env.BASE_URl);
    const HandelSubmit = ()=>{
        if(!(password && username)){
            MessageBar("Fill all entries...");
            return;
        }
        const url = "http://localhost:2024/user/login";
        var data = new URLSearchParams();
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
        .then(res=>{
            if(res.status == 401 || res.status == 404){
                handelCreation(res.status);
            }
            return res;
        })
        .then(res=>res.json())
        .then(res=>{
            //res.data is tehe data baby....
            setUserData(res.data.userInfo);
            navigator("/")
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }



    return (<>
        <div className="font-bold mt-[100px] mx-auto w-[400px] border-2 p-5 text-[#6DA4AA]">
            <p className="text-6xl py-2">Login</p>
            <p className="py-1 font-2xl text-[#647D87]">Username</p>
            <input required type="text" className="focus:outline-none p-2 px-3 h-[50px] border-3 bg-[#FAEF9B] rounded-[20px] w-full text-xl" onChange={handleUsername}/>
            <p className="py-1 font-2xl text-[#647D87]">Password</p>
            <input required type="password" className="focus:outline-none p-2 px-3 h-[50px] border-3 bg-[#FAEF9B] rounded-[20px] w-full text-3xl" onChange={handlePassword}/>
            <button className="m-1 my-3 bg-yellow-300 rounded-[10px] p-2" onClick={HandelSubmit}>Submit</button>
        </div>
    </>)
}