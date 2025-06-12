"use client";

import { ThemeProvider } from "../context/ThemeContext";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <main className="ml-20 min-h-screen bg-gray-100 p-6 border-l-4 border-blue-500">
        {children}
      </main>
    </ThemeProvider>
  );
}
