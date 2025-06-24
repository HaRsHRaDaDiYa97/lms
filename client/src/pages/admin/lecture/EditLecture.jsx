import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useGetLectureByIdQuery, useEditLectureMutation, useDeleteLectureMutation } from '@/features/api/courseApi';
import { toast } from 'sonner';

export const EditLecture = () => {
    const { lectureId, courseId } = useParams(); // Get lectureId from URL
    const navigate = useNavigate();

    const { data, isLoading, refetch: getLectureByIdRefetch } = useGetLectureByIdQuery(lectureId);
    const [editLecture, { isLoading: updating }] = useEditLectureMutation();

    const [lectureTitle, setLectureTitle] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [isPreviewFree, setIsPreviewFree] = useState(false);

    useEffect(() => {
        if (data?.lecture) {
            setLectureTitle(data.lecture.lectureTitle || '');
            setIsPreviewFree(data.lecture.isPreviewFree === 'true' || data.lecture.isPreviewFree === true);

            // 👇 Set a "dummy" file name for UI (real File object can't be set)
            if (data.lecture.videoUrl) {
                setVideoFile({ name: extractFileName(data.lecture.videoUrl) });
            }
        }
    }, [data]);

    // Helper function
    const extractFileName = (url) => {
        try {
            const parts = url.split('/');
            return decodeURIComponent(parts[parts.length - 1].split('?')[0]);
        } catch {
            return 'Uploaded video';
        }
    };

    const handleFileChange = (e) => setVideoFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await editLecture({
                lectureId,
                lectureTitle,
                isPreviewFree,
                videoFile, // ✅ Send file
            }).unwrap();

            getLectureByIdRefetch();
            toast.success('Lecture updated successfully');
            navigate(-1);
        } catch (err) {
            toast.error(err?.data?.message || 'Update failed');
        }
    };

    const [deleteLecture, { isLoading: deleting }] = useDeleteLectureMutation();

    const handleRemoveLecture = async () => {

        try {
            await deleteLecture({ lectureId, courseId }).unwrap();
            toast.success("Lecture deleted successfully");
            navigate(-1); // Go back
        } catch (err) {
            toast.error(err?.data?.message || "Delete failed");
        }

    };
    return (
        <div className="min-h-screen dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 w-full max-w-2xl">
                {/* Header */}
                <div className="flex items-center mb-6">
                    <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <FiArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white ml-3">Update Your Lecture</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Danger Zone */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Edit Lecture</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Make changes and click save when done.</p>
                        <button
                            type="button"
                            onClick={handleRemoveLecture}
                            disabled={deleting}
                            className="px-5 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                        >
                            {deleting ? "Deleting..." : "Remove Lecture"}
                        </button>

                    </div>

                    {/* Form Fields */}
                    <div className="mb-6">
                        <label htmlFor="lectureTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="lectureTitle"
                            value={lectureTitle}
                            onChange={(e) => setLectureTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Video File (required)
                        </label>
                        <input
                            type="file"
                            id="videoFile"
                            onChange={handleFileChange}
                            required
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300"
                        />
                        <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                            {videoFile?.name ? `Selected: ${videoFile.name}` : 'No file selected'}
                        </p>

                    </div>

                    <div className="flex items-center mb-8">
                        <label htmlFor="isPreviewFree" className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Is this video FREE?
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isPreviewFree}
                                onChange={(e) => setIsPreviewFree(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={updating}
                        className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
                    >
                        {updating ? 'Updating...' : 'Update Lecture'}
                    </button>
                </form>
            </div>
        </div>
    );
};
