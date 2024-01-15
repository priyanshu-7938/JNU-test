import copy from "../assets/copy_0.png";
import { useTheContext } from "../context";

export default function ProofComponent({data}){
    const { MessageBar } = useTheContext();
    function handelIdCopy(){
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(object._id);
        }
        MessageBar("Copied!","info",500);
    }
              
    function handelProofCopy(){
        if (navigator?.clipboard?.writeText) {
          navigator.clipboard.writeText(object?.proof);
        }
        MessageBar("Copied!","info",500);
    }
      
    const object = data[1];
    return <div className="p-2 border-2 rounded-[10px]">
        <p className="flex gap-2 text-gray-600 text-xs font-bold mb-2">{object._id}<img src={copy} className="h-[12px]" onClick={handelIdCopy} alt="cpy" /></p>
        <div className="flex gap-2 justify-between">
            <div className="w-[40%]">
                <img src={object.picture} alt="docs" />
            </div>
            {object.status == "pending" && 
                <div className="m-3 w-[200px] h-[30px] items-center flex justify-center  font-bold bg-[#76a780] p-2"><p>Pending</p></div>
            }
            {object.status == "completed" && 
            <>
                <div className="w-[60%]">
                    <div className=" h-min-[50px] border-2 rounded-[3px] px-1 text-sm bg-[rgb(198,194,171)]">object?.proof</div>
                    <div className="m-3 items-center h-[30px]  w-[100px] flex justify-center border-2 rounded-[3px] text-xs font-bold bg-[#76a780] p-1"><button onClick={handelProofCopy} className="flex items-center gap-2">Copy <img src={copy} className=" h-[15px]" alt="" /></button></div>
                </div>
            </>    
            }
            {object.status == "rejected" && 
                <div className="m-3 w-[200px] h-[30px]  items-center flex justify-center  font-bold bg-[#a77d76] p-2"><p>Rejected</p></div>
            }
        </div>


    </div>
}