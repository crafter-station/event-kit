import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "@event-sdk",
	description: "Hackathon SDK — badges, onboarding, and social assets for tech events",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Space+Grotesk:wght@700;800&family=Space+Mono:wght@400;700&family=Geist+Mono:wght@400;500&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body
				style={{
					margin: 0,
					background: "#000",
					color: "#ffffff",
					fontFamily: "JetBrains Mono, monospace",
				}}
			>
				{children}
			</body>
		</html>
	);
}
