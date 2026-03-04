import { z } from "zod";

const fontSpecSchema = z.object({
	family: z.string(),
	weights: z.array(z.number()),
	source: z.enum(["google", "custom"]),
	url: z.string().optional(),
});

const badgeConfigSchema = z.object({
	template: z.enum(["card", "lanyard", "circular", "custom"]),
	baseTexture: z.string().optional(),
	dimensions: z.object({ width: z.number(), height: z.number() }),
	cornerRadius: z.number().optional(),
	qrCode: z
		.object({
			enabled: z.boolean(),
			position: z.enum(["bottom-left", "bottom-right", "top-right"]),
		})
		.optional(),
	numberFormat: z.string().optional(),
});

const posterConfigSchema = z.object({
	dimensions: z.object({ width: z.number(), height: z.number() }),
	templates: z.array(z.enum(["half-face", "eyes", "smile", "full"])),
	watermarkImages: z.array(z.string()).optional(),
	frameImage: z.string().optional(),
});

const effectsConfigSchema = z.object({
	grain: z.object({ enabled: z.boolean(), opacity: z.number() }).optional(),
	hologram: z.boolean().optional(),
});

export const eventBrandSchema = z.object({
	colors: z.object({
		primary: z.string(),
		secondary: z.string(),
		background: z.string(),
		surface: z.string(),
		text: z.string(),
		textMuted: z.string(),
	}),
	fonts: z.object({
		display: fontSpecSchema,
		body: fontSpecSchema,
		mono: fontSpecSchema.optional(),
	}),
	logos: z.object({
		primary: z.string(),
		icon: z.string().optional(),
		wordmark: z.string().optional(),
		watermark: z.string().optional(),
	}),
	badge: badgeConfigSchema,
	poster: posterConfigSchema.optional(),
	effects: effectsConfigSchema.optional(),
});

const eventRoleSchema = z.object({
	id: z.string(),
	name: z.string(),
	displayName: z.string(),
	color: z.string().optional(),
	badgeTemplate: z.string().optional(),
	onboardingFields: z.array(z.string()).optional(),
});

export const eventIdentitySchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	tagline: z.string().optional(),
	dates: z.object({ start: z.date(), end: z.date() }).optional(),
	location: z
		.object({
			venue: z.string().optional(),
			city: z.string().optional(),
			country: z.string().optional(),
			format: z.enum(["virtual", "in-person", "hybrid"]),
		})
		.optional(),
	brand: eventBrandSchema,
	roles: z.array(eventRoleSchema),
	watermark: z
		.object({
			enabled: z.boolean(),
			text: z.string(),
			url: z.string(),
		})
		.optional(),
});

export const attendeeSchema = z.object({
	id: z.string(),
	name: z.string(),
	role: z.string(),
	organization: z.string().optional(),
	photoUrl: z.string().optional(),
	email: z.string().email().optional(),
	badgeNumber: z.number().optional(),
	profileUrl: z.string().optional(),
	metadata: z.record(z.unknown()).optional(),
});
