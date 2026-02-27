import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ondrngtbhnlktipxzhqp.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // solo si usas pruebas
      },
    ],
  },
};

export default nextConfig;