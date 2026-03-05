import type { ThemeDefinition } from "./types";

export const brutalTheme: ThemeDefinition = {
	id: "brutal",
	name: "Brutal",
	tokens: {
		dark: {
			"--background": "#131414",
			"--foreground": "#f2f2ef",
			"--muted": "#6b7280",
			"--accent": "#e9a1c9",
			"--accent-foreground": "#131414",
			"--accent-secondary": "#7fe179",
			"--surface": "#1e1f1f",
			"--border": "#f2f2ef",
		},
		light: {
			"--background": "#f2f2ef",
			"--foreground": "#131414",
			"--muted": "#6b7280",
			"--accent": "#e9a1c9",
			"--accent-foreground": "#131414",
			"--accent-secondary": "#7fe179",
			"--surface": "#e8e8e5",
			"--border": "#131414",
		},
	},
	fontDisplayVar: "var(--font-display-brutal)",
	iconWeight: "fill",
	borderRadius: "0",
	effects: { gridOverlay: true },
};
