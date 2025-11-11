import mongoose from "mongoose";
import "dotenv/config";

console.log(process.env.MONGODB_URI);
export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB");
        return mongoose.connection;
    } catch (error: unknown) {
        console.error("Error connecting to MongoDB:", (error as Error).message);
        process.exit(1);
    }
}   