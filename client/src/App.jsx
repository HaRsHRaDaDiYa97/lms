// src/App.jsx
import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { appRouter } from "./routes/AppRoutes";
import { useLoadUserQuery } from "./features/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setIsAuthenticated } from "./features/authSlice";

export const App = () => {
  const dispatch = useDispatch();

  // ✅ Read token from Redux
  const token = useSelector((state) => state.auth.token);

  // ✅ Call useLoadUserQuery only when token exists
  const {
    data,
    isLoading: userLoading,
    error,
  } = useLoadUserQuery(undefined, {
    skip: !token, // ✅ prevents 401 if user not logged in
  });

  // ✅ Dispatch user to Redux if loaded
  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
      dispatch(setIsAuthenticated(true));
    }
  }, [data, dispatch]);

  // ✅ Optional: show app loading only if checking user
  if (token && userLoading)
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
