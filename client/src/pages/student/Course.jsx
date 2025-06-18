import React from 'react';

// Course Card Component
export const CourseCard = ({ course }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
    {/* Course Image */}
    <img
      src={course.image}
      alt={course.title}
      className="h-40 w-full object-cover rounded-md mb-4"
      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/E0E0E0/333333?text=Course"; }} // Placeholder on error
    />
    {/* Course Title */}
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 truncate">
      {course.title}
    </h3>
    {/* Course Instructor */}
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
      Instructor: {course.instructor}
    </p>
    {/* Course Description */}
    <p className="text-md text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
      {course.description}
    </p>
    {/* Course Price/Enroll Button */}
    <div className="flex justify-between items-center">
      {/* Assuming 'text-primary' and 'bg-primary' are custom Tailwind colors defined in your tailwind.config.js */}
      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">${course.price}</span>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600 transition-colors duration-300">
        Enroll
      </button>
    </div>
  </div>
);