import type { Database } from "../connection";
import { createAttendeeQueries } from "./attendees";
import { createBadgeQueries } from "./badges";
import { createEventQueries } from "./events";
import { createPosterQueries } from "./posters";

export function createQueries(db: Database) {
	return {
		events: createEventQueries(db),
		attendees: createAttendeeQueries(db),
		badges: createBadgeQueries(db),
		posters: createPosterQueries(db),
	};
}

export { createAttendeeQueries } from "./attendees";
export { createBadgeQueries } from "./badges";
export { createEventQueries } from "./events";
export { createPosterQueries } from "./posters";
