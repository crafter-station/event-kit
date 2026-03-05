import type { ThemeDefinition } from "./types";

export const retroTheme: ThemeDefinition = {
	id: "retro",
	name: "Retro",
	tokens: {
		dark: {
			"--background": "#0a0a0a",
			"--foreground": "#ffffff",
			"--muted": "#666666",
			"--accent": "#00ff41",
			"--accent-foreground": "#0a0a0a",
			"--accent-secondary": "#B91F2E",
			"--surface": "#111111",
			"--border": "#222222",
		},
		light: {
			"--background": "#f0f0f0",
			"--foreground": "#0a0a0a",
			"--muted": "#666666",
			"--accent": "#007a1f",
			"--accent-foreground": "#f0f0f0",
			"--accent-secondary": "#B91F2E",
			"--surface": "#e0e0e0",
			"--border": "#cccccc",
		},
	},
	fontDisplayVar: "var(--font-geist-pixel-square)",
	iconWeight: "bold",
	borderRadius: "0",
	effects: { scanlines: true },
};
