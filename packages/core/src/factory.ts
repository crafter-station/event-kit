import type { EventIdentity } from "./types";

const DEFAULT_BRAND: EventIdentity["brand"] = {
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
	logos: {
		primary: "",
	},
	badge: {
		template: "card",
		dimensions: { width: 1080, height: 1440 },
		qrCode: { enabled: true, position: "bottom-left" },
		numberFormat: "###",
	},
};

const DEFAULT_ROLES: EventIdentity["roles"] = [
	{ id: "attendee", name: "Attendee", displayName: "Attendee" },
	{ id: "speaker", name: "Speaker", displayName: "Speaker" },
	{ id: "sponsor", name: "Sponsor", displayName: "Sponsor" },
	{ id: "mentor", name: "Mentor", displayName: "Mentor" },
	{ id: "judge", name: "Judge", displayName: "Judge" },
	{ id: "staff", name: "Staff", displayName: "Staff" },
];

export function createEventIdentity(
	config: Partial<EventIdentity> & Pick<EventIdentity, "name" | "slug">,
): EventIdentity {
	return {
		id: config.id ?? config.slug,
		name: config.name,
		slug: config.slug,
		tagline: config.tagline,
		dates: config.dates,
		location: config.location,
		brand: config.brand
			? {
					...DEFAULT_BRAND,
					...config.brand,
					colors: { ...DEFAULT_BRAND.colors, ...config.brand.colors },
					fonts: { ...DEFAULT_BRAND.fonts, ...config.brand.fonts },
					logos: { ...DEFAULT_BRAND.logos, ...config.brand.logos },
					badge: { ...DEFAULT_BRAND.badge, ...config.brand.badge },
				}
			: DEFAULT_BRAND,
		roles: config.roles ?? DEFAULT_ROLES,
		watermark: config.watermark ?? {
			enabled: true,
			text: "Powered by Crafter Station",
			url: "https://crafterstation.com",
		},
	};
}
