import { describe, expect, test } from "bun:test";
import { particleConfigSchema } from "../particle-config";
import { FLAG_PRESETS, STYLE_PRESETS } from "../presets";

describe("FLAG_PRESETS", () => {
	test("has at least 10 presets", () => {
		expect(FLAG_PRESETS.length).toBeGreaterThanOrEqual(10);
	});

	test("all presets have valid config", () => {
		for (const preset of FLAG_PRESETS) {
			const result = particleConfigSchema.safeParse(preset.config);
			expect(result.success).toBe(true);
		}
	});

	test("all presets have unique ids", () => {
		const ids = FLAG_PRESETS.map((p) => p.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	test("includes Peru", () => {
		expect(FLAG_PRESETS.find((p) => p.id === "pe")).toBeDefined();
	});
});

describe("STYLE_PRESETS", () => {
	test("has at least 3 presets", () => {
		expect(STYLE_PRESETS.length).toBeGreaterThanOrEqual(3);
	});

	test("all presets have valid config", () => {
		for (const preset of STYLE_PRESETS) {
			const result = particleConfigSchema.safeParse(preset.config);
			expect(result.success).toBe(true);
		}
	});

	test("all presets have unique ids", () => {
		const ids = STYLE_PRESETS.map((p) => p.id);
		expect(new Set(ids).size).toBe(ids.length);
	});
});
