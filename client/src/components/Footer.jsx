import React from 'react';

export const Footer = () => {

    return (

        <footer className="bg-white py-8 border-t border-gray-200 text-gray-800
                                dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200
                                transition-colors duration-300 ease-in-out rounded-t-lg shadow-inner">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-start justify-between">

                {/* Logo and Description */}
                <div className="flex flex-col items-center md:items-start mb-6 md:mb-0 md:w-1/4 text-center md:text-left">
                    <a href="#" className="flex items-center space-x-2 mb-3">
                        {/* Placeholder Logo SVG for LMS */}
                        <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">LMS Platform</span>
                    </a>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your journey to knowledge starts here. Empowering minds, one course at a time.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col sm:flex-row justify-around md:w-1/2 mb-6 md:mb-0 w-full">
                    <div className="mb-4 sm:mb-0 text-center md:text-left">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 rounded-md p-1 -m-1 inline-block">Home</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 rounded-md p-1 -m-1 inline-block">Courses</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 rounded-md p-1 -m-1 inline-block">About Us</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 rounded-md p-1 -m-1 inline-block">Contact</a></li>
                        </ul>
                    </div>
                    <div className="mb-4 sm:mb-0 text-center md:text-left">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 rounded-md p-1 -m-1 inline-block">Blog</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 rounded-md p-1 -m-1 inline-block">Support</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 rounded-md p-1 -m-1 inline-block">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 rounded-md p-1 -m-1 inline-block">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="flex flex-col items-center md:items-end md:w-1/4 text-center md:text-right w-full">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Follow Us</h3>
                    <div className="flex space-x-4 mb-4">
                        <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200" aria-label="Facebook">
                            {/* Facebook Icon SVG */}
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.815c-3.238 0-4.185 1.259-4.185 4.148v2.852z" /></svg>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200" aria-label="Twitter">
                            {/* Twitter Icon SVG */}
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.797-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.607 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.964-.578 1.797-1.29 2.446-2.126z" /></svg>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200" aria-label="LinkedIn">
                            {/* LinkedIn Icon SVG */}
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} LMS Platform. All rights reserved.
            </div>
        </footer>

    );
};

