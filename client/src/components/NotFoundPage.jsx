import React from 'react';

const NotFoundPage = () => {
  return (
   <div className="min-h-screen flex flex-col items-center justify-center p-4
                    bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100
                    font-inter relative overflow-hidden transition-colors duration-500">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }

          /* Keyframes for a subtle background flicker/glitch effect */
          @keyframes flicker {
            0% { opacity: 0.9; }
            5% { opacity: 0.8; }
            10% { opacity: 1; }
            15% { opacity: 0.7; }
            20% { opacity: 0.9; }
            100% { opacity: 0.9; }
          }

          /* Apply flicker animation to a pseudo-element for background texture */
          .flicker-bg::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: radial-gradient(circle, rgba(120, 80, 200, 0.05) 1px, transparent 1px),
                              radial-gradient(circle, rgba(120, 80, 200, 0.05) 1px, transparent 1px);
            background-size: 40px 40px;
            background-position: 0 0, 20px 20px;
            animation: flicker 4s infinite alternate; /* Subtle flicker */
            z-index: 0; /* Ensure content is above it */
          }
          .dark .flicker-bg::before {
             background-image: radial-gradient(circle, rgba(80, 100, 255, 0.05) 1px, transparent 1px),
                               radial-gradient(circle, rgba(80, 100, 255, 0.05) 1px, transparent 1px);
          }

          /* Keyframes for the "broken" 404 number animation */
          @keyframes glitch {
            0% {
              text-shadow: 0.05em 0 0 #ff00ff, -0.05em -0.025em 0 #00ffff, -0.025em 0.05em 0 #ff0000;
              transform: skew(0.5deg);
            }
            14% {
              text-shadow: 0.05em 0 0 #ff00ff, -0.05em -0.025em 0 #00ffff, -0.025em 0.05em 0 #ff0000;
              transform: skew(0.5deg);
            }
            15% {
              text-shadow: -0.05em -0.025em 0 #ff00ff, 0.025em 0.025em 0 #00ffff, -0.05em -0.05em 0 #ff0000;
              transform: skew(-1deg);
            }
            17% {
              text-shadow: -0.05em -0.025em 0 #ff00ff, 0.025em 0.025em 0 #00ffff, -0.05em -0.05em 0 #ff0000;
              transform: skew(-1deg);
            }
            20% {
              text-shadow: 0.05em 0.025em 0 #ff00ff, -0.05em -0.05em 0 #00ffff, 0.025em -0.025em 0 #ff0000;
              transform: skew(0deg);
            }
            21% {
              text-shadow: 0.05em 0.025em 0 #ff00ff, -0.05em -0.05em 0 #00ffff, 0.025em -0.025em 0 #ff0000;
              transform: skew(0deg);
            }
            30% {
              text-shadow: 0.05em 0 0 #ff00ff, -0.05em -0.025em 0 #00ffff, -0.025em 0.05em 0 #ff0000;
              transform: skew(0.5deg);
            }
            100% {
              text-shadow: 0.05em 0 0 #ff00ff, -0.05em -0.025em 0 #00ffff, -0.025em 0.05em 0 #ff0000;
              transform: skew(0.5deg);
            }
          }
          .glitch-text {
            animation: glitch 1.5s infinite alternate-reverse;
          }
        `}
      </style>

      {/* Background flicker pattern overlay */}
      <div className="flicker-bg absolute inset-0"></div>

      {/* Content Card */}
      <div className="relative z-10 max-w-lg w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 text-center
                      border border-gray-200 dark:border-gray-700 transform transition-all duration-300
                      hover:scale-105 ease-in-out">

        {/* Large "404" with a glitch effect */}
        <h1 className="text-7xl md:text-8xl font-extrabold mb-6 glitch-text
                       text-gray-800 dark:text-gray-100">
          404
        </h1>

        {/* Abstract SVG Illustration */}
        {/* Represents a broken connection or fragmented data */}
        <div className="mb-8 flex justify-center">
          <svg
            className="w-40 h-40 text-blue-500 dark:text-blue-300 transform rotate-3 animate-pulse"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="20" y="20" width="60" height="60" fill="currentColor" opacity="0.8" />
            <rect x="120" y="20" width="60" height="60" fill="currentColor" opacity="0.8" />
            <rect x="20" y="120" width="60" height="60" fill="currentColor" opacity="0.8" />
            <rect x="120" y="120" width="60" height="60" fill="currentColor" opacity="0.8" />
            <line x1="80" y1="50" x2="120" y2="50" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeDasharray="10 10"/>
            <line x1="80" y1="150" x2="120" y2="150" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeDasharray="10 10"/>
            <line x1="50" y1="80" x2="50" y2="120" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeDasharray="10 10"/>
            <line x1="150" y1="80" x2="150" y2="120" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeDasharray="10 10"/>
          </svg>
        </div>


        {/* Main Message */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-gray-800 dark:text-gray-100">
          Connection Interrupted!
        </h2>

        {/* Explanatory Text */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          It seems the signal was lost. The page you're looking for
          couldn't be reached.
        </p>

        {/* Go to Home Button */}
        <button
          onClick={() => {
            console.log("Navigating to home page...");
            window.location.href = '/'; // Simple redirection for demonstration
          }}
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent
                     text-base font-medium rounded-full shadow-lg text-white
                     bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700
                     dark:from-blue-600 dark:to-cyan-600 dark:hover:from-blue-700 dark:hover:to-cyan-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                     dark:focus:ring-offset-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Restore Signal
          <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
