import react,{ useEffect, useState } from "react";
import { useTheContext } from "../context";
import ProofComponent from "../utils/ProofComponent";

export default function MyProof(){
    const { userData } = useTheContext();
    const [ theProofs, setTheProofs ] = useState(null);
    
    useEffect(()=>{
        // the code goes here
        if(!userData){return;}
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("userId", userData?._id);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch("http://localhost:2024/user/myproofs", requestOptions)
        .then(response => response.text())
        .then(result => setTheProofs(JSON.parse(result)))
        .catch(error => console.log('error', error));
    },[]);
    // useEffect(()=>{console);},[theProofs])
    if(theProofs){
        console.log(Object.entries(theProofs));
    }
    return (
        <div className="flex flex-col gap-2 p-2">
            {theProofs? <>
                {Object.entries(theProofs).map((proof,index)=> <ProofComponent key={proof[1]._id} data={proof}/>)}
            </>:
            <>
                <div className="text-3xl font-bold font-montserrat">
                    <p>No Profs yet Create One?</p>
                </div>
            </>}
        </div>
    )
}
