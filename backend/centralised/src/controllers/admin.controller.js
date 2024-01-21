import { Proof } from "../models/proof.model.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.model.js";
import * as snarkjs from "snarkjs";

const loginUser=async(req,res,next)=>{
    try{
        const{username,password}=req.body;
        if(!username){
            throw new ApiError(400,"Username is required");
        }
        const user=await Admin.findOne({username});
        if(!user){
            throw new ApiError(404,"User does not exist");
        }
        
        const isPasswordValid=await user.isPasswordCorrect(password);
        if(!isPasswordValid){
            throw new ApiError(401,"Invalid User credentials");
        }
        const accessToken=await user.generateAccessToken();
        const loggedInUser=await Admin.findById(user._id).select("-password -refreshToken");
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
const registerAdmin=async (req,res,next)=>{
    try{
        const {username,fullName,password} = req.body;
        if(
            [fullName,username,password].some((field)=>field?.trim()==="")
        ){
            throw new ApiError(400,"All fields are required",);
        }
    
        const existingUser=await Admin.findOne({username})
    
        if(existingUser){
            throw new ApiError(409,"User with email or username already exists");
        }
    
        //integrate avatar functionality later
    
        const user=await Admin.create({
            fullName,
            password,
            username
        })
    
        const createdUser=await Admin.findById(user._id).select(
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
const getProofRequests=async(req,res,next)=>{
    try{
        const proof=await Proof.find({status:"pending"});
        res.json({
            status:"succesfull",
            data:proof,
            message:"Proof recieved Succesfully"
        });
        
    }catch(error){
        next(error);
    }
}

const generateProof=async(req,res,next)=>{
    try{

        const {proof_id,date}=req.body;
        const proofRequest=await Proof.findById(proof_id);
        const d1=new Date(date);
        const ageInDays=Math.floor((new Date()-d1)/(1000 * 60 * 60 * 24));
        const { proof, publicSignals } = await snarkjs.groth16.fullProve({days: ageInDays, id: Math.floor(Math.random() * 100)}, "circuit.wasm", "zkey_final.zkey");
        proofRequest.proof=JSON.stringify(proof, null, 1);
        proofRequest.status="completed";
        proofRequest.save();


        res.status(201).json({
            status:"succesfull",
            data:proof,
            message:"proof generated succesfully"
       })
    }catch(error){
        next(error);
    }
}

export {getProofRequests,generateProof,loginUser,registerAdmin};