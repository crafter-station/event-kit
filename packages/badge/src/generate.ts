import { hexToRgb, pickAccentColor } from "@crafter/event-kit-core";
import satori from "satori";
import sharp from "sharp";
import type { BadgeGenerateOptions, FontData, GeneratedAsset } from "./types";
import { DEFAULT_LAYOUT, calculateOptimalFontSize, splitName } from "./layout";
import { generateQRCode } from "./qr";
import { ROLE_BADGE_COLORS } from "./presets";
import type { ReactNode } from "react";

function formatBadgeNumber(num: number, format = "###"): string {
	const digits = format.length;
	return String(num).padStart(digits, "0");
}

function getRoleColor(roleId: string, identityPrimary: string): string {
	const preset = ROLE_BADGE_COLORS[roleId];
	return preset?.primary ?? identityPrimary;
}

async function loadGoogleFont(family: string, weight: number): Promise<Buffer> {
	const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
	const css = await fetch(url, {
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
		},
	}).then((r) => r.text());

	const fontUrl = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
	if (!fontUrl) throw new Error(`Could not find font URL for ${family}:${weight}`);

	const fontBuffer = await fetch(fontUrl).then((r) => r.arrayBuffer());
	return Buffer.from(fontBuffer);
}

async function resolveFonts(options: BadgeGenerateOptions): Promise<FontData[]> {
	if (options.fonts?.length) return options.fonts;

	const { brand } = options.identity;
	const displayFont = brand.fonts.display;
	const monoFont = brand.fonts.mono ?? brand.fonts.display;

	const [displayRegular, displayBold, monoRegular] = await Promise.all([
		loadGoogleFont(displayFont.family, displayFont.weights[0] ?? 400),
		loadGoogleFont(displayFont.family, displayFont.weights[1] ?? 700),
		loadGoogleFont(monoFont.family, monoFont.weights[0] ?? 400),
	]);

	return [
		{ name: displayFont.family, data: displayRegular, weight: displayFont.weights[0] ?? 400 },
		{ name: displayFont.family, data: displayBold, weight: displayFont.weights[1] ?? 700 },
		{ name: monoFont.family, data: monoRegular, weight: monoFont.weights[0] ?? 400 },
	];
}

function buildBadgeSVGElement(
	options: BadgeGenerateOptions,
	layout: typeof DEFAULT_LAYOUT,
): ReactNode {
	const { attendee, identity } = options;
	const { brand } = identity;
	const { firstName, lastName } = splitName(attendee.name);
	const roleColor = getRoleColor(attendee.role, brand.colors.primary);
	const badgeNum = attendee.badgeNumber ?? 0;
	const numberFormat = brand.badge.numberFormat ?? "###";
	const formattedNumber = formatBadgeNumber(badgeNum, numberFormat);
	const numberText = `#${formattedNumber}`;

	const maxTextWidth = (layout.width - layout.name.x - 60) * 0.92;
	const letterSpacing = 0.08;

	const firstNameResult = calculateOptimalFontSize(firstName, 60, 45, maxTextWidth, letterSpacing);
	const lastNameResult = calculateOptimalFontSize(lastName, 60, 45, maxTextWidth, letterSpacing);

	const roleDisplayName =
		identity.roles.find((r) => r.id === attendee.role)?.displayName ??
		attendee.organization ??
		attendee.role;
	const roleResult = calculateOptimalFontSize(roleDisplayName.toUpperCase(), 40, 30, maxTextWidth, letterSpacing);

	const fontFamily = brand.fonts.display.family;
	const monoFamily = brand.fonts.mono?.family ?? fontFamily;

	return {
		type: "div",
		props: {
			style: {
				display: "flex",
				flexDirection: "column",
				width: `${layout.width}px`,
				height: `${layout.height}px`,
				position: "relative",
			},
			children: [
				{
					type: "div",
					props: {
						style: {
							position: "absolute",
							top: `${layout.number.y}px`,
							left: `${layout.number.x}px`,
							color: layout.number.color,
							fontSize: `${layout.number.fontSize}px`,
							fontFamily: monoFamily,
							fontWeight: 400,
							letterSpacing: "0.34em",
							textTransform: "uppercase",
						},
						children: numberText,
					},
				},
				{
					type: "div",
					props: {
						style: {
							position: "absolute",
							top: `${layout.name.y - firstNameResult.fontSize}px`,
							left: `${layout.name.x}px`,
							color: brand.colors.text,
							fontSize: `${firstNameResult.fontSize}px`,
							fontFamily,
							fontWeight: 700,
							letterSpacing: "0.08em",
							textTransform: "uppercase",
							maxWidth: `${maxTextWidth}px`,
							overflow: "hidden",
							whiteSpace: "nowrap",
						},
						children: firstNameResult.text,
					},
				},
				{
					type: "div",
					props: {
						style: {
							position: "absolute",
							top: `${layout.name.y - lastNameResult.fontSize + 60}px`,
							left: `${layout.name.x}px`,
							color: brand.colors.text,
							fontSize: `${lastNameResult.fontSize}px`,
							fontFamily,
							fontWeight: 700,
							letterSpacing: "0.08em",
							textTransform: "uppercase",
							maxWidth: `${maxTextWidth}px`,
							overflow: "hidden",
							whiteSpace: "nowrap",
						},
						children: lastNameResult.text,
					},
				},
				{
					type: "div",
					props: {
						style: {
							position: "absolute",
							top: `${layout.role.y - roleResult.fontSize}px`,
							left: `${layout.role.x}px`,
							color: roleColor,
							fontSize: `${roleResult.fontSize}px`,
							fontFamily,
							fontWeight: 400,
							letterSpacing: "0.08em",
							textTransform: "uppercase",
							maxWidth: `${maxTextWidth}px`,
							overflow: "hidden",
							whiteSpace: "nowrap",
						},
						children: roleResult.text,
					},
				},
			],
		},
	} as unknown as ReactNode;
}

export async function generateBadge(options: BadgeGenerateOptions): Promise<GeneratedAsset> {
	const { attendee, identity } = options;
	const { brand } = identity;
	const layout = DEFAULT_LAYOUT;
	const format = options.output?.format ?? "png";
	const quality = options.output?.quality ?? 90;

	const fonts = await resolveFonts(options);

	const layers: sharp.OverlayOptions[] = [];

	if (options.photoBuffer) {
		const processedPhoto = await sharp(options.photoBuffer)
			.resize(layout.photo.width, layout.photo.height, {
				fit: "contain",
				background: { r: 0, g: 0, b: 0, alpha: 0 },
			})
			.png()
			.toBuffer();

		layers.push({
			input: processedPhoto,
			top: Math.round(layout.photo.y),
			left: Math.round(layout.photo.x),
		});
	}

	const textElement = buildBadgeSVGElement(options, layout);
	const svgText = await satori(textElement, {
		width: layout.width,
		height: layout.height,
		fonts: fonts.map((f) => ({
			name: f.name,
			data: f.data,
			weight: f.weight as 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
			style: f.style ?? "normal",
		})),
	});

	layers.push({
		input: Buffer.from(svgText),
		top: 0,
		left: 0,
	});

	if (brand.badge.qrCode?.enabled && attendee.profileUrl) {
		const qrBuffer = await generateQRCode(attendee.profileUrl, {
			width: layout.qrCode.width,
		});
		const resizedQr = await sharp(qrBuffer)
			.resize(layout.qrCode.width, layout.qrCode.height)
			.toBuffer();

		layers.push({
			input: resizedQr,
			top: Math.round(layout.qrCode.y),
			left: Math.round(layout.qrCode.x),
		});
	}

	const [bgR, bgG, bgB] = hexToRgb(brand.colors.background);
	let pipeline = sharp({
		create: {
			width: layout.width,
			height: layout.height,
			channels: 4,
			background: { r: bgR, g: bgG, b: bgB, alpha: 1 },
		},
	});

	if (brand.badge.baseTexture) {
		const templateResponse = await fetch(brand.badge.baseTexture);
		const templateBuffer = Buffer.from(await templateResponse.arrayBuffer());
		pipeline = sharp(templateBuffer).resize(layout.width, layout.height, { fit: "fill" });
	}

	const composited = await pipeline.composite(layers);

	let buffer: Buffer;
	if (format === "webp") {
		buffer = await composited.webp({ quality }).toBuffer();
	} else {
		buffer = await composited.png({ quality }).toBuffer();
	}

	return {
		type: "badge",
		format,
		buffer,
		width: layout.width,
		height: layout.height,
	};
}

export async function generateBadgeBatch(
	optionsList: BadgeGenerateOptions[],
): Promise<GeneratedAsset[]> {
	return Promise.all(optionsList.map(generateBadge));
}
