import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAllCoursesQuery } from '@/features/api/courseApi';
import { CourseCard } from './Course';

export const Courses = () => {
  const { data, isLoading, isError, error } = useGetAllCoursesQuery();
  const user = useSelector((state) => state.auth?.user);

  // ✅ Show loading state
  if (isLoading) {
    return (
      <div className="container min-h-[500px] mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Our Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCourseCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  // ✅ Show error state
  if (isError) {
    return (
      <div className="container min-h-[500px] mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Our Courses
        </h2>
        <div className="text-red-500">
          Error: {error?.data?.message || 'Something went wrong.'}
        </div>
      </div>
    );
  }

  const courses = data?.courses || [];

  return (
    <div className="container min-h-[500px] mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Our Courses
      </h2>

      {courses.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400 mt-10">
          No courses available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => {
            const isEnrolled = user?.enrolledCourses?.some((enrolled) =>
              (typeof enrolled === 'string'
                ? enrolled
                : enrolled?._id || enrolled
              )?.toString() === course._id.toString()
            );

            return (
              <CourseCard
                key={course._id?.toString() || `course-${index}`}
                course={course}
                isEnrolled={isEnrolled}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export const SkeletonCourseCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md animate-pulse">
    <div className="h-40 w-full bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
  </div>
);
