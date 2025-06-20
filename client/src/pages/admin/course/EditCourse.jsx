import React, { useState } from 'react';

export const EditCourse = () => {
    const [title, setTitle] = useState('FullStack developer complete course');
    const [subtitle, setSubtitle] = useState('Become fullstack developer');
    const [description, setDescription] = useState(''); // Assuming a rich text editor is used, this would store its content
    const [category, setCategory] = useState('Fullstack Development'); // Now a text input
    const [courseLevel, setCourseLevel] = useState('Medium');
    const [price, setPrice] = useState('299');
    const [courseThumbnailPreview, setCourseThumbnailPreview] = useState(null); // State to store image URL for preview

    // For a real rich text editor, you'd integrate a library like 'react-quill' or 'draft-js'
    // For now, this is just a textarea with styling.

    const handleSave = () => {
        console.log('Saving course details:', {
            title,
            subtitle,
            description,
            category,
            courseLevel,
            price,
            courseThumbnail: courseThumbnailPreview, // You'd send the actual file in a real scenario
        });
        // Add actual save logic here (e.g., API call)
    };

    const handlePublish = () => {
        console.log('Publishing course');
        // Add actual publish logic here
    };

    const handleRemove = () => {
        console.log('Removing course');
        // Add actual remove logic here
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Read the file as a data URL for immediate preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setCourseThumbnailPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setCourseThumbnailPreview(null);
        }
    };

    return (
        <div className="min-h-screen mt-5 dark:bg-gray-900 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b  dark:border-gray-700">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Add detail information regarding course
                    </h1>
                    <button
                        onClick={() => console.log('Go to lectures page')}
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 font-medium transition-colors duration-200"
                    >
                        Go to lectures page
                    </button>
                </div>

                {/* Action Buttons Section */}
                <div className="flex justify-end items-center mb-8 gap-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mr-auto">
                        Make changes to your courses here. Click save when you're done.
                    </p>
                    <button
                        onClick={handlePublish}
                        className="px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                        Publish
                    </button>
                    <button
                        onClick={handleRemove}
                        className="px-6 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50
                                   dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                        Remove Course
                    </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                    {/* Basic Course Information */}
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4 border-gray-200 dark:border-gray-700">
                        Basic Course Information
                    </h2>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700
                                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="e.g., The Complete Web Development Bootcamp"
                        />
                    </div>

                    <div>
                        <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Subtitle
                        </label>
                        <input
                            type="text"
                            id="subtitle"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700
                                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="e.g., Master web development with HTML, CSS, JavaScript, Node, and React"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description
                        </label>
                        {/* This part mimics a rich text editor UI, but uses a textarea for simplicity */}
                        <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden bg-white dark:bg-gray-700">
                            <div className="flex items-center space-x-2 p-2 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                                {/* Mimicking the formatting toolbar */}
                                <span className="font-bold text-gray-700 dark:text-gray-300">Normal</span>
                                <span className="text-gray-500 dark:text-gray-400">|</span>
                                <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold">B</button>
                                <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 italic">I</button>
                                <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 underline">U</button>
                                <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">🔗</button>
                                <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">📊</button>
                                <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">📝</button>
                                <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">✂️</button>
                            </div>
                            <textarea
                                id="description"
                                rows="6"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="block w-full py-2 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 resize-y
                                           focus:outline-none sm:text-sm"
                                placeholder="Write a detailed description of your course..."
                            ></textarea>
                        </div>
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            With webpack or create-react-app. Make sure you have react and react-dom, and some way to load styles, like <a href="#" className="text-indigo-600 hover:underline">style-loader</a>. See the documentation on <a href="#" className="text-indigo-600 hover:underline">themes</a> for more information.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {/* Category - Changed to Input Text */}
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
                            />
                        </div>
                        <div>
                            <label htmlFor="courseLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Course Level
                            </label>
                            <select
                                id="courseLevel"
                                value={courseLevel}
                                onChange={(e) => setCourseLevel(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md
                                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option>Beginner</option>
                                <option>Medium</option>
                                <option>Advanced</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Price in (INR)
                            </label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700
                                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="e.g., 499"
                            />
                        </div>
                    </div>

                    {/* Course Thumbnail with Preview */}
                    <div>
                        <label htmlFor="courseThumbnail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Course Thumbnail
                        </label>
                        <input
                            type="file"
                            id="courseThumbnail"
                            accept="image/*" // Restrict to image files
                            onChange={handleThumbnailChange}
                            className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                                       file:mr-4 file:py-2 file:px-4
                                       file:rounded-md file:border-0 file:text-sm file:font-semibold
                                       file:bg-indigo-50 file:text-indigo-700
                                       hover:file:bg-indigo-100"
                        />
                        {courseThumbnailPreview && (
                            <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                                <img
                                    src={courseThumbnailPreview}
                                    alt="Course Thumbnail Preview"
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer (Save Button) */}
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};