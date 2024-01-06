import mongoose,{Schema} from "mongoose";
const proofSchema=Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    document_name:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","completed","cancelled"],
        default:"pending"
    },
    proof:{
        type:String
    }
},{timestamps:true})

export const Proof=mongoose.model("Proof",proofSchema);