"use client";
import { SnackbarProvider } from "notistack";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          {children}
        </SnackbarProvider>
      </body>
    </html>
  );
}
