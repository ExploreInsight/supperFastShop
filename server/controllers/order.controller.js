import { StatusCodes } from "http-status-codes";
import Order from "../models/order.model.js";

// The signed-in shopper's past orders, newest first.
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("products.product", "name image category")
      .lean();
    res.json({ orders });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};
