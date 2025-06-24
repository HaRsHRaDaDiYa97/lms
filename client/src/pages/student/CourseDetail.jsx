import React, { useEffect, useId } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import { useGetCourseByIdQuery } from "@/features/api/courseApi";
import BuyButton from "./BuyButton";
import { useSelector } from "react-redux";

const CourseDetail = () => {
  const { courseId } = useParams();
  const { data, isLoading, error, refetch } = useGetCourseByIdQuery(courseId);
  const course = data?.course;
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user); // 👈 get current user

  const isEnrolled = course?.enrolledStudents?.includes(user?._id);

  useEffect(() => {
    refetch(); // Refetch in case user lands via direct link
  }, [courseId, refetch]);

  if (isLoading)
    return (
      <div className="min-h-screen p-6 flex justify-center items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        Loading course...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen p-6 flex justify-center items-center bg-white dark:bg-gray-900 text-red-500">
        Error loading course: {error.message || "Unknown error"}
      </div>
    );
  if (!course)
    return (
      <div className="min-h-screen p-6 flex justify-center items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        Course not found.
      </div>
    );

  // Assuming the first lecture is the "Introduction" video shown on the right panel
  const introductionLecture = course?.lectures?.[0];

  return (
    <div className="min-h-screen mt-16 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Top Header Section */}
      {/* Keeping this section consistently dark as per the image, regardless of dark/light theme toggle, for a prominent header */}
      <div className="bg-gray-800 text-white py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">
            {course?.courseTitle || "Course Title Not Available"}
          </h1>
          {/* This specific line "Build Scalable, Modern Web Apps with React & Next.js" is from the image, 
              assuming it's a static tagline or part of the course data not explicitly mapped. */}
          <p className="text-lg mb-4">
            Build Scalable, Modern Web Apps with React & Next.js
          </p>
          <div className="text-gray-300 text-sm space-y-1">
            <p>
              Created by{" "}
              <span className="text-blue-400">
                {course?.creator?.[0]?.name || "N/A"}
              </span>
            </p>
            <p>
              Last updated{" "}
              {new Date(course?.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p>
              {course?.enrolledStudents?.length > 0
                ? `Students enrolled: ${course.enrolledStudents.length}`
                : "No students enrolled yet"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section - Description & Course Content List */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {course?.courseDescription}
            </p>
          </div>

          {/* Course Content Section - mimicking the list on the left in the image */}
          <div>
            <h2 className="text-3xl font-bold mb-4 mt-8">Course Content</h2>
            {course?.lectures?.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No lectures available yet.
              </p>
            ) : (
              <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 space-y-2">
                {course?.lectures.map((lecture, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer"
                  >
                    <span className="text-lg font-medium flex items-center gap-2">
                      <FaPlayCircle className="text-black" />
                      {index + 1}. {lecture.lectureTitle || lecture.title}
                    </span>


                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Video Player & Buy Button */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-gray-900 w-full md:max-w-sm md:h-[400px]">
          {introductionLecture?.videoUrl ? (
            <>
              <video
                controls
                className="w-full h-48 rounded-md mb-4 shadow-md object-cover"
                src={introductionLecture.videoUrl}
                poster={course?.courseThumbnail}
              >
                Your browser does not support the video tag.
              </video>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 text-center">
                {introductionLecture.lectureTitle || introductionLecture.title}
              </h3>
            </>
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 mb-4">
              No introduction video available.
            </div>
          )}

          <div className="flex items-baseline mb-4">
            <span className="text-4xl font-bold text-gray-800 mr-2">
              ₹{course?.coursePrice || "N/A"}
            </span>
          </div>

          {user ? (
            isEnrolled ? (
              <button
                className="w-full cursor-pointer mt-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
                onClick={() => navigate(`/progress-lecture/${courseId}`)} // Your lecture page route
              >
                Go to Lectures
              </button>
            ) : (
              <BuyButton
                amount={course?.coursePrice}
                courseId={courseId}
                userId={user._id}
                refetchCourse={refetch} // ✅ add this
              />

            )
          ) : (
            <p className="text-center text-red-500">Please login to buy the course</p>
          )}


        </div>

      </div>
    </div>
  );
};

export default CourseDetail;