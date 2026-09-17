import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // standalone is for the Docker image; Vercel's builder doesn't support it
  output: process.env.VERCEL ? undefined : "standalone",
};

export default nextConfig;
