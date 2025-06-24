// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { FaRegCheckCircle, FaPlayCircle } from 'react-icons/fa';
// import { useGetCourseLecturesQuery } from '@/features/api/courseApi';

// export const ProgressLecture = () => {
//   const { courseId } = useParams();
//   const { data, isLoading, isError } = useGetCourseLecturesQuery(courseId);
//   const lectures = data?.lectures || [];

//   // ✅ State to track selected lecture
//   const [selectedLecture, setSelectedLecture] = useState(null);

//   // Set default lecture on initial load
//   useEffect(() => {
//     if (lectures.length > 0) {
//       setSelectedLecture(lectures[0]);
//     }
//   }, [lectures]);

//   if (isLoading)
//     return <div className="text-center mt-20 text-gray-700 dark:text-white">Loading lectures...</div>;

//   if (isError)
//     return <div className="text-center mt-20 text-red-500">Failed to load lectures.</div>;

//   return (
//     <div className="min-h-screen mt-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-inter p-4 sm:p-8 transition-colors duration-300">

//       {/* Header */}
//       <header className="flex justify-between items-center mb-8 px-4 sm:px-0">
//         <h1 className="text-xl sm:text-2xl font-bold">{data?.courseTitle || "No Title"}</h1>
//         <div className="flex items-center space-x-2">
//           <span className="text-sm sm:text-base">Mark as complete</span>
//           <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-200">
//             <img
//               src="https://placehold.co/40x40/000000/FFFFFF?text=JP"
//               alt="User Avatar"
//               className="absolute inset-0 w-full h-full object-cover"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = "https://placehold.co/40x40/000000/FFFFFF?text=JP";
//               }}
//             />
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex flex-col lg:flex-row gap-8">

//         {/* Video Section */}
//         <section className="flex-1 lg:w-3/5 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
//           <div className="aspect-w-16 aspect-h-9 w-full">
//             {selectedLecture?.videoUrl ? (
//               <video
//                 key={selectedLecture._id} // ensures re-render on change
//                 className="w-full h-full"
//                 src={selectedLecture.videoUrl}
//                 controls
//                 controlsList="nodownload"
//                 preload="metadata"
//               >
//                 Your browser does not support the video tag.
//               </video>
//             ) : (
//               <div className="flex items-center justify-center h-full text-sm text-gray-500 dark:text-gray-400">
//                 No video available
//               </div>
//             )}
//           </div>
//           <div className="p-4">
//             <h2 className="text-lg sm:text-xl font-semibold">
//               {selectedLecture?.lectureTitle || "No Title"}
//             </h2>
//           </div>
//         </section>

//         {/* Lecture List */}
//         <aside className="lg:w-2/5 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-4">
//           <h2 className="text-xl sm:text-2xl font-semibold mb-4">Course Lectures</h2>
//           <ul className="space-y-3">
//             {lectures.map((lecture) => (
//               <li
//                 key={lecture._id}
//                 onClick={() => setSelectedLecture(lecture)} // ✅ Click handler to change video
//                 className={`flex items-center p-3 rounded-md transition-colors duration-200 cursor-pointer
//                   ${selectedLecture?._id === lecture._id
//                     ? 'bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white'
//                     : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
//               >
//                 {lecture.completed ? (
//                   <FaRegCheckCircle className="text-green-500 mr-3 text-xl sm:text-2xl" />
//                 ) : (
//                   <FaPlayCircle className="text-blue-500 mr-3 text-xl sm:text-2xl" />
//                 )}
//                 <span className="flex-1 text-sm sm:text-base">{lecture.lectureTitle}</span>
//               </li>
//             ))}
//           </ul>
//         </aside>
//       </main>
//     </div>
//   );
// };





import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegCheckCircle, FaPlayCircle } from 'react-icons/fa';
import { useGetCourseLecturesQuery } from '@/features/api/courseApi';
import {
    useMarkLectureCompleteMutation,
    useGetUserProgressQuery,
} from '@/features/api/progressApi';

export const ProgressLecture = () => {
    const { courseId } = useParams();
    const { data, isLoading, isError, refetch } = useGetCourseLecturesQuery(courseId);
    const lectures = data?.lectures || [];
    const { data: progressData, refetch: refetchProgress } = useGetUserProgressQuery(courseId);

    const [selectedLecture, setSelectedLecture] = useState(null);
    const videoRef = useRef(null);
    const [markLectureComplete] = useMarkLectureCompleteMutation();

    useEffect(() => {
        if (lectures.length > 0) {
            setSelectedLecture(lectures[0]);
        }
    }, [lectures]);

    useEffect(() => {
        if (videoRef.current) {
            const handleEnded = async () => {
                if (selectedLecture) {
                    await markLectureComplete({ courseId, lectureId: selectedLecture._id });
                    refetchProgress();
                    refetch();
                }
            };
            const videoEl = videoRef.current;
            videoEl.addEventListener('ended', handleEnded);
            return () => videoEl.removeEventListener('ended', handleEnded);
        }
    }, [selectedLecture, courseId, markLectureComplete, refetchProgress, refetch]);

    if (isLoading)
        return <div className="text-center mt-20 text-gray-700 dark:text-white">Loading lectures...</div>;

    if (isError)
        return <div className="text-center mt-20 text-red-500">Failed to load lectures.</div>;

    const isLectureCompleted = (id) => progressData?.progress?.completedLectures?.includes(id);

    return (
        <div className="min-h-screen mt-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-inter p-4 sm:p-8 transition-colors duration-300">
            <header className="flex justify-between items-center mb-8 px-4 sm:px-0">
                <h1 className="text-xl sm:text-2xl font-bold">{data?.courseTitle || "No Title"}</h1>
                <div className="flex items-center space-x-2">
                    {progressData?.progress?.completed && (
                        <span className="text-sm sm:text-base font-semibold text-white bg-green-600 px-4 py-2  rounded-2xl shadow-md">
                            ✅ Course Completed 🎉
                        </span>
                    )}


                </div>
            </header>

            <main className="flex flex-col lg:flex-row gap-8">
                <section className="flex-1 lg:w-3/5 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                    <div className="aspect-w-16 aspect-h-9 w-full">
                        {selectedLecture?.videoUrl ? (
                            <video
                                key={selectedLecture._id}
                                ref={videoRef}
                                className="w-full h-full"
                                src={selectedLecture.videoUrl}
                                controls
                                controlsList="nodownload"
                                preload="metadata"
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div className="flex items-center justify-center h-full text-sm text-gray-500 dark:text-gray-400">
                                No video available
                            </div>
                        )}
                    </div>
                    <div className="p-4">
                        <h2 className="text-lg sm:text-xl font-semibold">
                            {selectedLecture?.lectureTitle || "No Title"}
                        </h2>
                    </div>
                </section>

                <aside className="lg:w-2/5 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-4">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">Course Lectures</h2>
                    <ul className="space-y-3">
                        {lectures.map((lecture) => (
                            <li
                                key={lecture._id}
                                onClick={() => setSelectedLecture(lecture)}
                                className={`flex items-center p-3 rounded-md transition-colors duration-200 cursor-pointer
                  ${selectedLecture?._id === lecture._id
                                        ? 'bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white'
                                        : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                            >
                                {isLectureCompleted(lecture._id) ? (
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
