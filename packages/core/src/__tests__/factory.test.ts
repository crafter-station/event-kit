import { describe, expect, test } from "bun:test";
import { createEventIdentity } from "../factory";

describe("createEventIdentity", () => {
	test("creates identity with minimal config", () => {
		const identity = createEventIdentity({ name: "Test Event", slug: "test-event" });

		expect(identity.name).toBe("Test Event");
		expect(identity.slug).toBe("test-event");
		expect(identity.id).toBe("test-event");
	});

	test("assigns default brand", () => {
		const identity = createEventIdentity({ name: "Test", slug: "test" });

		expect(identity.brand.colors.primary).toBe("#4ade80");
		expect(identity.brand.fonts.display.family).toBe("Space Grotesk");
		expect(identity.brand.badge.template).toBe("card");
	});

	test("assigns default roles", () => {
		const identity = createEventIdentity({ name: "Test", slug: "test" });

		expect(identity.roles).toHaveLength(6);
		expect(identity.roles[0].id).toBe("attendee");
		expect(identity.roles[1].id).toBe("speaker");
	});

	test("assigns default watermark", () => {
		const identity = createEventIdentity({ name: "Test", slug: "test" });

		expect(identity.watermark?.enabled).toBe(true);
		expect(identity.watermark?.text).toBe("Powered by Crafter Station");
	});

	test("merges custom brand with defaults", () => {
		const identity = createEventIdentity({
			name: "Custom",
			slug: "custom",
			brand: {
				colors: {
					primary: "#ff0000",
					secondary: "#cc0000",
					background: "#000000",
					surface: "#111111",
					text: "#ffffff",
					textMuted: "#aaaaaa",
				},
				fonts: {
					display: { family: "Poppins", weights: [700], source: "google" },
					body: { family: "Roboto", weights: [400], source: "google" },
				},
				logos: { primary: "https://example.com/logo.svg" },
				badge: {
					template: "lanyard",
					dimensions: { width: 800, height: 1200 },
				},
			},
		});

		expect(identity.brand.colors.primary).toBe("#ff0000");
		expect(identity.brand.fonts.display.family).toBe("Poppins");
		expect(identity.brand.badge.template).toBe("lanyard");
	});

	test("custom roles override defaults", () => {
		const identity = createEventIdentity({
			name: "Custom",
			slug: "custom",
			roles: [{ id: "hacker", name: "Hacker", displayName: "Hacker" }],
		});

		expect(identity.roles).toHaveLength(1);
		expect(identity.roles[0].id).toBe("hacker");
	});

	test("custom id overrides slug", () => {
		const identity = createEventIdentity({
			id: "custom-id",
			name: "Test",
			slug: "test",
		});

		expect(identity.id).toBe("custom-id");
	});
});
