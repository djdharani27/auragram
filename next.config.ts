import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: "export",
  // Set base path for GitHub Pages (repo name)
  basePath: isProd ? "/auragram" : "",
  assetPrefix: isProd ? "/auragram/" : "",
  // Allow images from external domains (Unsplash)
  images: {
    unoptimized: true,
  },
  // Trailing slash for GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
