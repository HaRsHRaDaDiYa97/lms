import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"; // Assuming react-router-dom is correctly set up

export const CustomDropdown = ({ user, logoutUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Function to handle user logout
    const logoutHandler = async () => {
        if (logoutUser) {
            await logoutUser();
        }
        setIsOpen(false); // Close dropdown after logout
    }

    // Effect to close dropdown when clicking outside of it
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

    // Return null if user data is not provided, preventing rendering
    if (!user) {
        return null;
    }

    return (
        // Main container for the dropdown, positioned relatively
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
                {/* Button that toggles the dropdown visibility */}
                <button
                    type="button"
                    className="inline-flex cursor-pointer items-center justify-center p-1 rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition duration-150 ease-in-out"
                    id="menu-button"
                    aria-expanded={isOpen ? "true" : "false"} // Dynamic aria-expanded
                    aria-haspopup="true"
                    onClick={() => setIsOpen(!isOpen)} // Toggle isOpen state
                >
                    {/* User Avatar with fallback placeholder */}
                    <img
                        src={user?.photoUrl || "https://placehold.co/40x40/FF5733/FFFFFF?text=?"}
                        alt="User Avatar"
                        className="h-10 w-10 rounded-full object-cover border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-300 transition duration-150 ease-in-out"
                        onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loop if fallback also fails
                            e.target.src = "https://placehold.co/40x40/FF5733/FFFFFF?text=?" // Fallback image
                        }}
                    />
                    <span className="sr-only">Open user menu</span>
                </button>
            </div>

            {/* Dropdown menu content, conditionally rendered with transition */}
            <div
                className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg
                    bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5
                    focus:outline-none transform transition-all duration-300 origin-top-right
                    ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
            >
                <div className="py-1" role="none">
                    {/* User information header */}
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-semibold truncate">{user?.name || "User"}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">View Profile</p>
                    </div>

                    {/* Navigation Links */}
                    <Link to="/my-learning" onClick={() => setIsOpen(false)}>
                        <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200
                            hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md m-1 transition-colors duration-150"
                            role="menuitem"
                        >
                            My Learning
                        </button>
                    </Link>

                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                        <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200
                            hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md m-1 transition-colors duration-150"
                            role="menuitem"
                        >
                            Profile
                        </button>
                    </Link>

                    {user?.role == "instructor" && (
                        <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                            <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200
                            hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md m-1 transition-colors duration-150"
                                role="menuitem"
                            >
                                Dashboard
                            </button>
                        </Link>
                    )}
                    {/* Separator */}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

                    {/* Logout button */}
                    <button
                        onClick={logoutHandler}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400
                        hover:bg-red-100 dark:hover:bg-red-900 rounded-md m-1 transition-colors duration-150"
                        role="menuitem"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};
