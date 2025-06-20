import { useCreateCourseMutation } from '@/features/api/courseApi';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const AddCourse = () => {

    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [category, setCategory] = useState('');
    const [coursePrice, setCoursePrice] = useState('');
    const navigation = useNavigate();
    const [createCourse, { isLoading, isSuccess, isError, error }] = useCreateCourseMutation();

    // ✅ Show toast when course is added or error happens
    useEffect(() => {
        if (isSuccess) {
            toast.success('🎉 Course created successfully!');
           navigation("/admin/course")
            setCourseTitle('');
            setCourseDescription('');
            setCategory('');
            setCoursePrice('');
        }
        if (isError) {
            toast.error(error?.data?.message || '❌ Failed to create course!');
        }
    }, [isSuccess, isError, error]);

    // ✅ Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCourse({
                courseTitle,
                courseDescription,
                category,
                coursePrice: parseFloat(coursePrice),
            }).unwrap();
            
        } catch (err) {
            // handled in useEffect
        }
    };
    return (
        <div className="mt-25 md:mt-16 p-4 sm:p-6 lg:p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            {/* Header with Title */}
            <div className="mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
                    Add New Course
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
                    Fill in the details below to create a new course.
                </p>
            </div>

            {/* Course Submission Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Title Input */}
                <div>
                    <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Course Title
                    </label>
                    <input
                        type="text"
                        id="courseTitle"
                        name="courseTitle"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        placeholder="e.g., Introduction to React"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm
                                   bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                                   focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>

                {/* Course Description Textarea */}
                <div>
                    <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Course Description
                    </label>
                    <textarea
                        id="courseDescription"
                        name="courseDescription"
                        rows="4"
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        placeholder="Provide a detailed description of the course content and objectives."
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm
                                   bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                                   focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y"
                        required
                    ></textarea>
                </div>

                {/* Category Input */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Category
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g., Programming, Design, Marketing"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm
                                   bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                                   focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>

                {/* Course Price Input */}
                <div>
                    <label htmlFor="coursePrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Course Price ($)
                    </label>
                    <input
                        type="number"
                        id="coursePrice"
                        name="coursePrice"
                        value={coursePrice}
                        onChange={(e) => setCoursePrice(e.target.value)}
                        placeholder="e.g., 99.99"
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm
                                   bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                                   focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                 
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md
                               hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800
                               transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                >
                    Add Course
                </button>
            </form>


        </div>
    );
};
