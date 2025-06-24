// src/App.jsx
import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { appRouter } from "./routes/AppRoutes";
import { useLoadUserQuery } from "./features/api/authApi";
import { useDispatch } from "react-redux";
import { setUser, setIsAuthenticated } from "./features/authSlice";

export const App = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useLoadUserQuery();

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
      dispatch(setIsAuthenticated(true));
    }
  }, [data, dispatch]);

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center text-lg font-semibold">
        Loading app...
      </div>
    );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      <main className="bg-white dark:bg-[#0A0A0A] min-h-screen transition-colors duration-300">
        <RouterProvider router={appRouter} />
        <Toaster richColors />
      </main>
    </ThemeProvider>
  );
};
