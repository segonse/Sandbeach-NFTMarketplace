import mongoose from "mongoose";

const connectDB = async () => {
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DB_PASSWORD
  );
  await mongoose.connect(DB);
  console.log("Database connection successfully");
};

export default connectDB;
