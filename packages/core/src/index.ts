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
	JobsConfig,
	HackathonConfig,
	FAQItem,
	FAQConfig,
	CommunityConfig,
	EventFeatures,
	EventStyle,
	EventConfig,
} from "./types";

export { defineEvent } from "./define-event";
