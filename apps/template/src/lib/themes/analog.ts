import type { ThemeDefinition } from "./types";

export const analogTheme: ThemeDefinition = {
	id: "analog",
	name: "Analog",
	tokens: {
		dark: {
			"--background": "#0c0b09",
			"--foreground": "#f5f0e8",
			"--muted": "#7a7060",
			"--accent": "#d4a574",
			"--accent-foreground": "#0c0b09",
			"--accent-secondary": "#c8205b",
			"--surface": "#141210",
			"--border": "#2a2520",
		},
		light: {
			"--background": "#f5f0e8",
			"--foreground": "#1a1816",
			"--muted": "#8a8070",
			"--accent": "#8b5e3c",
			"--accent-foreground": "#f5f0e8",
			"--accent-secondary": "#c8205b",
			"--surface": "#ebe5da",
			"--border": "#d4cdc2",
		},
	},
	fontDisplayVar: "var(--font-display-analog)",
	iconWeight: "regular",
	borderRadius: "0.5rem",
	effects: { grain: true },
};
