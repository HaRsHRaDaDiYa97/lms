// utils/generateToken.js
import jwt from "jsonwebtoken";

export const generateToken = (res, user) => {
  const token = jwt.sign(
    { userId: user._id },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return token; // ✅ return token to use in res.json()
};
