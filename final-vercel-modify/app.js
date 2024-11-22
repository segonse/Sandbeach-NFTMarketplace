import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import cors from "cors";

import AppError from "./API/Utils/appError.js";
import globalErrorHandler from "./API/controllers/errorController.js";
import nftsRouter from "./API/routes/nftsRoute.js";
import usersRouter from "./API/routes/usersRoute.js";
import connectDB from "./API/Utils/dbConnect.js";

const app = express();

// RATE LIMITING
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// CORS
app.use(cors());

// DATABASE CONNECTION
await connectDB();

// BODY PARSER
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// DATA SANITIZATION AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize());

// DATA SANITIZATION AGAINST XSS
app.use(xss());

// PREVENT PARAMETER POLLUTION
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

// SECURITY HEADERS
app.use(helmet());

// DEVELOPMENT LOGGING
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// SERVER TEMPLATE DEMO
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(`${__dirname}/API/nft-data/img`));

// CUSTOM MIDDLEWARE
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use("/api/v1/nfts", nftsRouter);
app.use("/api/v1/users", usersRouter);

// ERROR SECTION
app.all("/api/*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

// UNHANDLED REJECTION
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

export default app;
