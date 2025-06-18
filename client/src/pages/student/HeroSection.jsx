import React from "react";

// --- SearchBar Component ---
// Improved with better design and full light/dark mode Tailwind CSS
export const SearchBar = () => {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl mx-auto mt-8 px-4">
            <input
                type="text"
                placeholder="Search courses, topics, instructors..."
                // Input styling for light and dark modes
                className="w-full p-3 sm:flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg
                           placeholder-gray-400 dark:placeholder-gray-500" // Placeholder colors for light/dark
            />
            <button
                type="submit"
                // Button styling for light and dark modes
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 flex items-center justify-center text-lg font-medium
                           dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-900" // Dark mode adjustments
            >
                {/* Search icon (SVG) */}
                <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Search
            </button>
        </div>
    );
};

// --- HeroSection Component ---
// Enhanced with light/dark mode adaptive styling
const HeroSection = () => {
    return (
        // Main section for the Hero, with gradient background and responsive padding
        // Background gradient adapts for dark mode
        <section className="w-full mt-16 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black py-20 flex items-center justify-center">
            <div className="max-w-6xl mx-auto px-4 text-center">
                {/* Title */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                    Unlock Your Potential with <span className="text-blue-600 dark:text-blue-400">E-Learning</span>
                </h1>

                {/* Subtitle */}
                {/* Text color adapts for dark mode */}
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Explore high-quality courses, master new skills, and grow your career — all in one place.
                </p>

                {/* Search Bar Component */}
                <SearchBar />

                {/* Explore Button - added for a clear call to action */}
                <div className="mt-8">
                    <button
                        // Button styling for light and dark modes
                        className="px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                                   bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                   dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-900"
                    >
                        Explore Courses
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
