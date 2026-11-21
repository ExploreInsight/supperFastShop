import express from 'express';
import { adminProtectRoute, protecter } from '../middlewares/authenticator.js';
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProductByCategory, getProductById, getRecommendedProducts, searchProducts, toggleFeaturedProduct } from '../controllers/product.controller.js';
import { loadDemoProducts, removeDemoProducts } from "../controllers/demo.controller.js";
import upload from '../lib/multer.js';

const router = express.Router();

router.get('/',protecter,adminProtectRoute,getAllProducts);
router.get("/featured",getFeaturedProducts);
router.get("/recommendtion",getRecommendedProducts);
router.get("/category/:category",getProductByCategory);
router.get("/search",searchProducts);
router.post("/demo",protecter,adminProtectRoute,loadDemoProducts);
router.delete("/demo",protecter,adminProtectRoute,removeDemoProducts);
router.get("/:id",getProductById);
router.post("/",protecter,adminProtectRoute,upload.single('image'),createProduct);
router.patch("/:id", protecter, adminProtectRoute, toggleFeaturedProduct);
router.delete("/:productId",protecter, adminProtectRoute,deleteProduct);

export default router;
