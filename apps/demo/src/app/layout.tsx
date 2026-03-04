import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "@crafter/event-kit",
	description: "Hackathon SDK — badges, onboarding, and social assets for tech events",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				style={{
					margin: 0,
					background: "#0a0a0b",
					color: "#ffffff",
					fontFamily: "Inter, system-ui, sans-serif",
				}}
			>
				{children}
			</body>
		</html>
	);
}
