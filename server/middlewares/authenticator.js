import { StatusCodes } from "http-status-codes";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protecter = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Access Token Not Found" });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User Not Found" });
    }

    //  Attach user object to `req`
    req.user = user;
    next(); //
  } catch (error) {
    console.log("JWT Error:", error); // Debugging line
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export const adminProtectRoute = async (req,res,next)=> {
 if(req.user && req.user.role ==="admin"){
  return next();
 }
 return res.status(StatusCodes.FORBIDDEN).json({message:"Access Deined - Admin only"})
}
