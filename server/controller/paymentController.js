import Razorpay from "razorpay";
import dotenv from "dotenv";
import PurchaseCourse from "../model/PurchaseCourse.model.js";
import { Course } from "../model/course.model.js";
import { User } from "../model/user.model.js";
dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // Razorpay expects paise
      currency: "INR",
      receipt: "receipt_order_" + Math.random().toString(36).slice(2),
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const savePurchase = async (req, res) => {
  try {
    const { userId, courseId, amount, paymentId, status } = req.body;

    // Debug logs to ensure IDs are correct
    console.log("🧾 Incoming purchase details:");
    console.log("User ID:", userId);
    console.log("Course ID:", courseId);

    // Check if user and course exist
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // 1. Save purchase record
    const purchase = await PurchaseCourse.create({
      userId,
      courseId,
      amount,
      paymentId,
      status,
    });

    // 2. Add user to course's enrolledStudents
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { enrolledStudents: userId } },
      { new: true }
    );
    console.log("✅ Course updated with enrolled student");

    // 3. Add course to user's enrolledCourses
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledCourses: courseId } },
      { new: true }
    );

    if (!updatedUser) {
      console.log("❌ Failed to update user");
    } else {
      console.log("✅ User updated with enrolled course:", updatedUser.enrolledCourses);
    }

    // 4. Respond success
    res.status(201).json({
      success: true,
      message: "Purchase successful and enrollment updated",
      purchase,
    });
  } catch (error) {
    console.error("❌ Save purchase error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
