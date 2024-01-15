import { Proof } from "../models/proof.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const registerUser=async (req,res,next)=>{
    try{
        const {username,fullName,password} = req.body;
        if(
            [fullName,username,password].some((field)=>field?.trim()==="")
        ){
            throw new ApiError(400,"All fields are required",);
        }
    
        const existingUser=await User.findOne({username})
    
        if(existingUser){
            throw new ApiError(409,"User with email or username already exists");
        }
    
        //integrate avatar functionality later
    
        const user=await User.create({
            fullName,
            password,
            username
        })
    
        const createdUser=await User.findById(user._id).select(
            "-password"
        )
    
        if(!createdUser){
            throw new ApiError(500,"Something went wrong while registering the user");
        }
    
        res.status(201).json({
            status:"succesfull",
            data:createdUser,
            message:"User registered Succesfully"
        })
    }catch(error){
        next(error);
    }
}

const loginUser=async(req,res,next)=>{
    try{
        // console.log(req.body);
        const{username,password}=req.body;
        if(!username){
            throw new ApiError(400,"Username is required");
        }
        const user=await User.findOne({username});
        if(!user){
            throw new ApiError(404,"User does not exist");
        }
        
        const isPasswordValid=await user.isPasswordCorrect(password);
        if(!isPasswordValid){
            throw new ApiError(401,"Invalid User credentials");
        }
        const accessToken=await user.generateAccessToken();
        const loggedInUser=await User.findById(user._id).select("-password -refreshToken");
        const options={
            httpOnly:true,
            secure:true
        }
        return res.status(200).cookie("accessToken",accessToken,options).json({
            status:"succesfull",
            data:{
                accessToken,userInfo:loggedInUser
            },
            message:"Succesfull Login"
        })

    }catch(error){
        next(error);
    }
}

const applyforProof=async(req,res,next)=>{
    try {
        const {userId,doc_name}=req.body;
        const docLocalPath=req.file?.path;

        console.log(docLocalPath);
        if(!docLocalPath){
            throw new ApiError(400,"Document file is missing");
        }
        const doc_url=await uploadOnCloudinary(docLocalPath);
        if(!doc_url){
            throw new ApiError(400,"Some error occured in document upload");
        }
        const proof=await Proof.create({
            user:userId,
            document_name:doc_name,
            picture:doc_url.url,
        })
        const createdProof=await Proof.findById(proof._id).select("-proof");
    
        if(!createdProof){
            throw new ApiError(404,"Proof request cannot form");
        }
    
        res.status(201).json({
            status:"succesfull",
            data:proof,
            message:"Proof request created succesfully"
        })
    } catch (error) {
        next(error);
    }
}
const fetchMyproofs = async (req,res,next)=>{
    try{
        const userId = req.body?.userId;
        if(userId){
            const proofs = await Proof.find({ user: userId });
            res.send(proofs);
        }
        else{
            throw new ApiError(404,"Can not fetch Proofs for given user.");
        }
    }
    catch{
        console.log("error occured");
        next();
    }
}

export{registerUser,loginUser,applyforProof,fetchMyproofs};