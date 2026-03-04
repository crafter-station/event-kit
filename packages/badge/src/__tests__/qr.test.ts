import { describe, expect, test } from "bun:test";
import { generateQRCode } from "../qr";

describe("generateQRCode", () => {
	test("generates a PNG buffer", async () => {
		const buffer = await generateQRCode("https://example.com");
		expect(buffer).toBeInstanceOf(Buffer);
		expect(buffer.length).toBeGreaterThan(0);
	});

	test("generates valid PNG header", async () => {
		const buffer = await generateQRCode("https://example.com");
		expect(buffer[0]).toBe(0x89);
		expect(buffer[1]).toBe(0x50);
		expect(buffer[2]).toBe(0x4e);
		expect(buffer[3]).toBe(0x47);
	});

	test("accepts custom options", async () => {
		const buffer = await generateQRCode("https://example.com", {
			width: 300,
			margin: 2,
			errorCorrectionLevel: "H",
			darkColor: "#ffffff",
			lightColor: "#000000",
		});
		expect(buffer).toBeInstanceOf(Buffer);
		expect(buffer.length).toBeGreaterThan(0);
	});
});
