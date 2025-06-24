// src/routes/appRouter.js or wherever you define it
import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "@/components/NotFoundPage";
import RootLayout from "@/layout/RootLayout";
import { AddCourse } from "@/pages/admin/course/AddCourse";
import { CourseTable } from "@/pages/admin/course/CourseTable";
import Dashboard from "@/pages/admin/Dashboard";
import { Login } from "@/pages/Login";
import { Courses } from "@/pages/student/Courses";
import { MyLearning } from "@/pages/student/MyLearning";
import Profile from "@/pages/student/Profile";
import HeroSection from "../pages/student/HeroSection";
import { EditCourse } from "@/pages/admin/course/EditCourse";
import { CreateLecture } from "@/pages/admin/lecture/CreateLecture";
import { EditLecture } from "@/pages/admin/lecture/EditLecture";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import AdminLayout from "@/pages/admin/AdminLayout";
import  CourseDetail  from "@/pages/student/CourseDetail";
import { ProgressLecture } from "@/pages/student/ProgressLecture";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "my-learning",
        element: <MyLearning />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "/course/:courseId",
        element: <CourseDetail />
      },
      {
        path: "/progress-lecture/:courseId",
        element: <ProgressLecture />
      },


      // ✅ Protected Admin Routes
      {
        path: "instructor",
        element: <ProtectedAdminRoute />, // ✅ Protect the entire admin group
        children: [
          {
            path: "",
            element: <AdminLayout />,
            children: [
              {
                path: "dashboard",
                element: <Dashboard />,
              },
              {
                path: "course",
                element: <CourseTable />,
              },
              {
                path: "course/create-course",
                element: <AddCourse />,
              },
              {
                path: "course/:courseId",
                element: <EditCourse />,
              },
              {
                path: "course/:courseId/lecture",
                element: <CreateLecture />,
              },
              {
                path: "course/:courseId/lecture/:lectureId",
                element: <EditLecture />,
              },
            ],
          },
        ],
      },
    ],
  },

  // Catch all
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
