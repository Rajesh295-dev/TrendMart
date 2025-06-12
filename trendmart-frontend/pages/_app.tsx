// pages/_app.tsx
import type { AppProps } from "next/app";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { useEffect } from "react";
import "../styles/globals.css";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme; // Apply 'light' or 'dark' to body
  }, [theme]);

  return <>{children}</>;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <Component {...pageProps} />
      </ThemeWrapper>
    </ThemeProvider>
  );
}
