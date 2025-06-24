// src/pages/admin/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // Adjust if your Sidebar path is different

const AdminLayout = () => {
  return (
   <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
  {/* Sidebar */}
  <div className="w-64">
    <Sidebar />
  </div>

  {/* Main Content */}
  <div className="flex-1 p-6 md:p-8 lg:p-10">
    <Outlet />
  </div>
</div>

  );
};

export default AdminLayout;
