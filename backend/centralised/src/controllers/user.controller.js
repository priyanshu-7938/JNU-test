import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

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


export{registerUser,loginUser};