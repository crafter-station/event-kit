import type React from "react";

export interface ThemeStyles {
	card: React.CSSProperties;
	heading: React.CSSProperties;
	label: React.CSSProperties;
	button: React.CSSProperties;
	sectionBg: React.CSSProperties;
	bgPattern: string | null;
	scanlines: boolean;
	cursorBlink: boolean;
}

const crafterStyles: ThemeStyles = {
	card: {
		borderRadius: 16,
		border: "1px solid rgba(255,255,255,0.06)",
		background: "rgba(255,255,255,0.03)",
	},
	heading: {
		fontFamily: "JetBrains Mono, monospace",
		fontWeight: 800,
		letterSpacing: "-0.03em",
	},
	label: {
		fontFamily: "JetBrains Mono, monospace",
		fontSize: 11,
		fontWeight: 600,
		letterSpacing: "0.15em",
		textTransform: "uppercase" as const,
	},
	button: {
		borderRadius: 8,
		border: "1px solid rgba(255,255,255,0.12)",
		background: "rgba(255,255,255,0.06)",
	},
	sectionBg: {},
	bgPattern: null,
	scanlines: false,
	cursorBlink: false,
};

const sheShipsStyles: ThemeStyles = {
	card: {
		borderRadius: 0,
		border: "3px solid #131414",
		boxShadow: "6px 6px 0px #131414",
		background: "rgba(255,255,255,0.04)",
	},
	heading: {
		fontFamily: "Space Grotesk, sans-serif",
		fontWeight: 800,
		letterSpacing: "-0.02em",
		textTransform: "uppercase" as const,
	},
	label: {
		fontFamily: "Space Mono, monospace",
		fontSize: 11,
		fontWeight: 400,
		letterSpacing: "0.1em",
		textTransform: "uppercase" as const,
	},
	button: {
		borderRadius: 0,
		border: "3px solid #131414",
		boxShadow: "4px 4px 0px #131414",
		background: "rgba(255,255,255,0.06)",
		fontWeight: 700,
		textTransform: "uppercase" as const,
		letterSpacing: "0.05em",
	},
	sectionBg: {},
	bgPattern:
		"linear-gradient(to right, rgba(233,161,201,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(233,161,201,0.04) 1px, transparent 1px)",
	scanlines: false,
	cursorBlink: false,
};

const iaHackathonStyles: ThemeStyles = {
	card: {
		borderRadius: 4,
		border: "1px solid #B91F2E",
		background: "rgba(185,31,46,0.05)",
	},
	heading: {
		fontFamily: "Geist Sans, sans-serif",
		fontWeight: 800,
		letterSpacing: "0.02em",
		textTransform: "uppercase" as const,
	},
	label: {
		fontFamily: "Geist Mono, monospace",
		fontSize: 11,
		fontWeight: 600,
		letterSpacing: "0.2em",
		textTransform: "uppercase" as const,
	},
	button: {
		borderRadius: 4,
		border: "2px solid #B91F2E",
		background: "rgba(185,31,46,0.1)",
		boxShadow: "3px 0 0 0 #B91F2E, -3px 0 0 0 #B91F2E, 0 3px 0 0 #B91F2E, 0 -3px 0 0 #B91F2E",
	},
	sectionBg: {},
	bgPattern: "radial-gradient(circle at 1px 1px, rgba(0,255,65,0.06) 1px, transparent 1px)",
	scanlines: true,
	cursorBlink: true,
};

const THEME_STYLES: Record<string, ThemeStyles> = {
	crafter: crafterStyles,
	sheships: sheShipsStyles,
	iahackathon: iaHackathonStyles,
};

export function getThemeStyles(themeId: string): ThemeStyles {
	return THEME_STYLES[themeId] ?? crafterStyles;
}
