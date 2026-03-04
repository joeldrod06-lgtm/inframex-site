import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "inframex",
  icons: {
    icon: "/logo.png",
  },
};

export const viewport = {
  themeColor: "#111827",
};

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