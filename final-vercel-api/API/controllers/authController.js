import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/userModel.js";
import catchAsync from "../Utils/catchAsync.js";
import AppError from "../Utils/appError.js";
import sendEmail from "../Utils/email.js";

// CREATE TOKEN
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// SEND TOKEN
export const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // const cookieOptions = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  // };

  // if (process.env.NODE_ENV === "production") {
  //   cookieOptions.secure = true;
  // }

  // res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  return res.status(statusCode).json({
    status: "success",
    token: token,
    data: { user: user },
  });
};

// SIGN UP
export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

// LOGIN USER
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, res);
});

// PROTECT DATA
export const protect = catchAsync(async (req, res, next) => {
  // 1. Check token exist in header and getting it.
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please login to get access.", 401)
    );
  }

  // 2. Verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decoded);

  // 3. Check user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4. Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please login again.", 401)
    );
  }

  req.user = currentUser;
  next();
});

// RETURN USER
// export const checkAuthByCookie = (req, res, next) => {
//   if (req.cookies && req.cookies.jwt) {
//     req.headers.authorization = "Bearer " + req.cookies.jwt;
//     next();
//   } else {
//     return next(new AppError("JWT cookie missing. Please login.", 401));
//   }
// };

// IDENTITY RESTRICT
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

// FORGOT PASSWORD
export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2. Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3. Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  await sendEmail({
    email: user.email,
    subject: "Your password reset token (valid for 10 min)",
    message,
  });

  return res.status(200).json({
    status: "success",
    message: "Token sent to email!",
  });
});

// RESET PASSWORD
export const resetPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2. If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  // 3. Update changedPasswordAt property for the user
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 4. Log the user in, send JWT
  // const token = signToken(user._id);
  // return res.status(200).json({
  //   status: "success",
  //   token,
  // });
  createSendToken(user, 200, res);
});

// UPDATE PASSWORD
export const updatePassword = catchAsync(async (req, res, next) => {
  // 1. Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2. Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3. If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4. Log user in, send JWT
  // const token = signToken(user._id);
  // return res.status(200).json({
  //   status: "success",
  //   token,
  // });
  createSendToken(user, 200, res);
});

// export const logout = (req, res) => {
//   res.clearCookie("jwt", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "None",
//   });

//   res.status(200).json({
//     status: "success",
//     message: "User logged out successfully",
//   });
// };
