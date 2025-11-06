import mongoose  from "mongoose";

export const connectDB = async()=>{
    try {
        //@ts-ignore
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        //@ts-ignore
        process.exit(1);
    }
}