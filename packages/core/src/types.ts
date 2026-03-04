export interface EventIdentity {
	id: string;
	name: string;
	slug: string;
	tagline?: string;
	dates?: {
		start: Date;
		end: Date;
	};
	location?: {
		venue?: string;
		city?: string;
		country?: string;
		format: "virtual" | "in-person" | "hybrid";
	};
	brand: EventBrand;
	roles: EventRole[];
	watermark?: {
		enabled: boolean;
		text: string;
		url: string;
	};
}

export interface EventBrand {
	colors: {
		primary: string;
		secondary: string;
		background: string;
		surface: string;
		text: string;
		textMuted: string;
	};
	fonts: {
		display: FontSpec;
		body: FontSpec;
		mono?: FontSpec;
	};
	logos: {
		primary: string;
		icon?: string;
		wordmark?: string;
		watermark?: string;
	};
	badge: BadgeConfig;
	poster?: PosterConfig;
	effects?: EffectsConfig;
}

export interface BadgeConfig {
	template: "card" | "lanyard" | "circular" | "custom";
	baseTexture?: string;
	dimensions: { width: number; height: number };
	cornerRadius?: number;
	qrCode?: {
		enabled: boolean;
		position: "bottom-left" | "bottom-right" | "top-right";
	};
	numberFormat?: string;
}

export interface PosterConfig {
	dimensions: { width: number; height: number };
	templates: ("half-face" | "eyes" | "smile" | "full")[];
	watermarkImages?: string[];
	frameImage?: string;
}

export interface EffectsConfig {
	grain?: { enabled: boolean; opacity: number };
	hologram?: boolean;
}

export interface FontSpec {
	family: string;
	weights: number[];
	source: "google" | "custom";
	url?: string;
}

export interface EventRole {
	id: string;
	name: string;
	displayName: string;
	color?: string;
	badgeTemplate?: string;
	onboardingFields?: string[];
}

export interface Attendee {
	id: string;
	name: string;
	role: string;
	organization?: string;
	photoUrl?: string;
	email?: string;
	badgeNumber?: number;
	profileUrl?: string;
	metadata?: Record<string, unknown>;
}

export interface GeneratedAsset {
	type: "badge" | "poster" | "og" | "certificate" | "social-card";
	format: "png" | "svg" | "webp";
	url?: string;
	buffer?: Buffer | Uint8Array;
	width: number;
	height: number;
	metadata?: Record<string, unknown>;
}

export interface SponsorTier {
	id: string;
	name: string;
	slug: string;
	price?: number;
	color?: string;
	benefits?: string[];
	maxSponsors?: number;
}

export interface SponsorConfig {
	tiers: SponsorTier[];
	ctaUrl?: string;
	ctaLabel?: string;
	deckSlides?: DeckSlideConfig[];
}

export interface DeckSlideConfig {
	variant: "cover" | "opportunity" | "audience" | "tiers" | "benefits" | "past-sponsors" | "contact";
	title?: string;
	content?: string;
	image?: string;
}

export interface SpeakerConfig {
	enabled: boolean;
	ctaUrl?: string;
}

export interface ScheduleConfig {
	enabled: boolean;
	timezone?: string;
}

export interface JudgesConfig {
	enabled: boolean;
}

export interface JobsConfig {
	enabled: boolean;
}

export interface HackathonConfig {
	enabled: boolean;
	tracks?: {
		name: string;
		slug: string;
		description?: string;
		color?: string;
		prizes?: { place: string; prize: string; value?: number }[];
	}[];
	submissionDeadline?: Date | string;
	judgingCriteria?: { name: string; weight: number; description?: string }[];
}

export interface FAQItem {
	question: string;
	answer: string;
}

export interface FAQConfig {
	items: FAQItem[];
	contactUrl?: string;
}

export interface CommunityConfig {
	whatsappUrl?: string;
	discordUrl?: string;
	twitterUrl?: string;
}

export interface EventFeatures {
	speakers?: SpeakerConfig;
	sponsors?: SponsorConfig;
	schedule?: ScheduleConfig;
	judges?: JudgesConfig;
	jobs?: JobsConfig;
	hackathon?: HackathonConfig;
	faq?: FAQConfig;
	community?: CommunityConfig;
	badges?: boolean;
	i18n?: boolean;
	deck?: boolean;
}

export type EventStyle = "terminal" | "minimal" | "neobrutalist" | "corporate" | "custom";

export interface EventConfig extends EventIdentity {
	type: "conference" | "hackathon" | "meetup" | "workshop" | "hybrid";
	style?: EventStyle;
	features: EventFeatures;
}
