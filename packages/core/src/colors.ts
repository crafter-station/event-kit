export function hexToRgb(hex: string): [number, number, number] {
	const h = hex.replace("#", "");
	return [
		parseInt(h.substring(0, 2), 16),
		parseInt(h.substring(2, 4), 16),
		parseInt(h.substring(4, 6), 16),
	];
}

export function luminance(r: number, g: number, b: number): number {
	const [rs, gs, bs] = [r, g, b].map((c) => {
		const s = c / 255;
		return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
	});
	return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function lighten(hex: string, amount: number): string {
	const [r, g, b] = hexToRgb(hex);
	const lr = Math.round(r + (255 - r) * amount);
	const lg = Math.round(g + (255 - g) * amount);
	const lb = Math.round(b + (255 - b) * amount);
	return `#${lr.toString(16).padStart(2, "0")}${lg.toString(16).padStart(2, "0")}${lb.toString(16).padStart(2, "0")}`;
}

export function saturation(r: number, g: number, b: number): number {
	const max = Math.max(r, g, b) / 255;
	const min = Math.min(r, g, b) / 255;
	if (max === 0) return 0;
	if (max === min) return 0;
	const l = (max + min) / 2;
	const d = max - min;
	return l > 0.5 ? d / (2 - max - min) : d / (max + min);
}

export function pickReadableColor(colors: string[]): string {
	if (colors.length === 0) return "#ffffff";

	const sorted = colors
		.map((c) => ({ color: c, lum: luminance(...hexToRgb(c)) }))
		.sort((a, b) => b.lum - a.lum);

	const best = sorted[0];
	if (best.lum > 0.15) return best.color;
	return lighten(best.color, 0.5);
}

export function pickAccentColor(colors: string[]): string {
	if (colors.length === 0) return "#ff2d78";

	const scored = colors.map((c) => {
		const [r, g, b] = hexToRgb(c);
		const sat = saturation(r, g, b);
		const lum = luminance(r, g, b);
		return { color: c, sat, lum };
	});

	const vivid = scored.filter((c) => c.sat > 0.2);
	const pick = vivid.length > 0 ? vivid.sort((a, b) => b.sat - a.sat)[0] : scored[0];

	if (pick.lum < 0.08) return lighten(pick.color, 0.4);
	return pick.color;
}
