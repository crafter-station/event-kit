import { describe, expect, test } from "bun:test";
import { calculateOptimalFontSize, splitName } from "../layout";

describe("splitName", () => {
	test("splits first and last name", () => {
		expect(splitName("John Doe")).toEqual({ firstName: "John", lastName: "Doe" });
	});

	test("handles single name", () => {
		expect(splitName("John")).toEqual({ firstName: "John", lastName: "" });
	});

	test("handles multiple parts", () => {
		expect(splitName("John van der Berg")).toEqual({ firstName: "John", lastName: "van der Berg" });
	});

	test("handles empty string", () => {
		expect(splitName("")).toEqual({ firstName: "", lastName: "" });
	});

	test("trims whitespace", () => {
		expect(splitName("  John  Doe  ")).toEqual({ firstName: "John", lastName: "Doe" });
	});
});

describe("calculateOptimalFontSize", () => {
	test("returns base size for short text", () => {
		const result = calculateOptimalFontSize("Hi", 48, 24, 600, 0.05);
		expect(result.fontSize).toBe(48);
		expect(result.text).toBe("Hi");
	});

	test("scales down for long text", () => {
		const result = calculateOptimalFontSize("Superlongname", 48, 24, 300, 0.05);
		expect(result.fontSize).toBeLessThan(48);
		expect(result.fontSize).toBeGreaterThanOrEqual(24);
	});

	test("truncates when at min size", () => {
		const result = calculateOptimalFontSize(
			"This is an extremely long name that should be truncated",
			48,
			24,
			200,
			0.05,
		);
		expect(result.fontSize).toBe(24);
		expect(result.text.endsWith("…")).toBe(true);
	});

	test("returns empty for empty text", () => {
		const result = calculateOptimalFontSize("", 48, 24, 600, 0.05);
		expect(result.fontSize).toBe(48);
		expect(result.text).toBe("");
	});
});
