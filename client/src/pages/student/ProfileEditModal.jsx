import { useUpdateUserMutation } from "@/features/api/authApi";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const ProfileEditModal = ({ user, onClose }) => {
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    location: user?.location || ""
  });
  const [profilePicFile, setProfilePicFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const data = new FormData();
  data.append("name", formData.name);
  data.append("email", formData.email);
  data.append("bio", formData.bio);
  data.append("location", formData.location);
  
  // Must match the multer .single() parameter
  if (profilePicFile) data.append("profilePhoto", profilePicFile);

  try {
    const result = await updateUser(data).unwrap();
    toast.success("Profile updated successfully");
    onClose();
  } catch (err) {
    console.error('Error:', err);
    toast.error(err.data?.message || "Failed to update profile");
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md">
        {/* Modal header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-500 mb-4">
            {error.data?.message || "Update failed"}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Bio Field */}
          <div>
            <label className="block mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>

          {/* Location Field */}
          <div>
            <label className="block mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block mb-1">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicFile(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;