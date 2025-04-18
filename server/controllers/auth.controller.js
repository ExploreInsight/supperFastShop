import { StatusCodes } from "http-status-codes";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";
import {
  generateToken,
  storeRefreshToken,
  setCookies,
} from "../utilis/auth.utilis.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User already Exits" });

    const user = new User({
      email,
      password,
      name,
    });

    await user.save();

    const { accessToken, refreshToken } = generateToken(user._id);

    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(StatusCodes.CREATED).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created Successfully",
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal Server Erro" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateToken(user._id);

      await storeRefreshToken(user._id, refreshToken);

      setCookies(res, accessToken, refreshToken);

      return res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        message: "User Logged in successfully",
      });
    }

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email or Password Incorrect" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      await redis.del(`refresh_token:${decode.userId}`);
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logout Successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const refreshToken = async (req, res) => {
  
  const { refreshToken } = req.cookies;
  try {
    if (!refreshToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "No refresh token provided" });
    }
    const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const storedToken = await redis.get(`refresh_token:${decode.userId}`);

    if (storedToken !== refreshToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid refresh Token" });
    }

    const newAccessToken = jwt.sign(
      { userId: decode.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
  
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Token refreshed Successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User Not Found" });
    }
    res
      .status(StatusCodes.OK)
      .json({
        success: true,
        message: "User profile retrieved successfully",
        user: user,
      });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal Server Error" });
  }
};
