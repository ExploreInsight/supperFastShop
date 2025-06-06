import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";

export const generateToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

export const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  ); // 7days
};

export const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken,
    {
      httpOnly: true, // prevents xss
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "strict", //prevent csrf cross site request forgery attack
      maxAge: 15 * 60 * 1000,
    });
  res.cookie("refreshToken", refreshToken,
    {
      httpOnly: true, // prevents xss
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "strict", //prevent csrf cross site request forgery attack
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};