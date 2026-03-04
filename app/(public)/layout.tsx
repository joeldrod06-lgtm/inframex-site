import type { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const viewport = {
  themeColor: "#111827",
};

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 pb-4">
        {children}
      </main>

      <Footer />
    </div>
  );
}