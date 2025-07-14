// server/controller/paymentController.js
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

  if (!amount || amount <= 0) {
    return res.status(400).json({ success: false, message: "Invalid amount" });
  }

  try {
    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpayInstance.orders.create(options);
    console.log("✅ Razorpay order created:", order);

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("❌ Razorpay order error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const savePurchase = async (req, res) => {
  try {
    const { userId, courseId, amount, paymentId, status } = req.body;

    if (!userId || !courseId || !amount || !paymentId || !status) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    const purchase = await PurchaseCourse.create({
      userId,
      courseId,
      amount,
      paymentId,
      status,
    });

    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledStudents: userId },
    });

    await User.findByIdAndUpdate(userId, {
      $addToSet: { enrolledCourses: courseId },
    });

    res.status(201).json({
      success: true,
      message: "Purchase saved and enrollment updated",
      purchase,
    });
  } catch (error) {
    console.error("❌ Save purchase error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};