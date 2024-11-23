import mongoose from "mongoose";
import slugify from "slugify";
import validator from "validator";

const nftSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "NFT name is required"],
      unique: true,
      maxLength: [40, "A NFT name must have less or equal than 40 characters"],
      minLength: [10, "A NFT name must have more or equal than 10 characters"],
      // validate: [validator.isAlpha, "NFT name must only contain characters"],
    },
    slug: String,
    duration: {
      type: String,
      // required: [true, "Duration is required"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "NFT price is required"],
    },
    priceDiscount: {
      // THE CAN ONLY WORK ON NEW DOCUMENTS
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
    },
    URI: {
      type: String,
      required: [true, "URI is required"],
    },
    createAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    // Log every time create item date
    startDates: [Date],
    secretNFT: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: String,
      trim: true,
    },
    creatorWallet: {
      type: String,
      validate: [
        validator.isEthereumAddress,
        "Please provide a valid wallet address",
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

nftSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// MONGOOSE MIDDLEWARE

// DOCUMENT MIDDLEWARE: runs before .save() and .create()

nftSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
nftSchema.pre(/^find/, function (next) {
  this.find({ secretNFT: { $ne: true } });
  this.start = Date.now();
  next();
});

// ------POST
nftSchema.post(/^find/, function () {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
});

// AGGREGATION MIDDLEWARE
nftSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secretNFT: { $ne: true } } });
  next();
});

const NFT = mongoose.model("NFT", nftSchema);

export default NFT;
