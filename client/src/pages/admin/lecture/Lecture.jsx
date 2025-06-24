import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const Lecture = ({ lectureId, courseId, lecture, index }) => {


const navigate = useNavigate();

const gotoUpdateLecture = () => {
navigate(`/instructor/course/${courseId}/lecture/${lectureId}`);
}

  return (
    <li className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      
      {/* Lecture Number */}
      <div>
        <h2 className="font-semibold text-sm text-gray-700 dark:text-gray-300">
          Lecture {index + 1}
        </h2>
        {/* Lecture Title */}
        <h3 className="font-medium text-base md:text-lg">
          {lecture.lectureTitle}
        </h3>
      </div>

      {/* Edit Icon */}
      <button
        className="text-black cursor-pointer dark:text-gray-400 hover:text-green-500 dark:hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={gotoUpdateLecture}
        aria-label={`Edit ${lecture.lectureTitle}`}
      >
        <FiEdit className="w-5 h-5" />
      </button>
    </li>
  );
};
