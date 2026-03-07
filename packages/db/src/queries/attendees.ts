import { eq, and } from "drizzle-orm";
import type { Database } from "../connection";
import { attendees } from "../schema";
import type { NewAttendee } from "../schema";

export function createAttendeeQueries(db: Database) {
	return {
		async create(data: NewAttendee) {
			const [attendee] = await db.insert(attendees).values(data).returning();
			return attendee;
		},

		async getById(id: string) {
			const [attendee] = await db.select().from(attendees).where(eq(attendees.id, id));
			return attendee ?? null;
		},

		async getByEmail(eventId: string, email: string) {
			const [attendee] = await db
				.select()
				.from(attendees)
				.where(and(eq(attendees.eventId, eventId), eq(attendees.email, email)));
			return attendee ?? null;
		},

		async getByClerkId(clerkUserId: string) {
			const [attendee] = await db
				.select()
				.from(attendees)
				.where(eq(attendees.clerkUserId, clerkUserId));
			return attendee ?? null;
		},

		async listByEvent(eventId: string) {
			return db.select().from(attendees).where(eq(attendees.eventId, eventId));
		},

		async update(id: string, data: Partial<NewAttendee>) {
			const [attendee] = await db
				.update(attendees)
				.set({ ...data, updatedAt: new Date() })
				.where(eq(attendees.id, id))
				.returning();
			return attendee;
		},

		async getNextBadgeNumber(eventId: string) {
			const result = await db
				.select({ badgeNumber: attendees.badgeNumber })
				.from(attendees)
				.where(eq(attendees.eventId, eventId))
				.orderBy(attendees.badgeNumber);
			const maxNum = result.reduce((max, r) => Math.max(max, r.badgeNumber ?? 0), 0);
			return maxNum + 1;
		},

		async count(eventId: string) {
			const result = await db.select().from(attendees).where(eq(attendees.eventId, eventId));
			return result.length;
		},
	};
}
