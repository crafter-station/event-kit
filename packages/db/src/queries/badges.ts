import { eq, and } from "drizzle-orm";
import type { Database } from "../connection";
import { badges, attendees } from "../schema";
import type { NewBadge } from "../schema";

export function createBadgeQueries(db: Database) {
	return {
		async create(data: NewBadge) {
			const [badge] = await db.insert(badges).values(data).returning();
			return badge;
		},

		async getById(id: string) {
			const [badge] = await db.select().from(badges).where(eq(badges.id, id));
			return badge ?? null;
		},

		async getByAttendee(attendeeId: string) {
			const [badge] = await db
				.select()
				.from(badges)
				.where(eq(badges.attendeeId, attendeeId));
			return badge ?? null;
		},

		async getWithAttendee(badgeId: string) {
			const [result] = await db
				.select()
				.from(badges)
				.innerJoin(attendees, eq(badges.attendeeId, attendees.id))
				.where(eq(badges.id, badgeId));
			return result ?? null;
		},

		async listByEvent(eventId: string) {
			return db
				.select()
				.from(badges)
				.innerJoin(attendees, eq(badges.attendeeId, attendees.id))
				.where(eq(badges.eventId, eventId));
		},

		async update(id: string, data: Partial<NewBadge>) {
			const [badge] = await db
				.update(badges)
				.set(data)
				.where(eq(badges.id, id))
				.returning();
			return badge;
		},

		async verifyByNumber(eventId: string, number: number) {
			const [result] = await db
				.select()
				.from(badges)
				.innerJoin(attendees, eq(badges.attendeeId, attendees.id))
				.where(and(eq(badges.eventId, eventId), eq(badges.number, number)));
			return result ?? null;
		},
	};
}
