import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    root: '/workspaces/adarshalexbalmuchu.github.io',
  },
};

export default nextConfig;
