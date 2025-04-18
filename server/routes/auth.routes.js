import express from "express";
import { getProfile, login, logout, refreshToken, signup } from "../controllers/auth.controller.js";
import {protecter} from '../middlewares/authenticator.js'

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post('/refresh',refreshToken);
// router.route('/refresh').post(refreshToken);

router.route('/getProfile').get(protecter, getProfile); // used when multiple HTTP methods

export default router;
 

