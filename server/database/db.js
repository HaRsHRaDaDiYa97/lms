import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DBURL);
        console.log("mongoDB connected");
    } catch (error) {
        console.log("error occures" , error);
        
    }
}