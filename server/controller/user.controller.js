import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Step 1: Find user WITH password
    const userWithPassword = await User.findOne({ email }).populate({
      path: "enrolledCourses",
      select: "_id title thumbnail price", // add more fields if needed
    });

    if (!userWithPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ Step 2: Check password
    const isPasswordMatch = await bcrypt.compare(password, userWithPassword.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ Step 3: Remove password and format response
    const { password: _, ...rest } = userWithPassword._doc;

    // ✅ Step 4: Generate token and set cookie
    const token = generateToken(res, userWithPassword);

    // ✅ Step 5: Return full user data with enrolledCourses
    res.status(200).json({
      success: true,
      message: `Welcome back ${rest.name}`,
      token,
      user: {
        ...rest,
        enrolledCourses: userWithPassword.enrolledCourses, // ✅ included
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const logout = async (req, res) => {
  try {
    return res.status(200)
      .cookie("token", "", { 
        maxAge: 0,
        httpOnly: true,
        sameSite: 'strict'
      })
      .json({
        success: true,
        message: "Logout successful",
      });

  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    // Fetch user again from DB with population
    const user = await User.findById(req.user._id)
      .populate({
        path: "enrolledCourses",
        select: "courseTitle courseDescription coursePrice courseThumbnail creator",
        populate: {
          path: "creator",
          select: "name",
        },
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
        bio: user.bio,
        location: user.location,
        role: user.role,
        enrolledCourses: user.enrolledCourses, // ✅ now contains full course objects
        createdAt: user.createdAt,
      },
    });

  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




export const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const { name, email, bio, location } = req.body;

    // Validate at least one field is being updated
    if (!name && !email && !req.file && bio === undefined && location === undefined) {
      return res.status(400).json({
        success: false,
        message: "At least one field must be provided for update",
      });
    }

    // Handle file upload if provided
    let uploadedPhotoUrl = user.photoUrl;
    if (req.file) {
      // Convert buffer to data URL for Cloudinary
      const fileBuffer = req.file.buffer;
      const fileBase64 = fileBuffer.toString('base64');
      const dataUri = `data:${req.file.mimetype};base64,${fileBase64}`;

      // Delete old photo if exists
      if (user.photoUrl && user.photoUrl.includes("cloudinary.com")) {
        const publicId = user.photoUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`user_profiles/${publicId}`);
      }

      // Upload new photo
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "user_profiles",
        resource_type: "auto"
      });
      uploadedPhotoUrl = result.secure_url;
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;
    if (req.file) user.photoUrl = uploadedPhotoUrl;

    await user.save();

    // Return updated user (excluding sensitive data)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
      bio: user.bio,
      location: user.location,
      role: user.role,
      enrolledCourses: user.enrolledCourses,
      createdAt: user.createdAt,
    };

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: userResponse
    });

  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};



export const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware

    const user = await User.findById(userId).populate({
      path: "enrolledCourses",
      populate: {
        path: "creator", // If your Course has instructor reference
        select: "name",
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ courses: user.enrolledCourses });
  } catch (error) {
    console.error("Error getting enrolled courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};