import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateLectureMutation, useGetCourseLecturesQuery } from '@/features/api/courseApi';
import { toast } from 'sonner';
import { Lecture } from './Lecture';

export const CreateLecture = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [lectureTitle, setLectureTitle] = useState('');

    const [createLecture, { isLoading: createLectureIsLoading }] = useCreateLectureMutation();

    const {
        data,
        error,
        isLoading: getCourseLectureIsLoading,
        refetch,
    } = useGetCourseLecturesQuery(courseId);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createLecture({ courseId, lectureTitle }).unwrap();
            toast.success('Lecture created successfully!');
            setLectureTitle('');
            refetch(); // 👈 Refresh lectures after creating
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || 'Failed to create lecture');
        }
    };

    return (
        <div className="min-h-screen mt-5 dark:bg-gray-900 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8">
                <div className="flex justify-between items-center mb-8 pb-4 border-b dark:border-gray-700">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Add a new Lecture
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4 border-gray-200 dark:border-gray-700">
                        Basic Lecture Information
                    </h2>

                    <div>
                        <label htmlFor="lectureTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="lectureTitle"
                            value={lectureTitle}
                            onChange={(e) => setLectureTitle(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="e.g., Introduction to JavaScript"
                            required
                        />
                    </div>


                    <div className="mt-10 gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                        <button
                            type="submit"
                            className="px-8 cursor-pointer py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={createLectureIsLoading}
                        >
                            {createLectureIsLoading ? 'Creating...' : 'Create Lecture'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(`/admin/course/${courseId}`)}
                            className="px-8 cursor-pointer py-3 border-[1px] border-black text-base font-medium rounded-md shadow-sm text-black bg-white
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            Back to Course
                        </button>
                    </div>
                </form>

                <div>
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                        {getCourseLectureIsLoading
                            ? 'Loading lectures...'
                            : `Lectures (${data?.lectures?.length || 0})`}
                    </h2>


                    <ul className="space-y-2">
                        {data?.lectures?.length > 0 ? (
                            data.lectures.map((lecture, index) => (
                                <Lecture key={index} lectureId={lecture._id} courseId={courseId} lecture={lecture} index={index} />
                            ))
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">No lectures added yet.</p>
                        )}
                    </ul>
                </div>

            </div>
        </div>
    );
};
