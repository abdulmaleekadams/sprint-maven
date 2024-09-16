/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  // distDir: "dist",
  images: {
    remotePatterns: [
      {
        hostname: "img.clerk.com",
        protocol: "https",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
