/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // Allow production validation without interrupting the development preview.
  distDir: process.env.HELLENA_BUILD_DIR || ".next",
};

export default nextConfig;
