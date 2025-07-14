// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export const CourseCard = ({
//   course,
//   isEnrolled = false,
//   isCompleted = false,
//   hasPreviewLecture = false,
// }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     if (course?._id) {
//       navigate(`/course/${course._id}`);
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 relative">
      
//       {/* ✅ Completed Badge */}
//       {isCompleted && (
//         <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
//           Completed
//         </span>
//       )}

//       {/* ✅ Course Thumbnail */}
//       <img
//         src={course.courseThumbnail}
//         alt={course.courseTitle}
//         className="h-40 w-full object-cover rounded-md mb-4"
//         onError={(e) => {
//           e.target.onerror = null;
//           e.target.src = "https://placehold.co/600x400/E0E0E0/333333?text=Course";
//         }}
//       />

//       {/* ✅ Course Title */}
//       <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 truncate">
//         {course.courseTitle}
//       </h3>

//       {/* ✅ Instructor */}
//       <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
//         Instructor: {course.creator?.[0]?.name || "N/A"}
//       </p>

//       {/* ✅ Category & Level */}
//       <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
//         {course.category} • {course.courseLevel}
//       </p>

//       {/* ✅ Preview Available */}
//       {hasPreviewLecture && (
//         <p className="text-xs text-yellow-600 dark:text-yellow-400 mb-2">
//           🔓 Free preview available
//         </p>
//       )}

//       {/* ✅ Price & Action */}
//       <div className="flex justify-between items-center">
//         {/* Price */}
//         {course.coursePrice === 0 ? (
//           <span className="text-lg font-bold text-green-600 dark:text-green-400">
//             Free
//           </span>
//         ) : (
//           <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
//             ₹{course.coursePrice}
//           </span>
//         )}

//         {/* Button */}
//         <button
//           onClick={handleClick}
//           className={`${
//             isEnrolled
//               ? 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
//               : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
//           } text-white px-4 py-2 rounded-full text-sm transition-colors duration-300`}
//         >
//           {isEnrolled ? 'Continue Learning' : 'Enroll'}
//         </button>
//       </div>
//     </div>
//   );
// };



import { useGetUserProgressQuery } from '@/features/api/progressApi';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CourseCard = ({
  course,
  isEnrolled = false,
  hasPreviewLecture = false,
}) => {
  const navigate = useNavigate();

  const {
    data: progressData,
    isLoading: progressLoading,
  } = useGetUserProgressQuery(course?._id, {
    skip: !isEnrolled, // ✅ Only fetch if enrolled
  });

  const isCompleted = progressData?.progress?.completed;

  const handleClick = () => {
    if (course?._id) {
      navigate(`/course/${course._id}`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 relative">
      
      {/* ✅ Completed Badge */}
      {isCompleted && (
        <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
          Completed
        </span>
      )}

      {/* ✅ Course Thumbnail */}
      <img
        src={course.courseThumbnail}
        alt={course.courseTitle}
        className="h-40 w-full object-cover rounded-md mb-4"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/600x400/E0E0E0/333333?text=Course";
        }}
      />

      {/* ✅ Title */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 truncate">
        {course.courseTitle}
      </h3>

      {/* ✅ Instructor */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
        Instructor: {course.creator?.[0]?.name || "N/A"}
      </p>

      {/* ✅ Category */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {course.category} • {course.courseLevel}
      </p>

      {/* ✅ Preview Available */}
      {hasPreviewLecture && (
        <p className="text-xs text-yellow-600 dark:text-yellow-400 mb-2">
          🔓 Free preview available
        </p>
      )}

      {/* ✅ Price & Action Button */}
      <div className="flex justify-between items-center">
        {course.coursePrice === 0 ? (
          <span className="text-lg font-bold text-green-600 dark:text-green-400">Free</span>
        ) : (
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            ₹{course.coursePrice}
          </span>
        )}

        <button
          onClick={handleClick}
          className={`${
            isCompleted
              ? 'bg-gray-600 dark:bg-gray-700 cursor-default'
              : isEnrolled
              ? 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
              : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
          } text-white px-4 py-2 rounded-full text-sm transition-colors duration-300`}
         
        >
          {isCompleted ? 'Completed' : isEnrolled ? 'Continue Learning' : 'Enroll'}
        </button>
      </div>
    </div>
  );
};
