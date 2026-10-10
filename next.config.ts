import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [75, 85] },
  // Keep generated assistant instructions out of the project source.
  agentRules: false,
};

export default nextConfig;
