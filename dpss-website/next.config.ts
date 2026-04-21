import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow all quality values (removes the dev warning)
    qualities: [25, 50, 70, 75, 80, 85, 90, 95, 100],
  },
  async redirects() {
    return [
      {
        source: '/principal.php',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/demo.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about.php',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/admission.php',
        destination: '/admissions',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
