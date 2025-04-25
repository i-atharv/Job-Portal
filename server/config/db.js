import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Function to connect MongoDB database

const connectDB = async () =>  {

    mongoose.connection.on('connected',() => console.log('Database Connected'));

    await mongoose.connect(process.env.MONGODB_URI,{
      dbName: "job-portal",  
    });
};

export default connectDB;
