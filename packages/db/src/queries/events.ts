import { eq } from "drizzle-orm";
import type { Database } from "../connection";
import { events } from "../schema";
import type { NewEvent } from "../schema";

export function createEventQueries(db: Database) {
	return {
		async create(data: NewEvent) {
			const [event] = await db.insert(events).values(data).returning();
			return event;
		},

		async getById(id: string) {
			const [event] = await db.select().from(events).where(eq(events.id, id));
			return event ?? null;
		},

		async getBySlug(slug: string) {
			const [event] = await db.select().from(events).where(eq(events.slug, slug));
			return event ?? null;
		},

		async update(id: string, data: Partial<NewEvent>) {
			const [event] = await db
				.update(events)
				.set({ ...data, updatedAt: new Date() })
				.where(eq(events.id, id))
				.returning();
			return event;
		},

		async list() {
			return db.select().from(events);
		},
	};
}
