import express from "express";
import { protecter } from "../middlewares/authenticator.js";
import { getMyOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/mine", protecter, getMyOrders);

export default router;
