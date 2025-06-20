import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        courseTitle: {
            type: String,
            required: [true, "Course title is required"],
            trim: true,
        },
        courseDescription: {
            type: String,
            required: [true, "Course description is required"],
        },
        category: {
            type: String,
            required: true,
        },
        courseLevel: {
            type: String,
            enum: ["Beginner", "Medium", "Advance"]
        },
        coursePrice: {
            type: Number,
            required: [true, "Course price is required"],
        },
        courseThumbnail: {
            type: String,
        },
        enrolledStudents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        lectures: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Lecture'
            }
        ],
        creator: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        isPublished: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
