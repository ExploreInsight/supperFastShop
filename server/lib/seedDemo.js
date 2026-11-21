import Product from "../models/product.model.js";
import { redis } from "./redis.js";
import { DEMO_PRODUCTS } from "./demoProducts.js";

export const clearFeaturedCache = async () => {
  try {
    await redis.del("featured_products");
  } catch (e) {
    console.log("Could not clear featured cache", e.message);
  }
};

// Adds any demo product that is missing. `base` prefixes the image path ("" keeps it relative to the site).
export async function seedDemoProducts(base = "") {
  let added = 0;
  for (const p of DEMO_PRODUCTS) {
    if (await Product.exists({ name: p.name, category: p.category, isDemo: true })) continue;
    await Product.create({ ...p, image: `${base}${p.image}`, isDemo: true });
    added++;
  }
  if (added) await clearFeaturedCache();
  return added;
}

// On startup: if the shop has no products at all, fill it with the demo catalogue.
// Turn off with AUTO_SEED=false. Once there is any product, this never runs again.
export async function autoSeedIfEmpty() {
  if (process.env.AUTO_SEED === "false") return;
  try {
    if ((await Product.estimatedDocumentCount()) > 0) return;
    const base = (process.env.CLIENT_URL || "").replace(/\/$/, "");
    const added = await seedDemoProducts(base);
    console.log(`Shop was empty: added ${added} demo products`);
  } catch (e) {
    console.log("Auto-seed skipped:", e.message);
  }
}
