import React, { useState, useEffect } from 'react';
import { CourseCard } from './Course';



export const Courses = () => {
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to store course data
  const [courses, setCourses] = useState([]);

  // Simulate data fetching with a useEffect and setTimeout
  useEffect(() => {
    const fetchCourses = () => {
      // Dummy course data
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
        {
          id: 3,
          title: 'Mastering Tailwind CSS',
          instructor: 'Emily White',
          description: 'Become proficient in Tailwind CSS to rapidly build beautiful and responsive user interfaces.',
          price: 39.99,
          image: 'https://placehold.co/600x400/FED7AA/9A3412?text=Tailwind',
        },
        {
          id: 4,
          title: 'Full-Stack Development with Node.js',
          instructor: 'Michael Brown',
          description: 'Build robust full-stack applications using Node.js, Express, and MongoDB.',
          price: 79.99,
          image: 'https://placehold.co/600x400/FBCFE8/831843?text=Node.js',
        },
        {
          id: 5,
          title: 'Data Science with Python',
          instructor: 'Sarah Lee',
          description: 'An introduction to data science using Python, including data analysis, visualization, and machine learning.',
          price: 69.99,
          image: 'https://placehold.co/600x400/FBCFE8/831843?text=Python',
        },
        {
          id: 6,
          title: 'UI/UX Design Principles',
          instructor: 'David Green',
          description: 'Learn the core principles of UI/UX design to create intuitive and engaging user experiences.',
          price: 45.00,
          image: 'https://placehold.co/600x400/BFDBFE/1E3A8A?text=UI/UX',
        },
        {
          id: 7,
          title: 'Introduction to Cloud Computing (AWS)',
          instructor: 'Anna King',
          description: 'Get started with cloud computing concepts and essential AWS services for deployment and scalability.',
          price: 75.00,
          image: 'https://placehold.co/600x400/CFFAFE/0E7490?text=AWS',
        },
        {
          id: 8,
          title: 'Mobile App Development (React Native)',
          instructor: 'Chris Blue',
          description: 'Develop cross-platform mobile applications for iOS and Android using React Native.',
          price: 85.00,
          image: 'https://placehold.co/600x400/C7D2FE/3730A3?text=React+Native',
        },
      ];

      // Simulate a network delay
      setTimeout(() => {
        setCourses(dummyCourses);
        setIsLoading(false); // Set loading to false after data is "fetched"
      }, 1500); // 1.5 second delay
    };

    fetchCourses();
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Our Courses
      </h2>
      {isLoading ? (
        // Display skeleton loaders when loading
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Render multiple skeleton cards */}
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCourseCard key={index} />
          ))}
        </div>
      ) : (
        // Display actual course content when not loading
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};


export const SkeletonCourseCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md animate-pulse">
      {/* Image Placeholder */}
      <div className="h-40 w-full bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
      {/* Title Placeholder */}
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      {/* Description Placeholder */}
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
  );
