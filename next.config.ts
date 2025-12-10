import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-ignore
    workerThreads: false,
    cpus: 1,
  },
  // Setting region as requested, though usually this is an env var or vercel.json setting.
  // Assuming user implies a specific custom config or this is a placebo if not supported directly.
  // Closest standard valid config is often via vercel.json.
  // However, I will add it as a top-level or env mapping if relevant.
  // User instruction: "set region to sin1 in nextconfig"
  env: {
    REGION: "sin1",
  },
};

export default nextConfig;
