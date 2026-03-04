import type { BadgeLayout } from "./types";

export function calculateOptimalFontSize(
	text: string,
	baseFontSize: number,
	minFontSize: number,
	maxTextWidth: number,
	letterSpacing: number,
): { fontSize: number; text: string } {
	if (!text) return { fontSize: baseFontSize, text: "" };

	const letterSpacingValue = baseFontSize * letterSpacing;
	const avgCharWidth = baseFontSize + letterSpacingValue;
	const requiredWidth = text.length * avgCharWidth;

	if (requiredWidth <= maxTextWidth) {
		return { fontSize: baseFontSize, text };
	}

	const scaleFactor = maxTextWidth / requiredWidth;
	const scaledFontSize = baseFontSize * scaleFactor;
	const finalFontSize = Math.max(Math.floor(scaledFontSize), minFontSize);

	if (finalFontSize === minFontSize) {
		const minLetterSpacingValue = minFontSize * letterSpacing;
		const minAvgCharWidth = minFontSize + minLetterSpacingValue;
		const maxCharsAtMinSize = Math.floor(maxTextWidth / minAvgCharWidth);

		if (text.length > maxCharsAtMinSize) {
			return { fontSize: minFontSize, text: `${text.substring(0, maxCharsAtMinSize - 1)}…` };
		}
	}

	return { fontSize: finalFontSize, text };
}

export function splitName(fullName: string): { firstName: string; lastName: string } {
	const parts = fullName.trim().split(" ").filter(Boolean);

	if (parts.length === 0) return { firstName: "", lastName: "" };
	if (parts.length === 1) return { firstName: parts[0], lastName: "" };
	return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

export const DEFAULT_LAYOUT: BadgeLayout = {
	width: 1080,
	height: 1440,
	photo: { x: 130, y: 393, width: 574, height: 574 },
	name: { x: 325, y: 1199 },
	role: { x: 325, y: 1299 },
	number: { x: 151, y: 313, fontSize: 32, color: "rgba(246, 246, 246, 0.35)" },
	qrCode: { x: 116, y: 1139, width: 179, height: 179 },
};
