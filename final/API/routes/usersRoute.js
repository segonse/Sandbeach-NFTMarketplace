import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  checkAuthByCookie,
  logout,
} from "../controllers/authController.js";
import {
  getAllUsers,
  getSpecifiedUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  uploadUserPhoto,
  getUserInfoByName
} from "../controllers/userController.js";

const usersRouter = express.Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// MULTER
// save user photos
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname,"../nft-data/img/users"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${req.user.id}-${Date.now()}` + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// ROUTER AUTH
usersRouter.post("/signup", signUp);
usersRouter.post("/login", login);
usersRouter.get(
  "/checkAuthByCookie",
  checkAuthByCookie,
  protect,
  (req, res) => {
    res.status(200).json({
      status: "success",
      data: {
        user: req.user,
      },
    });
  }
);
usersRouter.get("/logout", logout);

usersRouter.post("/forgotPassword", forgotPassword);
usersRouter.patch("/resetPassword/:token", resetPassword);
usersRouter.patch("/updateMyPassword", protect, updatePassword);

// ROUTER USERS
usersRouter.patch("/updateMe", checkAuthByCookie, protect, updateMe);
usersRouter.delete("/deleteMe", protect, deleteMe);
// usersRouter.post(
//   "/uploadUserPhoto",
//   checkAuthByCookie,
//   protect,
//   upload.single("photo"),
//   uploadUserPhoto
// );

usersRouter.get("/getUserInfoByName/:name",getUserInfoByName)


usersRouter.route("/").get(getAllUsers).post(createUser);
usersRouter
  .route("/:id")
  .get(getSpecifiedUser)
  .patch(updateUser)
  .delete(deleteUser);

export default usersRouter;
