// src/components/ProtectedAdminRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated === null) {
    return <div>Checking access...</div>; // Optional loading
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "instructor") return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedAdminRoute;
