import mongoose = require("mongoose");

export const connectDB = async ()=>{
    try {
        const response = await mongoose.connect(process.env.MONGO_URI ||"");
        console.log(`MongoDB connected: ${response.connection.host}`);

    } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
    }
}