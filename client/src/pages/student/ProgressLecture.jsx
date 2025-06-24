import React from 'react';
import { useParams } from 'react-router-dom';
import { FaRegCheckCircle, FaPlayCircle } from 'react-icons/fa';
import { useGetCourseLecturesQuery } from '@/features/api/courseApi';

export const ProgressLecture = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError } = useGetCourseLecturesQuery(courseId);
  const lectures = data?.lectures || [];

  if (isLoading) return <div className="text-center mt-20 text-gray-700 dark:text-white">Loading lectures...</div>;
  if (isError) return <div className="text-center mt-20 text-red-500">Failed to load lectures.</div>;

  return (
    <div className="min-h-screen mt-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-inter p-4 sm:p-8 transition-colors duration-300">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-8 px-4 sm:px-0">
        <h1 className="text-xl sm:text-2xl font-bold">{data?.courseTitle || "No Title"}</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm sm:text-base">Mark as complete</span>
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-200">
            <img
              src="https://placehold.co/40x40/000000/FFFFFF?text=JP"
              alt="User Avatar"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/40x40/000000/FFFFFF?text=JP";
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row gap-8">
        
        {/* Video Section */}
        <section className="flex-1 lg:w-3/5 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <div className="aspect-w-16 aspect-h-9 w-full">
            <video
              className="w-full h-full"
              src={lectures[0]?.videoUrl}
              controls
              controlsList="nodownload"
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-4">
            <h2 className="text-lg sm:text-xl font-semibold">{lectures[0]?.lectureTitle || "No Title"}</h2>
          </div>
        </section>

        {/* Lecture List */}
        <aside className="lg:w-2/5 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Course Lectures</h2>
          <ul className="space-y-3">
            {lectures.map((lecture) => (
              <li
                key={lecture._id}
                className={`flex items-center p-3 rounded-md transition-colors duration-200 cursor-pointer
                ${lecture.completed ? 'bg-gray-200 dark:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                {lecture.completed ? (
                  <FaRegCheckCircle className="text-green-500 mr-3 text-xl sm:text-2xl" />
                ) : (
                  <FaPlayCircle className="text-blue-500 mr-3 text-xl sm:text-2xl" />
                )}
                <span className="flex-1 text-sm sm:text-base">{lecture.lectureTitle}</span>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
};
