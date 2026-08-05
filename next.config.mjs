/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons", "react-icons/hi2", "react-icons/fa"],
  },
  reactStrictMode: true,
};

export default nextConfig;
