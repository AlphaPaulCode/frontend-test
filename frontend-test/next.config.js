/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Enables static export
    images: {
      unoptimized: true, // Fixes image issues in static export
    },
    basePath: "/frontend-test", // Replace with your GitHub repo name
    assetPrefix: "/frontend-test/", // Ensure assets load correctly
  };
  
  export default nextConfig;  