import mongoose from "mongoose";

const connectDB=async ()=>{
    try {
        const connectionInstance=await mongoose.connect(`mongodb://127.0.0.1:27017/JNU_TEST_PROJECT`);
        console.log(`\nMONGODB connected !! DB NAME: ${connectionInstance.connection.host}`);
    } 
    catch (error) {
        console.log("MONGODB error occured: ",error);
        process.exit(1);
    }
}

export default connectDB;