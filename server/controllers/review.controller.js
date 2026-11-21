import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Review from "../models/review.model.js";
import Product from "../models/product.model.js";

async function refreshRating(productId) {
  const [stats] = await Review.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    { $group: { _id: "$product", avg: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);
  await Product.findByIdAndUpdate(productId, {
    ratingAverage: stats ? Math.round(stats.avg * 10) / 10 : 0,
    ratingCount: stats ? stats.count : 0,
  });
}

export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid product id" });
    }
    const reviews = await Review.find({ product: productId })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("user", "name")
      .lean();
    res.json({ reviews });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};

// Create or update the signed-in shopper's review.
export const upsertReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const rating = Number(req.body.rating);
    const comment = (req.body.comment || "").toString().slice(0, 500);

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid product id" });
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Rating must be 1 to 5" });
    }
    if (!(await Product.exists({ _id: productId }))) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
    }

    const review = await Review.findOneAndUpdate(
      { product: productId, user: req.user._id },
      { rating, comment },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    await refreshRating(productId);
    res.status(StatusCodes.CREATED).json({ review });
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { productId } = req.params;
    await Review.findOneAndDelete({ product: productId, user: req.user._id });
    await refreshRating(productId);
    res.json({ message: "Review removed" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};
