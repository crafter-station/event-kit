import { createEventIdentity } from "@crafter/event-kit-core";

export const demoIdentity = createEventIdentity({
	name: "Crafter Conf",
	slug: "crafter-conf",
	tagline: "Ship. Build. Create.",
	dates: {
		start: new Date("2026-06-15"),
		end: new Date("2026-06-16"),
	},
	location: {
		venue: "Centro de Convenciones",
		city: "Lima",
		country: "Peru",
		format: "in-person",
	},
	brand: {
		colors: {
			primary: "#4ade80",
			secondary: "#22c55e",
			background: "#0a0a0b",
			surface: "#131414",
			text: "#ffffff",
			textMuted: "#a0a0a0",
		},
		fonts: {
			display: { family: "Space Grotesk", weights: [700, 800], source: "google" },
			body: { family: "Inter", weights: [400, 500], source: "google" },
			mono: { family: "Space Mono", weights: [400], source: "google" },
		},
		logos: { primary: "" },
		badge: {
			template: "card",
			dimensions: { width: 1080, height: 1440 },
			qrCode: { enabled: true, position: "bottom-left" },
		},
	},
	roles: [
		{ id: "hacker", name: "Hacker", displayName: "Hacker", color: "#4ade80" },
		{ id: "speaker", name: "Speaker", displayName: "Speaker", color: "#f59e0b" },
		{ id: "mentor", name: "Mentor", displayName: "Mentor", color: "#8b5cf6" },
		{ id: "sponsor", name: "Sponsor", displayName: "Sponsor", color: "#06b6d4" },
		{ id: "staff", name: "Staff", displayName: "Staff", color: "#ef4444" },
	],
});
