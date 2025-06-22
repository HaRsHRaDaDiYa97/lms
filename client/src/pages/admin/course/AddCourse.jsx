import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCreateCourseMutation } from '@/features/api/courseApi';

export const AddCourse = () => {
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [category, setCategory] = useState('');
    const [coursePrice, setCoursePrice] = useState('');

    const navigate = useNavigate();
    const [createCourse, { isLoading, isSuccess, isError, error }] = useCreateCourseMutation();

    // Show toast when course is added or error happens
    useEffect(() => {
        if (isSuccess) {
            toast.success('🎉 Course created successfully!');
            navigate("/admin/course");
            // Optionally reset form fields after successful creation and navigation
            setCourseTitle('');
            setCourseDescription('');
            setCategory('');
            setCoursePrice('');
        }
        if (isError) {
            toast.error(error?.data?.message || '❌ Failed to create course!');
        }
    }, [isSuccess, isError, error, navigate]);

    // Submit handler
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
            // Error is handled in useEffect
        }
    };



    return (
        <div className="min-h-screen mt-5 dark:bg-gray-900 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b dark:border-gray-700">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Add New Course Details
                    </h1>
                    {/* The "Go to lectures page" button is more appropriate for an edit page,
                        but keeping it here for design consistency if desired.
                        Consider removing or changing its functionality for an add page. */}
                    <button
                        onClick={() => navigate('/admin/course')} // Example navigation
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 font-medium transition-colors duration-200"
                    >
                        View All Courses
                    </button>
                </div>

                {/* Action Buttons Section - Adjusted for Add Course */}
                <div className="flex justify-end items-center mb-8 gap-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mr-auto">
                        Fill in the details below to create your new course.
                    </p>
                    {/* Publishing and Removing buttons are not typical for a new course creation form,
                        but can be adapted if your workflow allows immediate publishing upon creation.
                        For now, only the "Add Course" button will perform the main action. */}
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Course Information */}
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4 border-gray-200 dark:border-gray-700">
                        Basic Course Information
                    </h2>

                    <div>
                        <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="courseTitle"
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700
                                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="e.g., The Complete Web Development Bootcamp"
                            required
                        />
                    </div>



                    <div>
                        <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description
                        </label>
                        {/* This part mimics a rich text editor UI, but uses a textarea for simplicity */}
                        <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden bg-white dark:bg-gray-700">
                            <div className="flex items-center space-x-2 p-2 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                                {/* Mimicking the formatting toolbar */}
                                <span className="font-bold text-gray-700 dark:text-gray-300">Normal</span>
                                <span className="text-gray-500 dark:text-gray-400">|</span>
                                <button type="button" className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold">B</button>
                                <button type="button" className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 italic">I</button>
                                <button type="button" className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 underline">U</button>
                                <button type="button" className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">🔗</button>
                                <button type="button" className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">📊</button>
                                <button type="button" className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">📝</button>
                                <button type="button" className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">✂️</button>
                            </div>
                            <textarea
                                id="courseDescription"
                                rows="6"
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}
                                className="block w-full py-2 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 resize-y
                                           focus:outline-none sm:text-sm"
                                placeholder="Write a detailed description of your course..."
                                required
                            ></textarea>
                        </div>
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            Provide a comprehensive overview of your course content and learning objectives.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {/* Category Input */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Category
                            </label>
                            <input
                                type="text"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700
                                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="e.g., Web Development"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="coursePrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Price in (INR)
                            </label>
                            <input
                                type="number"
                                id="coursePrice"
                                value={coursePrice}
                                onChange={(e) => setCoursePrice(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700
                                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="e.g., 299"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>


                    {/* Footer (Add Course Button) */}
                    <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700
                                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200
                                       disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Adding Course...' : 'Add Course'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};