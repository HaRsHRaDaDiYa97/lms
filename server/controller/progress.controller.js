import { Course } from "../model/course.model.js";
import { Progress } from "../model/progress.model.js";


export const markLectureComplete = async (req, res) => {
  try {
    const { courseId, lectureId } = req.body;
    const userId = req.user._id;

    let progress = await Progress.findOne({ user: userId, course: courseId });
    if (!progress) {
      progress = new Progress({ user: userId, course: courseId, completedLectures: [] });
    }

    if (!progress.completedLectures.includes(lectureId)) {
      progress.completedLectures.push(lectureId);
    }

    const course = await Course.findById(courseId).populate('lectures');
    const allLectures = course.lectures.map(l => l._id.toString());

    const completed = allLectures.every(id => progress.completedLectures.map(l => l.toString()).includes(id));
    progress.completed = completed;

    await progress.save();

    res.status(200).json({ success: true, progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update progress' });
  }
};

export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    let progress = await Progress.findOne({ user: userId, course: courseId });

    // 🔄 If no progress exists, return default progress instead of 404
    if (!progress) {
      return res.status(200).json({
        success: true,
        progress: {
          user: userId,
          course: courseId,
          completedLectures: [],
          completed: false,
        },
      });
    }

    res.status(200).json({ success: true, progress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ message: 'Failed to fetch progress' });
  }
};
