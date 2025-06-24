import React from 'react';
import { useGetAllCoursesQuery } from '@/features/api/courseApi';
import { CourseCard } from './Course';

export const Courses = () => {
  const { data, isLoading, isError, error } = useGetAllCoursesQuery();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Our Courses
      </h2>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCourseCard key={index} />
          ))}
        </div>
      ) : isError ? (
        <div className="text-red-500 text-center">Error: {error?.data?.message || 'Something went wrong.'}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.courses?.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}

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
