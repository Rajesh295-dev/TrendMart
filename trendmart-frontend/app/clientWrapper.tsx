"use client";

import { useEffect } from "react";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

function ThemeApplier({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme; // light or dark
  }, [theme]);

  return <>{children}</>;
}

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <ThemeApplier>{children}</ThemeApplier>
    </ThemeProvider>
  );
}
