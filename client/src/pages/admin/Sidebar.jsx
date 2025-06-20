import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom'; // ✅ Add Outlet
import { MdDashboard, MdSchool, MdBook, MdClose, MdMenu } from 'react-icons/md';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navbarHeightClass = 'top-16';

    return (
        <>
        
            {/* Hamburger Menu */}
            <button
                className={`fixed ${navbarHeightClass} left-4 z-5 p-2 rounded-md bg-gray-200 dark:bg-gray-700 md:hidden ${isSidebarOpen ? 'hidden' : 'block'}`}
                onClick={toggleSidebar}
                aria-label="Open sidebar menu"
            >
                <MdMenu size={28} className="text-gray-800 dark:text-white" />
            </button>

            {/* Sidebar */}
            <aside
                className={`
                    fixed ${navbarHeightClass} left-0 h-[calc(100%-4rem)] w-64
                    bg-white dark:bg-gray-800 shadow-xl z-40 transform
                    transition-transform duration-300 ease-in-out flex flex-col
                    rounded-r-xl
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0
                `}
                aria-label="Main Sidebar Navigation"
            >
                <nav className="flex flex-col gap-3 flex-grow p-2">
                    <Link
                        to="/admin/dashboard"
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300
                                     hover:bg-blue-50 dark:hover:bg-gray-700
                                     transition-colors duration-200 ease-in-out
                                     ${location.pathname === "/admin/dashboard" ? "bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-300" : ""}`}
                        onClick={toggleSidebar}
                    >
                        <MdDashboard size={24} className="text-purple-600 dark:text-purple-400" />
                        <span className="text-lg font-medium">Dashboard</span>
                    </Link>

                    <Link
                        to="/admin/course"
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300
                                     hover:bg-blue-50 dark:hover:bg-gray-700
                                     transition-colors duration-200 ease-in-out
                                     ${location.pathname === "/admin/add-course" ? "bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-300" : ""}`}
                        onClick={toggleSidebar}
                    >
                        <MdSchool size={24} className="text-green-600 dark:text-green-400" />
                        <span className="text-lg font-medium">Course</span>
                    </Link>
                </nav>
            </aside>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className={`fixed inset-0 bg-black opacity-50 z-20 md:hidden ${navbarHeightClass}`}
                    onClick={toggleSidebar}
                ></div>
            )}

        

        </>
    );
};

export default Sidebar;
