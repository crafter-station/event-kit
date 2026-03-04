import { describe, expect, test } from "bun:test";
import { capConfigForMobile, defaultParticleConfig, particleConfigSchema } from "../particle-config";

describe("particleConfigSchema", () => {
	test("validates default config", () => {
		const result = particleConfigSchema.safeParse(defaultParticleConfig);
		expect(result.success).toBe(true);
	});

	test("rejects empty groups", () => {
		const result = particleConfigSchema.safeParse({ groups: [] });
		expect(result.success).toBe(false);
	});

	test("rejects more than 4 groups", () => {
		const groups = Array.from({ length: 5 }, () => ({
			color: "#ff0000",
			count: 100,
			size: 0.012,
			shape: "sphere",
			metalness: 0.5,
			roughness: 0.5,
			emissive: "#000000",
			emissiveIntensity: 0,
			clearcoat: 0.5,
			opacity: 1,
			transmission: 0,
			fluid: false,
		}));
		const result = particleConfigSchema.safeParse({ groups });
		expect(result.success).toBe(false);
	});

	test("rejects invalid shape", () => {
		const result = particleConfigSchema.safeParse({
			groups: [
				{
					color: "#ff0000",
					count: 100,
					size: 0.012,
					shape: "triangle",
					metalness: 0.5,
					roughness: 0.5,
					emissive: "#000000",
					emissiveIntensity: 0,
					clearcoat: 0.5,
					opacity: 1,
					transmission: 0,
					fluid: false,
				},
			],
		});
		expect(result.success).toBe(false);
	});
});

describe("capConfigForMobile", () => {
	test("caps total particles to 500", () => {
		const config = {
			groups: [
				{ ...defaultParticleConfig.groups[0], count: 2000 },
				{ ...defaultParticleConfig.groups[0], count: 1000 },
			],
		};
		const capped = capConfigForMobile(config);
		const total = capped.groups.reduce((s, g) => s + g.count, 0);
		expect(total).toBeLessThanOrEqual(500);
	});

	test("sets mobile particle size", () => {
		const capped = capConfigForMobile(defaultParticleConfig);
		for (const group of capped.groups) {
			expect(group.size).toBe(0.025);
		}
	});

	test("preserves config under limit", () => {
		const config = {
			groups: [{ ...defaultParticleConfig.groups[0], count: 200 }],
		};
		const capped = capConfigForMobile(config);
		expect(capped.groups[0].count).toBe(200);
	});
});
