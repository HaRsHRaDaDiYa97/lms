import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "@/components/NotFoundPage";
import RootLayout from "@/layout/RootLayout";
import { AddCourse } from "@/pages/admin/course/AddCourse";
import { CourseTable } from "@/pages/admin/course/CourseTable";
import Dashboard from "@/pages/admin/Dashboard";
import Sidebar from "@/pages/admin/Sidebar";
import { Login } from "@/pages/Login";
import { Courses } from "@/pages/student/Courses";
import { MyLearning } from "@/pages/student/MyLearning";
import Profile from "@/pages/student/Profile";
import HeroSection from "../pages/student/HeroSection"; // Don't forget this import too
import AdminLayout from "@/pages/admin/AdminLayout ";
import { EditCourse } from "@/pages/admin/course/EditCourse";
import { CreateLecture } from "@/pages/admin/lecture/CreateLecture";
import { EditLecture } from "@/pages/admin/lecture/EditLecture";


export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />, // Add this for all unmatched routes within MainLayout
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        )
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "my-learning",
        element: <MyLearning />
      },
      {
        path: "profile",
        element: <Profile />
      },

      //admin routes start here
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "course",
            element: <CourseTable />
          },
          {
            path: "course/create-course",
            element: <AddCourse />
          },
          {
            path: "/admin/course/:courseId",
            element: <EditCourse />
          },
          {
            path: "/admin/course/:courseId/lecture",
            element: <CreateLecture />
          },
          {
            path: "/admin/course/:courseId/lecture/:lectureId",
            element: <EditLecture />
          },
        ]
      },

    ]
  },
  // Add this catch-all route for any path that doesn't match the above
  {
    path: "*",
    element: <NotFoundPage />
  }
]);
