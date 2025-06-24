import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CourseCard = ({ course }) => {
  const navigate = useNavigate();
console.log(course);

  const handleEnroll = () => {
    navigate(`/course/${course._id}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Course Thumbnail */}
      <img
        src={course.courseThumbnail}
        alt={course.courseTitle}
        className="h-40 w-full object-cover rounded-md mb-4"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/600x400/E0E0E0/333333?text=Course";
        }}
      />

      {/* Course Title */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 truncate">
        {course.courseTitle}
      </h3>

      {/* Instructor */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
        Instructor: {course.creator?.[0]?.name || "N/A"}
      </p>

      {/* Category & Level */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {course.category} • {course.courseLevel}
      </p>

      {/* Price & Enroll */}
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
          ₹{course.coursePrice}
        </span>
        <button
          onClick={handleEnroll}
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600 transition-colors duration-300"
        >
          Enroll
        </button>
      </div>
    </div>
  );
};
