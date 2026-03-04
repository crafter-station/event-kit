import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: [
		"@crafter/event-kit-core",
		"@crafter/event-kit-badge-3d",
		"@crafter/event-kit-react",
	],
};

export default nextConfig;
