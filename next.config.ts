import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mars.nasa.gov',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mars.jpl.nasa.gov',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images-assets.nasa.gov',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;