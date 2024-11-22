import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import mongoose from "mongoose";
import next from "next";

import app from "./app.js";
import connectDB from "./API/Utils/dbConnect.js";

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  process.exit(1);
});

const dev = process.env.NODE_ENV !== "production";
const server = next({ dev });
const handle = server.getRequestHandler();

const port = process.env.PORT || 3000;

// const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);
// mongoose
//   .connect(DB)
//   .then(() => console.log("Database connection successfully"));

server.prepare().then(async () => {
  await connectDB();

  app.all("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
