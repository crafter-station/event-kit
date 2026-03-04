import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";

const fontDisplay = Playfair_Display({
	subsets: ["latin"],
	weight: ["700", "900"],
	variable: "--font-display",
});

const fontBody = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	variable: "--font-body",
});

const fontMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--font-mono",
});

export { fontDisplay, fontBody, fontMono };
