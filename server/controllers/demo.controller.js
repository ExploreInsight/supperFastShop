import { StatusCodes } from "http-status-codes";
import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import { DEMO_PRODUCTS } from "../lib/demoProducts.js";

const refreshFeaturedCache = async () => {
  try {
    await redis.del("featured_products");
  } catch (e) {
    console.log("Could not clear featured cache", e.message);
  }
};

// Where the demo images are served from: this same site.
const imageBase = (req) =>
  (process.env.CLIENT_URL || `${(req.get("x-forwarded-proto") || req.protocol).split(",")[0]}://${req.get("host")}`).replace(/\/$/, "");

// POST /api/product/demo  (admin). Adds the demo catalogue; safe to run twice.
export const loadDemoProducts = async (req, res) => {
  try {
    const base = imageBase(req);
    let added = 0;
    for (const p of DEMO_PRODUCTS) {
      const exists = await Product.exists({ name: p.name, category: p.category, isDemo: true });
      if (exists) continue;
      await Product.create({ ...p, image: `${base}${p.image}`, isDemo: true });
      added++;
    }
    await refreshFeaturedCache();
    res.status(StatusCodes.CREATED).json({ added, total: DEMO_PRODUCTS.length });
  } catch (error) {
    console.error("Error loading demo products:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};

// DELETE /api/product/demo  (admin). Removes only products flagged isDemo.
export const removeDemoProducts = async (req, res) => {
  try {
    const { deletedCount } = await Product.deleteMany({ isDemo: true });
    await refreshFeaturedCache();
    res.json({ removed: deletedCount });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};
