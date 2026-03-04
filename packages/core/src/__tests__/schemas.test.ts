import { describe, expect, test } from "bun:test";
import { attendeeSchema, eventIdentitySchema } from "../schemas";

describe("attendeeSchema", () => {
	test("validates minimal attendee", () => {
		const result = attendeeSchema.safeParse({
			id: "1",
			name: "John Doe",
			role: "attendee",
		});
		expect(result.success).toBe(true);
	});

	test("validates full attendee", () => {
		const result = attendeeSchema.safeParse({
			id: "2",
			name: "Jane Smith",
			role: "speaker",
			organization: "Crafter Station",
			email: "jane@example.com",
			badgeNumber: 42,
			photoUrl: "https://example.com/photo.jpg",
			profileUrl: "https://example.com/jane",
		});
		expect(result.success).toBe(true);
	});

	test("rejects missing required fields", () => {
		const result = attendeeSchema.safeParse({ id: "1" });
		expect(result.success).toBe(false);
	});
});

describe("eventIdentitySchema", () => {
	test("validates minimal identity", () => {
		const result = eventIdentitySchema.safeParse({
			id: "test",
			name: "Test Event",
			slug: "test-event",
			brand: {
				colors: {
					primary: "#4ade80",
					secondary: "#22c55e",
					background: "#0a0a0b",
					surface: "#131414",
					text: "#ffffff",
					textMuted: "#a0a0a0",
				},
				fonts: {
					display: { family: "Inter", weights: [700], source: "google" },
					body: { family: "Inter", weights: [400], source: "google" },
				},
				logos: { primary: "" },
				badge: {
					template: "card",
					dimensions: { width: 1080, height: 1440 },
				},
			},
			roles: [{ id: "attendee", name: "Attendee", displayName: "Attendee" }],
		});
		expect(result.success).toBe(true);
	});
});
