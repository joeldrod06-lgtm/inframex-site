import type { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

<meta name="theme-color" content="#111827" />

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-dvh flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}