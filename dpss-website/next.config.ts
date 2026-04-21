import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow all quality values (removes the dev warning)
    qualities: [25, 50, 70, 75, 80, 85, 90, 95, 100],
  },
};

export default nextConfig;
