export type {
	EventIdentity,
	EventBrand,
	EventRole,
	FontSpec,
	Attendee,
	GeneratedAsset,
	BadgeConfig,
	PosterConfig,
	EffectsConfig,
} from "./types";

export { eventIdentitySchema, eventBrandSchema, attendeeSchema } from "./schemas";

export { createEventIdentity } from "./factory";

export {
	hexToRgb,
	lighten,
	pickReadableColor,
	pickAccentColor,
	luminance,
	saturation,
} from "./colors";

export type {
	SponsorTier,
	SponsorConfig,
	DeckSlideConfig,
	SpeakerConfig,
	ScheduleConfig,
	JudgesConfig,
	MentorsConfig,
	JobsConfig,
	HackathonConfig,
	FAQItem,
	FAQConfig,
	CommunityConfig,
	CommunityPartnersConfig,
	FilterSettings,
	FaceBox,
	FaceDetectionResult,
	PosterTemplateType,
	RegistrationProvider,
	RegistrationCheckResult,
	RegistrationConfig,
	EventFeatures,
	EventStyle,
	EventConfig,
} from "./types";

export { defineEvent } from "./define-event";

export { createLumaProvider, type LumaProviderOptions } from "./providers/luma";

export type { StorageProvider } from "./providers/storage";

export {
	buildOGImageElement,
	buildBadgeOGElement,
	type OGImageOptions,
	type BadgeOGOptions,
} from "./og";
