import { hexToRgb, lighten, pickAccentColor, pickReadableColor } from "@crafter/event-kit-core";

export interface CardTextureOptions {
	name: string;
	role: string;
	organization?: string;
	badgeNumber?: string;
	eventName: string;
	eventTagline?: string;
	logoUrl?: string;
	baseTextureUrl?: string;
	particleColors?: string[];
	width?: number;
	height?: number;
	backgroundColor?: string;
	textColor?: string;
	accentColor?: string;
	fontFamily?: string;
}

export async function generateCardTexture(options: CardTextureOptions): Promise<string> {
	const {
		name,
		role,
		organization,
		badgeNumber,
		eventName,
		eventTagline,
		particleColors = [],
		width = 1024,
		height = 1024,
		backgroundColor = "#131414",
		textColor,
		accentColor,
		fontFamily = "Arial, sans-serif",
	} = options;

	const accent = accentColor ?? pickAccentColor(particleColors);
	const readable = textColor ?? pickReadableColor(particleColors);

	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d")!;

	if (options.baseTextureUrl) {
		const img = new Image();
		img.crossOrigin = "anonymous";
		await new Promise<void>((resolve, reject) => {
			img.onload = () => resolve();
			img.onerror = reject;
			img.src = options.baseTextureUrl!;
		});
		ctx.drawImage(img, 0, 0, width, height);
	} else {
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, width, height);

		const [r, g, b] = hexToRgb(accent);
		const grd = ctx.createRadialGradient(width * 0.5, height * 0.3, 0, width * 0.5, height * 0.3, width * 0.6);
		grd.addColorStop(0, `rgba(${r},${g},${b},0.08)`);
		grd.addColorStop(1, "transparent");
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, width, height);
	}

	if (options.logoUrl) {
		const logo = new Image();
		logo.crossOrigin = "anonymous";
		await new Promise<void>((resolve) => {
			logo.onload = () => resolve();
			logo.onerror = () => resolve();
			logo.src = options.logoUrl!;
		});
		if (logo.complete && logo.naturalWidth > 0) {
			const logoSize = width * 0.12;
			ctx.drawImage(logo, width * 0.06, height * 0.04, logoSize, logoSize);
		}
	}

	const marginLeft = width * 0.08;
	let y = height * 0.22;

	ctx.fillStyle = accent;
	ctx.font = `bold ${width * 0.024}px ${fontFamily}`;
	ctx.textAlign = "left";
	ctx.fillText(eventName.toUpperCase(), marginLeft, y);

	if (eventTagline) {
		y += width * 0.04;
		ctx.fillStyle = `${readable}66`;
		ctx.font = `${width * 0.018}px ${fontFamily}`;
		ctx.fillText(eventTagline, marginLeft, y);
	}

	y = height * 0.6;
	ctx.fillStyle = readable;
	ctx.font = `bold ${width * 0.065}px ${fontFamily}`;
	const nameParts = name.split(" ");
	for (const part of nameParts) {
		ctx.fillText(part.toUpperCase(), marginLeft, y);
		y += width * 0.075;
	}

	ctx.fillStyle = accent;
	ctx.font = `bold ${width * 0.028}px ${fontFamily}`;
	ctx.fillText(role.toUpperCase(), marginLeft, y);

	if (organization) {
		y += width * 0.04;
		ctx.fillStyle = `${readable}99`;
		ctx.font = `${width * 0.022}px ${fontFamily}`;
		ctx.fillText(organization, marginLeft, y);
	}

	if (badgeNumber) {
		ctx.fillStyle = `${readable}33`;
		ctx.font = `${width * 0.018}px monospace`;
		ctx.fillText(`#${badgeNumber}`, marginLeft, height * 0.95);
	}

	return canvas.toDataURL("image/png");
}
