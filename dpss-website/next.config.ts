import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow all quality values (removes the dev warning)
    qualities: [25, 50, 70, 75, 80, 85, 90, 95, 100],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.dpsssiddipet.com' }],
        destination: 'https://dpsssiddipet.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
