import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import catchAsync from "../Utils/catchAsync.js";
import AppError from "../Utils/appError.js";
import User from "../models/userModel.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const filterObj = (obj, ...allowedFields) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => allowedFields.includes(key))
  );

// GET METHOD
const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  return res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

const getSpecifiedUser = (req, res) => {};

// POST METHOD
const createUser = (req, res) => {};

// PATCH METHOD
const updateUser = (req, res) => {};

const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword",
        400
      )
    );
  }

  // 2) Filtered out unwanted fieldsnames that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    "name",
    "email",
    "photo",
    "recentWalletAddress"
  );

  const filteredBodyAdd = filterObj(req.body, "historyWalletAddress");

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { ...filteredBody, $addToSet: filteredBodyAdd },
    {
      new: true,
      runValidators: true,
    }
  );

  // 4) Send response
  return res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

// DELETE METHOD
const deleteUser = (req, res) => {};

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  return res.status(204).json({
    status: "success",
    data: null,
  });
});

const uploadUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError("Please upload an image", 400));

  res.send({
    status: "success",
    url: `../nft-data/img/users/${req.file.filename}`,
  });
});

const getUserInfoByName = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ name: req.params.name });

  if (!user) {
    return next(new AppError("Invalid ID", 404));
  }
  
  res.status(200).json({ status: "success", data: { user: user } });
});

export {
  getAllUsers,
  getSpecifiedUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  uploadUserPhoto,
  getUserInfoByName
};
