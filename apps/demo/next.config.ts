import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: [
		"@event-sdk/core",
		"@event-sdk/badge-3d",
		"@event-sdk/react",
	],
};

export default nextConfig;
