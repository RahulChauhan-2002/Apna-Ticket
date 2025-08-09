import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const dbConnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connection successfull");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default dbConnect;