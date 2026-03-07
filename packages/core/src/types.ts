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
	variant:
		| "cover"
		| "opportunity"
		| "audience"
		| "tiers"
		| "benefits"
		| "past-sponsors"
		| "contact";
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

export interface MentorsConfig {
	enabled: boolean;
	ctaUrl?: string;
	ctaLabel?: string;
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

export interface CommunityPartnersConfig {
	enabled: boolean;
}

export interface FilterSettings {
	bgBlur: number;
	bgGrain: number;
	faceGrain: number;
	faceTintHex: string;
	faceTintOpacity: number;
	accentColor: string;
	overlay: boolean;
	autoPosition: boolean;
	panX: number;
	panY: number;
	zoom: number;
}

export interface FaceBox {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface FaceDetectionResult {
	faceBox: FaceBox;
	rightHalfBox: FaceBox;
	eyesRegion: FaceBox;
	smileRegion: FaceBox;
	landmarks: { x: number; y: number }[];
}

export type PosterTemplateType = "half-face" | "eyes" | "smile" | "full";

export interface RegistrationProvider {
	name: string;
	checkRegistration(email: string): Promise<RegistrationCheckResult>;
}

export type RegistrationCheckResult =
	| { registered: true; name: string; metadata?: Record<string, unknown> }
	| { registered: false; error: "not_found" | "not_approved" | "unknown" };

export interface RegistrationConfig {
	provider?: "luma" | "eventbrite" | "custom";
	requireVerification?: boolean;
}

export interface EventFeatures {
	speakers?: SpeakerConfig;
	sponsors?: SponsorConfig;
	schedule?: ScheduleConfig;
	judges?: JudgesConfig;
	mentors?: MentorsConfig;
	jobs?: JobsConfig;
	hackathon?: HackathonConfig;
	faq?: FAQConfig;
	community?: CommunityConfig;
	communityPartners?: CommunityPartnersConfig;
	registration?: RegistrationConfig;
	badges?: boolean;
	i18n?: boolean;
	deck?: boolean;
}

export type EventStyle = "analog" | "retro" | "brutal" | "custom";

export interface EventConfig extends EventIdentity {
	type: "conference" | "hackathon" | "meetup" | "workshop" | "hybrid";
	style?: EventStyle;
	features: EventFeatures;
}
