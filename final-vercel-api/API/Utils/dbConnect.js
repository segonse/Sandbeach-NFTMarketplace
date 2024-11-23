import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../../config.env" });

let isConnected; // 全局变量，用于缓存数据库连接状态

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const DB = process.env.DATABASE;

    const db = await mongoose.connect(DB);

    isConnected = db.connections[0].readyState;
    console.log("Database connection established");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
