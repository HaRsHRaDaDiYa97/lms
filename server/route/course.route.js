import express from "express";
import {
  createCourse,
  createLecture,
  deleteLecture,
  editCourse,
  editLecture,
  getAllCourses,
  getCourseById,
  getCourseLecture,
  getLectureById,
  getMyCourses,
  togglePublishCourse,
} from "../controller/course.controller.js";

import isAuthenticated from "../middleware/isAuthenticated.js";
import isInstructor from "../middleware/isInstructor.js"; // You need to create this middleware
import { upload } from "../utils/multer.js";

const router = express.Router();

/* ----------------------- Public Routes ----------------------- */

// ✅ Get all published courses
router.get("/my-courses", isAuthenticated, isInstructor, getMyCourses);

/* ------------------- Instructor-Only Routes ------------------ */

// ✅ Create a course (only instructors can do this)
router.post(
  "/create",
  isAuthenticated,
  isInstructor,
  createCourse
);


router.get("/all", getAllCourses);

// ✅ Edit Course
router.put("/edit/:courseId", isAuthenticated, isInstructor, upload.single("courseThumbnail"), editCourse);


router.get("/:courseId", isAuthenticated, getCourseById);

router.post("/:courseId/lecture", isAuthenticated, isInstructor, createLecture);

router.get("/:courseId/lectures", isAuthenticated, getCourseLecture);


router.get("/lecture/:lectureId", isAuthenticated, isInstructor, getLectureById);

router.put(
  '/lecture/:lectureId',
  isAuthenticated,
  isInstructor,
  upload.single('video'), // field name must match FormData key
  editLecture
);


router.delete(
  "/lecture/:lectureId",
  isAuthenticated,
  isInstructor,
  deleteLecture
);



router.put("/:courseId", isAuthenticated, isInstructor, togglePublishCourse);



export default router;
