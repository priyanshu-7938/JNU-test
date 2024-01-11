import react,{ useState } from "react";
import { useTheContext } from "../context";

export default function Home(){
    const [ jsonData, setJsonData ] = useState(null);
    const { MessageBar } = useTheContext();
    const handelChange = (event) => {
        setJsonData(event.target.value);
    };
    const handelSubmit = ()=>{
        if(!jsonData){MessageBar("The proof cant be empty...","error");return;}
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("proof", jsonData);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        try {

            fetch("http://localhost:2024/verify", requestOptions)
            .then(response => {
                if(response.status == 200){
                    MessageBar(" Verified!!","success",3000);
                }
                else{
                    MessageBar(" Invalid proof!!","error",3000);
                }
            })
        }
        catch(err){
            MessageBar("Something happened during Validation!","warning",1000);
        }

    }

    return (<>
        <div className="">
            <p className="mx-1 font-bold text-3xl">Have A proof in hand, Wanna verify???</p>
            <p className="mx-1 font-bold text-2xl">Enter the json below and check its validity!!</p>
            <textarea className="p-2 font-bold text-xs font-roboto w-full rounded-[10px] h-[150px] m-2" type="text" onChange={handelChange}/>
            <button className={`m-2 rounded-[10px] p-1 px-4 text-2xl font-bold bg-[#3f3f3f] ${jsonData?" bg-[#50bc6d]":" pointer-events-none bg-[#868585] text-gray-500"}`} onClick={handelSubmit}>Verify...</button>
        </div>
    </>)
}