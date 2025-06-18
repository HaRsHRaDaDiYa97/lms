import React, { useState, useEffect } from 'react';
import { SkeletonCourseCard } from './Courses'; // Assuming this is correct based on your previous code
import { CourseCard } from './Course'; // Assuming this is correct based on your previous code

export const MyLearning = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Dummy data for enrolled courses
        const dummyCourses = [
          {
            id: 1,
            title: 'Introduction to React.js',
            instructor: 'Jane Doe',
            description: 'Learn the fundamentals of React.js and build your first interactive web application.',
            price: 49.99,
            image: 'https://placehold.co/600x400/A7F3D0/065F46?text=React',
          },
          {
            id: 2,
            title: 'Advanced JavaScript Concepts',
            instructor: 'John Smith',
            description: 'Dive deep into advanced JavaScript features, including closures, prototypes, and asynchronous programming.',
            price: 59.99,
            image: 'https://placehold.co/600x400/93C5FD/1E40AF?text=JavaScript',
          },
        ];
        setCourses(dummyCourses);
      } catch (err) {
        setError("Failed to load courses. Please try again.");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 font-inter mt-16">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">My Learning</h1>

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl relative mb-6" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              // Assuming SkeletonCourseCard also handles dark mode internally or receives props
              <SkeletonCourseCard key={index} />
            ))}
          </div>
        ) : (
          <>
            {courses.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">You are not enrolled in any courses yet.</p>
                <p className="text-gray-500 dark:text-gray-400">Explore our catalog to find your next learning journey!</p>
                {/* You might add a link to browse courses here */}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses.map(course => (
                  // Assuming CourseCard also handles dark mode internally or receives props
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};