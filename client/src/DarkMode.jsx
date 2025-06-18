import React, { useState, useEffect, useRef } from "react";
// Assuming 'next-themes' is an external library not tied to Shadcn UI components
import { useTheme } from "next-themes";

export const DarkMode = () => {
    const { setTheme, theme } = useTheme(); // Also get current theme to update icon
    const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
    const dropdownRef = useRef(null); // Ref for the dropdown container

    // Function to toggle the dropdown visibility
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Function to set theme and close dropdown
    const handleSetTheme = (newTheme) => {
        setTheme(newTheme);
        setIsOpen(false);
    };

    // Effect to handle clicks outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
                {/* Button that triggers the theme dropdown */}
                <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 cursor-pointer w-10 h-10"
                    id="menu-button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                >
                    {/* Sun icon */}
                    <svg
                        className={`h-5 w-5 transition-transform duration-300 ${theme === 'dark' ? 'scale-0 -rotate-90' : 'scale-100 rotate-0'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M2 12h1m15.325-4.675l-.707-.707M6.343 17.657l-.707.707M17.657 6.343l.707-.707M6.343 6.343l-.707.707M16.924 12a4.999 4.999 0 11-9.998 0A4.999 4.999 0 0116.924 12z"></path>
                    </svg>
                    {/* Moon icon */}
                    <svg
                        className={`absolute h-5 w-5 transition-transform duration-300 ${theme === 'light' ? 'scale-0 rotate-90' : 'scale-100 rotate-0'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                    </svg>
                    <span className="sr-only">Toggle theme</span>
                </button>
            </div>

            {/* Dropdown menu content, conditionally rendered */}
            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        <button
                            onClick={() => handleSetTheme("light")}
                            className="text-gray-700 dark:text-gray-300 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md mx-1 my-1"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-0"
                        >
                            Light
                        </button>
                        <button
                            onClick={() => handleSetTheme("dark")}
                            className="text-gray-700 dark:text-gray-300 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md mx-1 my-1"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-1"
                        >
                            Dark
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
