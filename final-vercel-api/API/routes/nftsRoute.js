import express from "express";

import {
  aliasTopNFTs,
  getAllNFTs,
  getSpecifiedNFT,
  createNFT,
  updateNFT,
  deleteNFT,
  getNFTsStats,
  getMonthlyPlan,
  // checkId,
  // checkBody,
  getNFTInfoByName,
} from "../controllers/nftController.js";
import { login, protect, restrictTo } from "../controllers/authController.js";

const nftsRouter = express.Router();

// nftsRouter.param("id", checkId);

// TOP 5 NFTS ROUTE
nftsRouter.route("/top-5-nfts").get(aliasTopNFTs, getAllNFTs);

// STATS ROUTE
nftsRouter.route("/nfts-stats").get(getNFTsStats);

// GET MONTHLY
nftsRouter.route("/monthly-plan/:year").get(getMonthlyPlan);

nftsRouter.route("/getNFTInfoByName/:name").get(getNFTInfoByName);

// ROUTER NFTs
// nftsRouter.route("/").get(getAllNFTs).post(checkBody, createNFT);
nftsRouter.route("/").get(protect, getAllNFTs).post(createNFT);
nftsRouter
  .route("/:id")
  .get(getSpecifiedNFT)
  .patch(updateNFT)
  .delete(protect, restrictTo("admin", "guide"), deleteNFT);

export default nftsRouter;
