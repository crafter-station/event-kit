import { event } from "@/lib/event";
import { fontBody, fontMono, fontPixel, fontAnalog, fontBrutal } from "@/lib/fonts";
import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

const ogUrl = `/og?title=${encodeURIComponent(event.name)}&subtitle=${encodeURIComponent(event.tagline ?? "")}`;

export const metadata: Metadata = {
	title: event.name,
	description: event.tagline,
	openGraph: {
		title: event.name,
		description: event.tagline,
		images: [{ url: ogUrl, width: 1200, height: 630, alt: event.name }],
	},
	twitter: {
		card: "summary_large_image",
		title: event.name,
		description: event.tagline,
		images: [ogUrl],
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning className={`${fontBody.variable} ${fontMono.variable} ${fontPixel.variable} ${fontAnalog.variable} ${fontBrutal.variable}`}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
