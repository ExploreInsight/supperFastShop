import express from 'express';
import {addToCart, getCartProducts, removeAllFromCart, updateQuantity} from "../controllers/cart.controller.js"
import { protecter } from '../middlewares/authenticator.js';
const router = express.Router();

router.get("/", protecter, getCartProducts);
router.post('/',protecter,addToCart);
router.delete('/',protecter,removeAllFromCart);
router.put("/:id", protecter, updateQuantity);


export default router;