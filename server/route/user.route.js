import express from "express";
import { getUserProfile, login, logout, register, updateProfile } from "../controller/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../utils/multer.js";

const router = express.Router();

// Register route with multer middleware to handle file upload
router.route("/register").post(register);

// Login route (no file upload, so no multer middleware needed)
router.route("/login").post(login);


router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/profile/update").put(isAuthenticated,singleUpload, updateProfile);
router.route("/logout").get(logout);

export default router