import { StatusCodes } from "http-status-codes";
import Product from "../models/product.model.js";
import { clearFeaturedCache, seedDemoProducts } from "../lib/seedDemo.js";

// Where the demo images are served from: this same site.
const imageBase = (req) =>
  (process.env.CLIENT_URL || `${(req.get("x-forwarded-proto") || req.protocol).split(",")[0]}://${req.get("host")}`).replace(/\/$/, "");

// POST /api/product/demo  (admin). Adds the demo catalogue; safe to run twice.
export const loadDemoProducts = async (req, res) => {
  try {
    const base = imageBase(req);
    const added = await seedDemoProducts(base);
    res.status(StatusCodes.CREATED).json({ added, total: 21 });
  } catch (error) {
    console.error("Error loading demo products:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};

// DELETE /api/product/demo  (admin). Removes only products flagged isDemo.
export const removeDemoProducts = async (req, res) => {
  try {
    const { deletedCount } = await Product.deleteMany({ isDemo: true });
    await clearFeaturedCache();
    res.json({ removed: deletedCount });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};
