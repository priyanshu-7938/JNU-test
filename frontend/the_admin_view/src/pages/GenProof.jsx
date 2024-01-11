import react,{ useState, useEffect } from "react";
import { useTheContext } from "../context";
import { useNavigate } from "react-router-dom";

export default function GenProof(){
    const { MessageBar, userData } = useTheContext();
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
      };
    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        setSelectedFile(droppedFile);
      };
    useEffect(()=>{
        if(!userData){
            navigate("/login");
        }
    },[userData]);
    const handleUpload = () => {
        if(!selectedFile){
            MessageBar("File not Found !!","error",3000);
            return;
        }
        if( !userData ){
            MessageBar("Something Went Wrong, Login again!!","error");
            navigate("/login");
        }
        if (selectedFile) {
            const formData = new FormData();
            formData.append("userId", userData._id);
            formData.append("doc_name", "id");
            formData.append('document', selectedFile);
            

            fetch('http://localhost:2024/user/applyforproof', {
                method: 'POST',
                body: formData,
                redirect: 'follow',
            })
                .then(data => {
                    console.log(data);
                    MessageBar("Image Uploded!!","success");
                    MessageBar("Check your Verifications in 'My Proofs' tab.","info",5000);
                    setSelectedFile(null);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    return(<>
        <div className="">
            <p className="text-4xl font-extrabold">Proof Generation</p>
            <p className="text-2xl font-bold">Upload an image of a valid School/Colleg id  that clearly states your age , and wait till a valid proof is generated</p>
            <div className="flex gap-3 items-center">
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`m-3 font-bold cursor-pointer p-4 border-4 rounded-[30px] border-dashed items-center ${selectedFile?" border-[#0f5132]":" border-[#636161]"}`}
                >
                    <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                    {selectedFile ? (
                        <div className="flex">
                        Selected File: <p className="p-1 px-2 text-[#fff] bg-[#0f5132] rounded-[10px] font-extrabold">{selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)   <button onClick={()=>{setSelectedFile(null);}}>x</button></p>
                        </div>
                    ):(
                        <p className="font-bold">Drag and drop a file here to select an file...</p>
                    )}
                </div>
                <div className={` p-2 px-3 rounded-[30px] font-bold ${selectedFile?" bg-[#0f5132] text-[#fff]":" pointer-events-none bg-[#c3c3c3] text-gray-600"}`} >
                    <button className="" onClick={handleUpload}>Upload</button>

                </div>
            </div>
 
        </div>  
    </>)
}

