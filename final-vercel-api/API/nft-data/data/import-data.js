// const fs = require("fs");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const NFT = require("./../../models/nftModel");
import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import NFT from "../../models/nftModel.js";
import User from "../../models/userModel.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose.connect(DB).then((con) => {
  // console.log(con.connection);
  console.log("DB Connection Successfully");
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nfts = JSON.parse(
  fs.readFileSync(`${__dirname}/nft-simple.json`, "utf-8")
);

//IMPORT DATA
const importData = async () => {
  try {
    await NFT.create(nfts);
    console.log("DATA successfully Loaded");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//DELETE DATA
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("DATA successfully Deleted");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
