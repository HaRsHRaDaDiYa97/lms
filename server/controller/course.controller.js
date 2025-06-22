import { Course } from "../model/course.model.js";
import { Lecture } from "../model/lecture.model.js";

import { uploadMedia, deleteMedia } from "../utils/cloudinary.js"; // path as per your project
// @desc    Create a new course
export const createCourse = async (req, res) => {
  try {
    const {
      courseTitle,
      courseDescription,
      category,
      coursePrice,
    } = req.body;

    if (!courseTitle || !courseDescription || !category || !coursePrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCourse = new Course({
      courseTitle,
      courseDescription,
      category,
      coursePrice,
      creator: [req.user._id], // assuming user is logged in
    });

    await newCourse.save();

    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Course creation failed", error: error.message });
  }
};


export const getMyCourses = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No user info' });
    }

    const userId = req.user._id;

    const courses = await Course.find({ creator: userId }).populate('creator', 'name email');

    res.status(200).json({
      success: true,
      courses,
      total: courses.length,
    });
  } catch (error) {
    console.error('Error in getMyCourses:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};


export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      courseTitle,
      courseDescription,
      category,
      courseLevel,
      coursePrice,
      isPublished,
    } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (String(course.creator[0]) !== req.user._id && req.user.role !== 'instructor') {
      return res.status(403).json({ message: "Unauthorized to edit this course" });
    }

    // Handle thumbnail update
    if (req.file) {
      if (course.courseThumbnailPublicId) {
        await deleteMedia(course.courseThumbnailPublicId);
      }

      const result = await uploadMedia(req.file.buffer);
      course.courseThumbnail = result.secure_url;
      course.courseThumbnailPublicId = result.public_id;
    }

    // Type conversion
    const parsedPrice = parseFloat(coursePrice);
    const parsedPublished = isPublished === "true";

    // Update fields
    course.courseTitle = courseTitle || course.courseTitle;
    course.courseDescription = courseDescription || course.courseDescription;
    course.category = category || course.category;
    course.courseLevel = courseLevel || course.courseLevel;
    course.coursePrice = isNaN(parsedPrice) ? course.coursePrice : parsedPrice;
    course.isPublished = typeof isPublished !== "undefined" ? parsedPublished : course.isPublished;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.error("Edit Course Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId)
      .populate("creator", "-password") // populate creator without password
    // .populate("lectures") // optionally, remove if not needed
    // .populate("enrolledStudents", "name email"); // optionally, customize fields

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("Get Course By ID Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "lecture title is required",
      })
    }

    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(201).json({
      lecture,
      message: "lecture created successfully",
    })

  } catch (error) {
    console.log(error);

  }
}


export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate("lectures"); // ✅ fixed

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      success: true,
      courseTitle: course.courseTitle,
      lectures: course.lectures, // ✅ now contains full lecture data
    });
  } catch (error) {
    console.error("Error in getCourseLecture:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};



export const editLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { lectureTitle, isPreviewFree } = req.body;

    if (!lectureTitle) {
      return res.status(400).json({ message: "Lecture title is required" });
    }

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // Update title and preview flag
    lecture.lectureTitle = lectureTitle;
    if (isPreviewFree !== undefined) {
      lecture.isPreviewFree = isPreviewFree;
    }

    // ✅ If new video is uploaded, replace the old one
    if (req.file) {
      // Delete old video from Cloudinary if exists
      if (lecture.publicId) {
        await deleteMedia(lecture.publicId);
      }

      // Upload new video
      const uploadResult = await uploadMedia(req.file.buffer);
      lecture.videoUrl = uploadResult.secure_url;
      lecture.publicId = uploadResult.public_id;
    }

    await lecture.save();

    res.status(200).json({
      success: true,
      message: "Lecture updated successfully",
      lecture,
    });
  } catch (error) {
    console.error("Error editing lecture:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    res.status(200).json({
      success: true,
      lecture,
    });
  } catch (error) {
    console.error("Error fetching lecture by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const deleteLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // Delete video from Cloudinary
    if (lecture.publicId) {
      await deleteMedia(lecture.publicId); // video resource
    }

    // Remove lecture from Course model
    await Course.updateMany(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );

    // Delete lecture document
    await lecture.deleteOne();

    res.status(200).json({ success: true, message: "Lecture deleted successfully" });
  } catch (error) {
    console.error("Error deleting lecture:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;

    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (publish === "true") {
      // Prevent publishing if no lectures or none have a video
      if (!course.lectures || course.lectures.length === 0) {
        return res.status(400).json({ message: "Please add at least one lecture before publishing." });
      }

      const hasVideoLecture = course.lectures.some((lecture) => lecture.videoUrl);

      if (!hasVideoLecture) {
        return res.status(400).json({ message: "Please upload at least one lecture video before publishing." });
      }
    }

    course.isPublished = publish === "true";
    await course.save();

    return res.status(200).json({
      message: `Course is ${course.isPublished ? "published" : "unpublished"}`,
    });
  } catch (error) {
    console.log("Publish error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
