// ✅ 1. Mongoose Model: models/Progress.js
import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  completedLectures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecture',
    }
  ],
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

progressSchema.index({ user: 1, course: 1 }, { unique: true });

export const Progress = mongoose.model('Progress', progressSchema);