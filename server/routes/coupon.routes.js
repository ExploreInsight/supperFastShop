import express from "express";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js";
import { protecter } from "../middlewares/authenticator.js";

const router = express.Router();

router.get("/", protecter, getCoupon);
router.post("/validate", protecter, validateCoupon);

export default router;