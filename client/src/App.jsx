import React from 'react'
import {  RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { appRouter } from './routes/AppRoutes'


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
