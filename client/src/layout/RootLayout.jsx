import { Navbar } from "@/components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";// Adjust path if needed

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
