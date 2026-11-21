import express from "express";
import { protecter } from "../middlewares/authenticator.js";
import { deleteReview, getProductReviews, upsertReview } from "../controllers/review.controller.js";

const router = express.Router();

router.get("/:productId", getProductReviews);
router.post("/:productId", protecter, upsertReview);
router.delete("/:productId", protecter, deleteReview);

export default router;
