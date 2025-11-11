import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
}
export async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log("Connected to MongoDB");
        return mongoose.connection;
    } catch (error: unknown) {
        console.error("Error connecting to MongoDB:", (error as Error).message);
        process.exit(1);
    }
}   