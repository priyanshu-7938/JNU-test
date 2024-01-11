import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv';

dotenv.config({
    path:'./.env'
    
})

cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME ,
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


  
const uploadOnCloudinary=async(localFilePath)=>{
    try{
        if(!localFilePath) return null;
        //upload file on cloudinary
        const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //After the file is uploaded
        // console.log("File uploaaded succesfully!!! ",response.url);
        fs.unlinkSync(localFilePath);
        return response;
        
    }catch (error){
        // fs.unlink(localFilePath)// delete the temporary file that was stored in our local server as file upload failed
        // Example (in your uploadOnCloudinary function)
        console.log(error);
        fs.unlink(localFilePath, (err) => {
        if (err) {
      // Handle error
        console.error(err);
        } else {
      // File successfully unlinked
        console.log('File unlinked successfully due to fail of upload');
    }
  });
  
        return null;
    }

}

export {uploadOnCloudinary};