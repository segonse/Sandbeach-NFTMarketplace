// ------REFACTOR2
import NFT from "../models/nftModel.js";
import APIFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
import AppError from "../Utils/appError.js";

const filterObj = (obj, ...allowedFields) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => allowedFields.includes(key))
  );

// GET METHOD
const aliasTopNFTs = async (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,difficulty";
  next();
};

const getAllNFTs = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  const features = new APIFeatures(NFT.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const nfts = await features.query;

  // SEND QUERY RESULTS
  res.status(200).json({
    status: "success",
    results: nfts.length,
    data: { nfts: nfts },
  });
});

const getSpecifiedNFT = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const nft = await NFT.findById(id);

  if (!nft) {
    return next(new AppError("Invalid ID", 404));
  }
  res.status(200).json({ status: "success", data: { nft: nft } });
});

// POST METHOD
const createNFT = catchAsync(async (req, res, next) => {
  const newNFT = await NFT.create(req.body);
  res.status(201).json({ status: "success", data: { nft: newNFT } });
});

// PATCH METHOD
const updateNFT = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const filteredBody = filterObj(req.body, "price");

  const filteredBodyAdd = filterObj(req.body, "startDates");

  const nft = await NFT.findByIdAndUpdate(
    id,
    { ...filteredBody, $addToSet: filteredBodyAdd },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!nft) {
    return next(new AppError("Invalid ID", 404));
  }

  res.status(200).json({ status: "success", data: { nft: nft } });
});

// DELETE METHOD
const deleteNFT = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const nft = await NFT.findByIdAndDelete(id);

  if (!nft) {
    return next(new AppError("Invalid ID", 404));
  }

  res.sendStatus(204);
});

// Aggregation pipeline
const getNFTsStats = catchAsync(async (req, res, next) => {
  const stats = await NFT.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: "$difficulty" },
        numNFTs: { $sum: 1 },
        numRatings: { $sum: "$ratingsQuantity" },
        averageRating: { $avg: "$ratingsAverage" },
        averagePrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { averagePrice: 1 },
    },
    {
      $match: { _id: { $ne: "EASY" } },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: { stats: stats },
  });
});

// CALCULATOR NUMBER OF NFTS CREATE IN THE MONTH OR MONTHLY PLAN
const getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await NFT.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numNFTStarts: { $sum: 1 },
        nfts: { $push: "$name" },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numNFTStarts: -1 },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: "success",
    data: { plan: plan },
  });
});

const getNFTInfoByName = catchAsync(async (req, res, next) => {
  const nft = await NFT.findOne({ name: req.params.name });

  if (!nft) {
    return next(new AppError("Invalid ID", 404));
  }

  res.status(200).json({ status: "success", data: { nft: nft } });
});

export {
  aliasTopNFTs,
  getAllNFTs,
  getSpecifiedNFT,
  createNFT,
  updateNFT,
  deleteNFT,
  getNFTsStats,
  getMonthlyPlan,
  getNFTInfoByName,
};
