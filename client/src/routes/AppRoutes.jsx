import RootLayout from "@/layout/RootLayout";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("../pages/student/homepage/Home"));
const Login = lazy(() => import("../pages/Login"));
const Profile = lazy(() => import("../pages/student/Profile"));
const MyLearning = lazy(() => import("../pages/student/MyLearning")); // ✅
const AppRoutes = createBrowserRouter([
  {
    path: "/", // main route
    element: <RootLayout />, // this wraps children
    children: [
      { index: true, element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "my-learning", element: <MyLearning /> }, // ✅ Fixed!
    ],
  },
  {
    path: "/login", // separate route, not inside layout
    element: <Login />,
  },
]);


export default AppRoutes;
