import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI;

export const connectDB = async () => {
    try {
        if (!mongoURI){
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully");
    }catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}