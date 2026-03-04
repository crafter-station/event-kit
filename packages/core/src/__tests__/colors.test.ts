import { describe, expect, test } from "bun:test";
import { hexToRgb, lighten, luminance, pickAccentColor, pickReadableColor, saturation } from "../colors";

describe("hexToRgb", () => {
	test("parses standard hex", () => {
		expect(hexToRgb("#ff0000")).toEqual([255, 0, 0]);
		expect(hexToRgb("#00ff00")).toEqual([0, 255, 0]);
		expect(hexToRgb("#0000ff")).toEqual([0, 0, 255]);
	});

	test("parses hex without #", () => {
		expect(hexToRgb("ffffff")).toEqual([255, 255, 255]);
		expect(hexToRgb("000000")).toEqual([0, 0, 0]);
	});
});

describe("luminance", () => {
	test("white has high luminance", () => {
		expect(luminance(255, 255, 255)).toBeCloseTo(1, 2);
	});

	test("black has zero luminance", () => {
		expect(luminance(0, 0, 0)).toBe(0);
	});

	test("green has higher luminance than red", () => {
		expect(luminance(0, 255, 0)).toBeGreaterThan(luminance(255, 0, 0));
	});
});

describe("lighten", () => {
	test("lighten black by 50% gives mid-gray", () => {
		const result = lighten("#000000", 0.5);
		expect(result).toBe("#808080");
	});

	test("lighten with 0 returns same color", () => {
		expect(lighten("#ff0000", 0)).toBe("#ff0000");
	});

	test("lighten with 1 returns white", () => {
		expect(lighten("#000000", 1)).toBe("#ffffff");
	});
});

describe("saturation", () => {
	test("pure red is saturated", () => {
		expect(saturation(255, 0, 0)).toBeGreaterThan(0.5);
	});

	test("gray has zero saturation", () => {
		expect(saturation(128, 128, 128)).toBe(0);
	});

	test("black has zero saturation", () => {
		expect(saturation(0, 0, 0)).toBe(0);
	});
});

describe("pickReadableColor", () => {
	test("returns white for empty array", () => {
		expect(pickReadableColor([])).toBe("#ffffff");
	});

	test("picks bright color from mixed set", () => {
		const result = pickReadableColor(["#000000", "#ffffff", "#333333"]);
		expect(result).toBe("#ffffff");
	});

	test("lightens dark-only colors", () => {
		const result = pickReadableColor(["#111111", "#0a0a0a"]);
		expect(result).not.toBe("#111111");
	});
});

describe("pickAccentColor", () => {
	test("returns fallback for empty array", () => {
		expect(pickAccentColor([])).toBe("#ff2d78");
	});

	test("picks vivid color over muted", () => {
		const result = pickAccentColor(["#808080", "#ff0000", "#999999"]);
		expect(result).toBe("#ff0000");
	});

	test("lightens very dark vivid colors", () => {
		const result = pickAccentColor(["#0a0000"]);
		expect(result).not.toBe("#0a0000");
	});
});
