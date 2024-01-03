import mongoose,{Schema} from "mongoose";// destructured Schema here to avoid writing mongoose.Schema everywhere
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema=Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
    },
    avatar:{
        type:String,
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
},{timestamps:true})


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10);//the number here gives hash round/salt
    next();

})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

export const User=mongoose.model("User",userSchema);
