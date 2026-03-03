import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}