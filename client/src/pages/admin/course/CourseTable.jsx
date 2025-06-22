import React from 'react';
import { useGetAllCoursesQuery } from '@/features/api/courseApi';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // Import React Icons

export const CourseTable = () => {
    const navigate = useNavigate();

    // RTK Query hook
    const { data, isLoading, isError, error } = useGetAllCoursesQuery();
    const courses = data?.courses || [];

    // Helper to format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Skeleton Row Component
    const SkeletonRow = () => (
        <tr className="animate-pulse">
            {[...Array(6)].map((_, idx) => (
                <td key={idx} className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                </td>
            ))}
        </tr>
    );

    return (
        <div className="mt-8 md:mt-12 p-4 sm:p-6 lg:p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    Course Management
                </h2>
                <button
                    onClick={() => navigate("/admin/course/create-course")}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-md
                               hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800
                               transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                >
                    <FaPlus className="h-5 w-5" /> {/* React Icon */}
                    Create New Course
                </button>
            </div>

            {/* Course Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Instructor
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Enrollments
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {isLoading ? (
                            [...Array(5)].map((_, idx) => <SkeletonRow key={idx} />)
                        ) : isError ? (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-red-600 dark:text-red-400">
                                    Failed to load courses: {error?.data?.message || error?.error}
                                </td>
                            </tr>
                        ) : courses.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-gray-500 dark:text-gray-400">
                                    No courses found.
                                </td>
                            </tr>
                        ) : (
                            courses.map((course) => (
                                <tr key={course._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {course.courseTitle}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {formatDate(course.updatedAt)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                        {course.creator?.[0]?.name || "Unknown"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                            {course.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                        {course.enrolledStudents?.length || 0}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            course.isPublished
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                        }`}>
                                            {course.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-3">
                                           
                                            <button onClick={()=> navigate(`${course._id}`)}
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 transition duration-150 ease-in-out"
                                                aria-label="Edit"
                                            >
                                                <FaEdit className="h-5 w-5" /> {/* React Icon */}
                                            </button>
                                          
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};