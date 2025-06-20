import React, { useEffect, useState } from "react";
// Import icons from react-icons (Material Design Icons example)
import { MdBook, MdClose, MdDashboard, MdLogin,  MdMenu, MdPerson, MdSchool, MdVpnKey } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { DarkMode } from "@/DarkMode";
import { CustomDropdown } from "./CustomDropdown";
import UserAvatar from "./UserAvtar";


export const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
    const navigate = useNavigate();

    // Mock user and logoutUser function for demonstration
    const [currentUser, setCurrentUser] = useState({
        name: "John Doe",
        photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });

    const mockLogout = () => {
        alert("Logging out user..."); // Use a simple alert for demonstration
        setCurrentUser(null); // Simulate user logout
    };

    // Effect to handle logout success and navigate
    useEffect(() => {
        if (isSuccess) {
            navigate("/login");
            toast.success(data?.message || "Logged out successfully");
        }
    }, [isSuccess, data, navigate]);

    return (
        <div className="h-16 duration-300 z-10 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 shadow-sm">
            {/* Desktop View */}
            <div className="hidden md:flex max-w-7xl mx-auto justify-between items-center h-full px-4">
                {/* Logo */}
                <Link to="/" className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
                    <div className="flex items-center gap-2">
                        <MdSchool size={30} className="text-blue-600 dark:text-blue-400" />
                        <h1 className="font-extrabold text-2xl text-gray-900 dark:text-white">E-Learning</h1>
                    </div>
                </Link>

                <div className="flex items-center gap-4">
                    <DarkMode /> {/* Dark mode toggle */}
                    {user ? (
                        // Render CustomDropdown if user is logged in
                        <CustomDropdown user={user} logoutUser={logoutUser} />
                    ) : (
                        // Render Login/Register buttons if no user
                        <div className="flex gap-2">
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile View */}
            <div className="flex md:hidden justify-between items-center h-full px-4">
                <Link to="/" className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
                    <div className="flex items-center justify-center gap-2">
                        <MdSchool size={30} className="text-blue-600 dark:text-blue-400" />
                        <h1 className="font-extrabold text-2xl text-gray-900 dark:text-white">E-Learning</h1>
                    </div>
                </Link>
                <div className="flex items-center justify-center gap-3">
                    <MobileNavbar /> {/* Mobile menu component */}
                </div>
            </div>
        </div>
    );
};

/**
 * MobileNavbar component for the slide-in menu on mobile devices.
 * Replaces Shadcn's Sheet component.
 */
const MobileNavbar = () => {
    const { user } = useSelector(store => store.auth); // Get user from Redux store
    const [isSheetOpen, setIsSheetOpen] = useState(false); // State to control mobile menu visibility
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();

    // Handler for user logout
    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            setIsSheetOpen(false); // Close the mobile menu after logout
            navigate('/login');
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Logout failed. Please try again.");
            console.error("Logout error:", error);
        }
    };

    return (
        <>
             {/* Mobile Menu Trigger Button */}
            <button
                onClick={() => setIsSheetOpen(true)}
                className="p-3 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105"
                aria-label="Open mobile menu"
            >
                <MdMenu size={24} />
            </button>

            {/* Overlay to dim background when menu is open */}
            {isSheetOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 animate-fade-in"
                    onClick={() => setIsSheetOpen(false)}
                    aria-hidden="true"
                ></div>
            )}

            {/* Mobile Menu Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-72 max-w-xs bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-400 ease-in-out z-50 rounded-l-xl
                ${isSheetOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation Menu"
            >
                <div className="p-6 flex flex-col h-full">
                    {/* Header Section */}
                    <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700">
                          <Link to="/"  onClick={() => setIsSheetOpen(false)}>
                        <div className="flex items-center gap-3">
                            <MdSchool size={28} className="text-blue-600 dark:text-blue-400" />
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">E-Learning</h2>
                        </div>
                        </Link>
                        <button
                            onClick={() => setIsSheetOpen(false)}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Close mobile menu"
                        >
                            <MdClose size={24} />
                        </button>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 mb-8 leading-relaxed">
                        Navigate your learning journey, manage your profile, and more.
                    </p>

                    {/* User Info (if logged in) */}
                    {user && (
                        <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <UserAvatar user={user} size="md" /> {/* Assuming UserAvatar takes a user prop and size */}
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-900 dark:text-white">{user?.name || 'Learner'}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</span>
                            </div>
                        </div>
                    )}

                    {/* Navigation and Account Sections */}
                    <div className="flex flex-col gap-8 flex-grow">
                        {/* Navigation Section */}
                        <div>
                            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                                Navigation
                            </h3>
                            <nav className="flex flex-col gap-2">
                                <Link
                                    to="/my-learning"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                                    onClick={() => setIsSheetOpen(false)}
                                >
                                    <MdBook size={20} className="text-blue-500" />
                                    My Learning
                                </Link>
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                                    onClick={() => setIsSheetOpen(false)}
                                >
                                    <MdPerson size={20} className="text-green-500" />
                                    Edit Profile
                                </Link>
                            </nav>
                        </div>

                        {/* Account Actions */}
                        <div className="mt-auto pt-4"> {/* mt-auto pushes this section to the bottom */}
                            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                                Account
                            </h3>
                            <nav className="flex flex-col gap-2">
                                {user ? (
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                                        
                                    >                                        
                                        Logout
                                    </button>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                                            onClick={() => setIsSheetOpen(false)}
                                        >
                                            <MdLogin size={20} className="text-purple-500" />
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                                            onClick={() => setIsSheetOpen(false)}
                                        >
                                            <MdVpnKey size={20} />
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>

                        {/* Instructor-only section */}
                        {user?.role === "instructor" && (
                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                                <Link
                                    to="/dashboard"
                                    className="flex items-center justify-center gap-3 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                                    onClick={() => setIsSheetOpen(false)}
                                >
                                    <MdDashboard size={20} />
                                    Go to Dashboard
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};