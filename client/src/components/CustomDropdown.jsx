import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { progressApi } from "@/features/api/progressApi";
import { userLoggedOut } from "@/features/authSlice";
import { persistor } from "@/app/store"; // ✅ important

export const CustomDropdown = ({ user, logoutUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap(); // logout API call
      dispatch(userLoggedOut());   // clear Redux user state

      dispatch(authApi.util.resetApiState());
      dispatch(courseApi.util.resetApiState());
      dispatch(progressApi.util.resetApiState());

      await persistor.purge();     // ✅ fully clear persisted redux-persist store

      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
    setIsOpen(false);
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-1 rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 shadow-md"
      >
        <img
          src={user?.photoUrl || "https://placehold.co/40x40?text=?"}
          alt="User"
          className="h-10 w-10 rounded-full object-cover"
        />
      </button>

      <div
        className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transition-all duration-300 origin-top-right
        ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
      >
        <div className="py-1">
          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b">
            <p className="font-semibold">{user?.name || "User"}</p>
          </div>
          <Link to="/my-learning" onClick={() => setIsOpen(false)}>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">My Learning</button>
          </Link>
          <Link to="/profile" onClick={() => setIsOpen(false)}>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</button>
          </Link>
          {user?.role === "instructor" && (
            <Link to="/instructor/course" onClick={() => setIsOpen(false)}>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</button>
            </Link>
          )}
          <div className="border-t my-1" />
          <button
            onClick={logoutHandler}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
