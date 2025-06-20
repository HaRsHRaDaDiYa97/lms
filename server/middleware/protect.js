// backend/middlewares/auth.middleware.js

import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const protect = async (req, res, next) => {
  let token;

  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1]; // Get token from "Bearer token_here"

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode JWT

      req.user = await User.findById(decoded.id).select("-password"); // Add user to req

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next(); // Pass control to next middleware/controller
    } else {
      return res.status(401).json({ message: "No token provided" });
    }
  } catch (error) {
    console.error("JWT Auth Error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
