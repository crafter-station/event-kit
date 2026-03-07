import { eq, and } from "drizzle-orm";
import type { Database } from "../connection";
import { posters, attendees } from "../schema";
import type { NewPoster } from "../schema";

export function createPosterQueries(db: Database) {
	return {
		async create(data: NewPoster) {
			const [poster] = await db.insert(posters).values(data).returning();
			return poster;
		},

		async getById(id: string) {
			const [poster] = await db.select().from(posters).where(eq(posters.id, id));
			return poster ?? null;
		},

		async getByAttendee(attendeeId: string) {
			const [poster] = await db
				.select()
				.from(posters)
				.where(eq(posters.attendeeId, attendeeId));
			return poster ?? null;
		},

		async getWithAttendee(posterId: string) {
			const [result] = await db
				.select()
				.from(posters)
				.innerJoin(attendees, eq(posters.attendeeId, attendees.id))
				.where(eq(posters.id, posterId));
			return result ?? null;
		},

		async listByEvent(eventId: string) {
			return db
				.select()
				.from(posters)
				.innerJoin(attendees, eq(posters.attendeeId, attendees.id))
				.where(eq(posters.eventId, eventId));
		},

		async update(id: string, data: Partial<NewPoster>) {
			const [poster] = await db
				.update(posters)
				.set({ ...data, updatedAt: new Date() })
				.where(eq(posters.id, id))
				.returning();
			return poster;
		},

		async verifyByNumber(eventId: string, number: number) {
			const [result] = await db
				.select()
				.from(posters)
				.innerJoin(attendees, eq(posters.attendeeId, attendees.id))
				.where(and(eq(posters.eventId, eventId), eq(posters.number, number)));
			return result ?? null;
		},
	};
}
