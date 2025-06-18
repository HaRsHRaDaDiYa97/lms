import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { Login } from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import { Courses } from './pages/student/Courses'
import { Profile } from './pages/student/Profile'
import { MyLearning } from './pages/student/MyLearning'
import NotFoundPage from './components/NotFoundPage'
import RootLayout from './layout/RootLayout'
const appRouter = createBrowserRouter([
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
    ]
  },
  // Add this catch-all route for any path that doesn't match the above
  {
    path: "*",
    element: <NotFoundPage />
  }
]);

export const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      <main className="bg-white dark:bg-[#0A0A0A] min-h-screen transition-colors duration-300">
        <RouterProvider router={appRouter} />
        <Toaster richColors />
      </main>
    </ThemeProvider>
  )
}
