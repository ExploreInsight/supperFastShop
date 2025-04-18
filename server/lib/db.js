import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected:", conn.connection.host);
    } catch (error) {
        console.log("Error Connecting to MongoDB:",error)
        process.exit(1);  // exiting the process with 1 code menas an error
    }
}