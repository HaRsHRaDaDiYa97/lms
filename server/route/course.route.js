import express from "express";
import {
  createCourse,
  getMyCourses,
} from "../controller/course.controller.js";

import isAuthenticated from "../middleware/isAuthenticated.js";
import isInstructor from "../middleware/isInstructor.js"; // You need to create this middleware
import { singleUpload } from "../utils/multer.js";

const router = express.Router();

/* ----------------------- Public Routes ----------------------- */

// ✅ Get all published courses
router.get("/my-courses",isAuthenticated ,isInstructor, getMyCourses);

/* ------------------- Instructor-Only Routes ------------------ */

// ✅ Create a course (only instructors can do this)
router.post(
  "/create",
  isAuthenticated,
  isInstructor,
  singleUpload,
  createCourse
);


export default router;
