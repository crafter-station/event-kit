import { createEventIdentity } from "./factory";
import type { EventConfig } from "./types";

type DefineEventInput = Partial<EventConfig> & Pick<EventConfig, "name" | "slug" | "type">;

const DEFAULT_FEATURES: EventConfig["features"] = {
	speakers: { enabled: true },
	sponsors: { tiers: [] },
	schedule: { enabled: true },
	judges: { enabled: false },
	jobs: { enabled: false },
	hackathon: { enabled: false },
	faq: { items: [] },
	community: {},
	badges: true,
	i18n: true,
	deck: true,
};

export function defineEvent(config: DefineEventInput): EventConfig {
	const identity = createEventIdentity(config);

	return {
		...identity,
		type: config.type,
		style: config.style ?? "analog",
		features: config.features
			? {
					...DEFAULT_FEATURES,
					...config.features,
					sponsors: config.features.sponsors
						? { ...DEFAULT_FEATURES.sponsors, ...config.features.sponsors }
						: DEFAULT_FEATURES.sponsors,
				}
			: DEFAULT_FEATURES,
	};
}
