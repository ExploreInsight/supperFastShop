import express from 'express';
import { protecter } from "../middlewares/authenticator.js";
import { checkoutSuccess, createCheckoutSession } from '../controllers/payment.controller.js';


const router = express.Router();

router.post('/create-checkout-session',protecter , createCheckoutSession);
router.post('/checkout-success',protecter,checkoutSuccess);

export default router;