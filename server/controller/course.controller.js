import { Course } from "../model/course.model.js";
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
