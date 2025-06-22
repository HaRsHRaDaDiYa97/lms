import React, { useState, useEffect } from "react";
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from "@/features/api/courseApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export const EditCourse = () => {
    const { courseId } = useParams();
    const [editCourse, { isLoading }] = useEditCourseMutation();
    const [publishCourse, { isLoading: isPublishing }] = usePublishCourseMutation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [courseLevel, setCourseLevel] = useState("");
    const [price, setPrice] = useState("");
    const [isPublished, setIsPublished] = useState(false);
    const [courseThumbnailPreview, setCourseThumbnailPreview] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const navigate = useNavigate();

    const { data: courseByIdData, isLoading: courseByIdIsLoading, refetch } = useGetCourseByIdQuery(courseId);

    const course = courseByIdData?.course;

    useEffect(() => {
        if (course) {
            setTitle(course.courseTitle || "");
            setDescription(course.courseDescription || "");
            setCategory(course.category || "");
            setCourseLevel(course.courseLevel || "");
            setPrice(course.coursePrice || "");
            setIsPublished(course.isPublished || false);

            if (course.courseThumbnail) {
                setCourseThumbnailPreview(course.courseThumbnail);
            }
        }
    }, [course]);

    useEffect(() => {
        refetch(); // manually refetch on mount
    }, [courseId, refetch]);

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCourseThumbnailPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setThumbnailFile(file);
        } else {
            setCourseThumbnailPreview(null);
            setThumbnailFile(null);
        }
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append("courseTitle", title);
            formData.append("courseDescription", description);
            formData.append("category", category);
            formData.append("courseLevel", courseLevel);
            formData.append("coursePrice", price);

            if (thumbnailFile) {
                formData.append("courseThumbnail", thumbnailFile);
            }

            const res = await editCourse({ courseId, formData }).unwrap();
            toast.success(res.message || "Course updated successfully");
        } catch (err) {
            console.error("Edit error:", err);
            toast.error(err?.data?.message || "Failed to update course");
        }
    };

   const handlePublishToggle = async (publishState) => {
    try {
        // 🛑 Prevent publishing if no lectures
        if (publishState === "true" && (!course?.lectures || course.lectures.length === 0)) {
            toast.error("Please add at least one lecture before publishing.");
            navigate(`/admin/course/${courseId}/lecture`);
            return;
        }

        // 🛑 Prevent publishing if no lecture has a video
        const hasLectureWithVideo = course.lectures?.some((lecture) => !!lecture.videoUrl);
        if (publishState === "true" && !hasLectureWithVideo) {
            toast.error("Please upload at least one lecture video before publishing.");
            navigate(`/admin/course/${courseId}/lecture`);
            return;
        }

        // ✅ Proceed to publish/unpublish
        const res = await publishCourse({ courseId, publish: publishState }).unwrap();
        setIsPublished(publishState === "true");
        toast.success(res.message || `Course ${publishState === "true" ? "published" : "unpublished"} successfully`);
    } catch (err) {
        console.error("Publish toggle error:", err);
        toast.error(err?.data?.message || "Failed to change publish status");
    }
};



    return (
        <div className="min-h-screen mt-5 dark:bg-gray-900 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8">
                <div className="flex justify-between items-center mb-8 pb-4 border-b dark:border-gray-700">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Add detail information regarding course
                    </h1>
                    <button
                        onClick={() => navigate(`/admin/course/${courseId}/lecture`)}
                        className="text-indigo-600 cursor-pointer hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 font-medium"
                    >
                        Go to lectures page
                    </button>
                </div>

                <div className="flex justify-end items-center mb-8 gap-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mr-auto">
                        Make changes to your course here. Click save when you're done.
                    </p>

                    <button
                        onClick={() => handlePublishToggle(isPublished ? "false" : "true")}
                        disabled={isPublishing}
                        className={`px-6 py-2 cursor-pointer text-sm font-medium rounded-md text-white ${isPublished ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"}`}
                    >
                        {isPublishing ? "Processing..." : isPublished ? "Unpublish" : "Publish"}
                    </button>

                    <button
                        onClick={() => toast("Removing course...")}
                        className="px-6 py-2 cursor-pointer text-sm font-medium rounded-md bg-red-600 text-white dark:text-gray-200 border dark:border-gray-600"
                    >
                        Remove Course
                    </button>
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4 border-gray-200 dark:border-gray-700">
                        Basic Course Information
                    </h2>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                            placeholder="e.g., The Complete Web Development Bootcamp"
                        />
                    </div>



                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows="6"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 resize-y"
                            placeholder="Write a detailed description of your course..."
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Category
                            </label>
                            <input
                                type="text"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                                placeholder="e.g., Web Development"
                            />
                        </div>

                        <div>
                            <label htmlFor="courseLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Course Level
                            </label>
                            <select
                                id="courseLevel"
                                value={courseLevel}
                                onChange={(e) => setCourseLevel(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                            >
                                <option>Beginner</option>
                                <option>Medium</option>
                                <option>Advance</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Price (INR)
                            </label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                                placeholder="e.g., 499"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="courseThumbnail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Course Thumbnail
                        </label>
                        <input
                            type="file"
                            id="courseThumbnail"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                            className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                        {courseThumbnailPreview && (
                            <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                                <img
                                    src={courseThumbnailPreview}
                                    alt="Course Thumbnail Preview"
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-10 gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className={`px-8 py-3 text-base cursor-pointer font-medium rounded-md text-white ${isLoading ? "bg-black" : "bg-black"
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 `}
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                        onClick={() => navigate(`/admin/course`)}
                        className="px-8 py-3 cursor-pointer border-[1px] border-black text-base font-medium rounded-md shadow-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};
