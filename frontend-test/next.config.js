/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enables static site export
    images: {
      unoptimized: true, // Fix image issues in static exports
    },
    basePath: "/frontend-test", // Change this to match your GitHub repo name
    assetPrefix: "/frontend-test/", // Ensure assets load correctly on GitHub Pages
  };
  
  module.exports = nextConfig;
  