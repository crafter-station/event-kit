import { createEventIdentity } from "@event-sdk/core";
import type { EventIdentity } from "@event-sdk/core";

export interface ThemeConfig {
	id: string;
	label: string;
	dotColor: string;
	identity: EventIdentity;
}

const TEAM = [
	{
		name: "Railly Hugo",
		photo: "https://api.dicebear.com/9.x/notionists/svg?seed=Railly&backgroundColor=transparent",
		role: 0,
	},
	{
		name: "Anthony Cueva",
		photo: "https://api.dicebear.com/9.x/notionists/svg?seed=Anthony&backgroundColor=transparent",
		role: 1,
	},
	{
		name: "Cris Correa",
		photo: "https://api.dicebear.com/9.x/notionists/svg?seed=Cris&backgroundColor=transparent",
		role: 2,
	},
	{
		name: "Shiara Arauzo",
		photo: "https://api.dicebear.com/9.x/notionists/svg?seed=Shiara&backgroundColor=transparent",
		role: 3,
	},
];

export { TEAM };

const crafterStation = createEventIdentity({
	name: "Crafter Station",
	slug: "crafter-station",
	tagline: "Build. Ship. Create.",
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
			primary: "#FFD700",
			secondary: "#FFA500",
			background: "#000000",
			surface: "#111111",
			text: "#ffffff",
			textMuted: "#888888",
		},
		fonts: {
			display: { family: "JetBrains Mono", weights: [700, 800], source: "google" },
			body: { family: "JetBrains Mono", weights: [400, 500], source: "google" },
			mono: { family: "JetBrains Mono", weights: [400], source: "google" },
		},
		logos: { primary: "" },
		badge: {
			template: "card",
			dimensions: { width: 1080, height: 1440 },
			qrCode: { enabled: true, position: "bottom-left" },
		},
	},
	roles: [
		{ id: "maker", name: "Maker", displayName: "Maker", color: "#FFD700" },
		{ id: "builder", name: "Builder", displayName: "Builder", color: "#FFA500" },
		{ id: "designer", name: "Designer", displayName: "Designer", color: "#FF6B00" },
		{ id: "shipper", name: "Shipper", displayName: "Shipper", color: "#FFAA00" },
	],
});

const sheShips = createEventIdentity({
	name: "She Ships",
	slug: "she-ships",
	tagline: "Women who build and ship.",
	dates: {
		start: new Date("2026-08-01"),
		end: new Date("2026-08-02"),
	},
	location: {
		venue: "Innovation Hub",
		city: "Lima",
		country: "Peru",
		format: "in-person",
	},
	brand: {
		colors: {
			primary: "#E9A1C9",
			secondary: "#7FE179",
			background: "#131414",
			surface: "#1a1b1b",
			text: "#ffffff",
			textMuted: "#999999",
		},
		fonts: {
			display: { family: "Space Grotesk", weights: [700, 800], source: "google" },
			body: { family: "Space Mono", weights: [400, 700], source: "google" },
			mono: { family: "Space Mono", weights: [400], source: "google" },
		},
		logos: { primary: "" },
		badge: {
			template: "card",
			dimensions: { width: 1080, height: 1440 },
			qrCode: { enabled: true, position: "bottom-right" },
		},
	},
	roles: [
		{ id: "hacker", name: "Hacker", displayName: "Hacker", color: "#E9A1C9" },
		{ id: "speaker", name: "Speaker", displayName: "Speaker", color: "#7FE179" },
		{ id: "mentor", name: "Mentor", displayName: "Mentor", color: "#C084FC" },
	],
});

const iaHackathonPeru = createEventIdentity({
	name: "IA Hackathon Peru",
	slug: "ia-hackathon-peru",
	tagline: "El hackathon de IA mas grande del Peru.",
	dates: {
		start: new Date("2026-10-15"),
		end: new Date("2026-10-16"),
	},
	location: {
		venue: "UTEC",
		city: "Lima",
		country: "Peru",
		format: "hybrid",
	},
	brand: {
		colors: {
			primary: "#B91F2E",
			secondary: "#00FF41",
			background: "#1A1A1A",
			surface: "#222222",
			text: "#ffffff",
			textMuted: "#aaaaaa",
		},
		fonts: {
			display: { family: "Geist Sans", weights: [700, 800], source: "google" },
			body: { family: "Geist Mono", weights: [400, 500], source: "google" },
			mono: { family: "Geist Mono", weights: [400], source: "google" },
		},
		logos: { primary: "" },
		badge: {
			template: "card",
			dimensions: { width: 1080, height: 1440 },
			qrCode: { enabled: true, position: "bottom-left" },
		},
	},
	roles: [
		{ id: "hacker", name: "Hacker", displayName: "Hacker", color: "#00FF41" },
		{ id: "juez", name: "Juez", displayName: "Juez", color: "#B91F2E" },
		{ id: "mentor", name: "Mentor", displayName: "Mentor", color: "#FFD700" },
		{ id: "sponsor", name: "Sponsor", displayName: "Sponsor", color: "#06b6d4" },
	],
});

export const THEMES: ThemeConfig[] = [
	{ id: "crafter", label: "Crafter Station", dotColor: "#FFD700", identity: crafterStation },
	{ id: "sheships", label: "She Ships", dotColor: "#E9A1C9", identity: sheShips },
	{ id: "iahackathon", label: "IA Hackathon", dotColor: "#B91F2E", identity: iaHackathonPeru },
];
