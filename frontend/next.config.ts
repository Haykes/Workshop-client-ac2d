import type { NextConfig } from "next";
// PWA can be wired later; base config here
const nextConfig: NextConfig = {
	// output: "standalone",
	reactStrictMode: true,
	// outputFileTracingRoot: undefined,
	experimental: {
		optimizePackageImports: ["@chakra-ui/react", "@tanstack/react-query"],
	},
};

export default nextConfig;
