import react,{ useState, useEffect } from "react";
import { useTheContext } from "../context";
import { AvatarGenerator } from 'random-avatar-generator';

export default function Profile(){
    const generator = new AvatarGenerator(); 
    const { userData } = useTheContext();
    const [ userImg, setUserImg ] = useState(null); 
    useEffect(()=>{},[userData]);
    return (
        <div className="flex bg-[#fff] rounded-[50px] border-2 items-center gap-2 p-2 px-3">
            {userData?
            <>
                <img src={generator.generateRandomAvatar(userData?.fullName)} alt="" className="h-[30px]" />
                <p className=" truncate">{userData?.fullName}</p>
            </>:
            <>
                <img src="" alt="default..." />
            </>
            }
        </div>
    )
}