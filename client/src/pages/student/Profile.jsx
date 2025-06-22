import { useUpdateUserMutation } from '@/features/api/authApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileEditModal from './ProfileEditModal';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';


// --- Main Profile Component ---
export const Profile = () => {
  const { user } = useSelector(store => store.auth); // Get user from Redux store

  const [updateUser, {
    isLoading: isUpdating,
    error: updateError,
    isSuccess: updateSuccess
  }] = useUpdateUserMutation();
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (updateSuccess) {
      setShowEditModal(false);
      toast.success("Profile updated successfully!");
    }

    if (updateError) {
      toast.error(updateError.data?.message || "Update failed");
      console.error("Update error:", updateError);
    }
  }, [updateSuccess, updateError]);



  // Handle saving profile changes from the modal
  const handleSaveProfile = async (updatedData) => {
    try {
      await updateUser({
        name: updatedData.name,
        email: updatedData.email,
        bio: updatedData.bio,
        location: updatedData.location,
      }).unwrap(); // .unwrap() is typically used with RTK Query to get the actual data or throw the error
    } catch (err) {
      // Error handling is also done in the useEffect, but this catch ensures `unwrap()` errors are caught immediately
      toast.error(err.data?.message || "Failed to update profile");
      console.error("Profile update error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 sm:p-8">
      <div className="max-w-4xl mt-16 mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 md:p-10">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8 mb-10">
          <div className="relative w-32 h-32 flex-shrink-0"> {/* Added flex-shrink-0 */}
            <img
              className="w-full h-full rounded-full object-cover border-4 border-blue-500 dark:border-blue-400 shadow-lg"
              src={user?.photoUrl || 'https://placehold.co/128x128/E2E8F0/1A202C?text=Profile'}
              alt={`${user?.name}'s profile`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/128x128/E2E8F0/1A202C?text=Error";
              }}
            />
            {/* Online status indicator */}
            <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full ring-2 ring-white dark:ring-gray-800 bg-green-500"></span>
          </div>
          <div className="text-center sm:text-left flex-grow"> {/* Added flex-grow */}
            <h1 className="text-4xl font-extrabold mb-2 break-words">{user?.name}</h1> {/* Added break-words */}
            <p className="text-lg mb-2 text-gray-700 dark:text-gray-300 break-words">{user?.email}</p> {/* Added break-words */}
            {user?.location && (
              <p className="text-sm flex items-center justify-center sm:justify-start text-gray-600 dark:text-gray-400">
                {/* Location Icon (SVG) */}
                <svg className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {user?.location}
              </p>
            )}
          </div>
        </div>

        {/* About Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">About Me</h2>
          <p className="leading-relaxed text-gray-800 dark:text-gray-200">{user?.bio || "No bio available."}</p>
        </section>

        {/* Courses Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">Enrolled Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"> {/* Increased gap for better spacing */}
            {user?.enrolledCourses?.length > 0 ? (
              user?.enrolledCourses.map((course) => (
                <CourseCard key={course._id || course.id} course={course} />
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No courses enrolled yet.</p>
            )}
          </div>
          <div className="text-center">
            <Link to="/my-learning">
              <button className="bg-blue-600 text-white cursor-pointer py-3 px-8 rounded-lg hover:bg-blue-700 text-lg font-medium shadow-md transition-colors duration-200">
                View All My Courses
              </button>
            </Link>
          </div>
        </section>

        {/* Actions Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">Settings & Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center cursor-pointer justify-center bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white py-3 px-4 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-600 shadow-sm transition-colors duration-200 font-medium"
            >
              {/* Edit Profile Icon (SVG) */}
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.06 9.06L9 14.12l-1.06-1.06 5.06-5.06a.75.75 0 011.06 0zm-5.06 5.88L8.44 14.5a.75.75 0 011.06 1.06l-.68.68-1.06-1.06zM17.81 7.22a.75.75 0 010 1.06l-1.87 1.87-1.06-1.06 1.87-1.87a.75.75 0 011.06 0zM5 19.5h14a.5.5 0 000-1H5a.5.5 0 000 1z" />
              </svg>
              Edit Profile
            </button>
            <button className="flex items-center cursor-pointer justify-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 shadow-sm transition-colors duration-200 font-medium">
              {/* Account Settings Icon (SVG) */}
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 4.07a.75.75 0 011.02.24l2.5 5a.75.75 0 01-1.31.81L12 6.07l-2.7 4.05a.75.75 0 01-1.31-.81l2.5-5a.75.75 0 01.24-1.02zM10 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
              </svg>
              Account Settings
            </button>
          </div>
        </section>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <ProfileEditModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveProfile}
          isSaving={isUpdating}
        />
      )}
    </div>
  );
};

export default Profile;
