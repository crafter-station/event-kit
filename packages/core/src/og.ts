import type { EventIdentity } from "./types";

export interface OGImageOptions {
	title: string;
	subtitle?: string;
	identity: EventIdentity;
	width?: number;
	height?: number;
	logoUrl?: string;
}

export function buildOGImageElement(options: OGImageOptions) {
	const { title, subtitle, identity, width = 1200, height = 630, logoUrl } = options;
	const { brand } = identity;

	return {
		type: "div",
		props: {
			style: {
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "flex-start",
				width: `${width}px`,
				height: `${height}px`,
				padding: "60px 80px",
				backgroundColor: brand.colors.background,
				color: brand.colors.text,
				fontFamily: brand.fonts.display.family,
			},
			children: [
				logoUrl
					? {
							type: "img",
							props: {
								src: logoUrl,
								width: 200,
								height: 50,
								style: { marginBottom: "40px", objectFit: "contain" },
							},
						}
					: {
							type: "div",
							props: {
								style: {
									fontSize: "14px",
									color: brand.colors.primary,
									letterSpacing: "0.2em",
									textTransform: "uppercase",
									marginBottom: "40px",
									fontFamily: brand.fonts.mono?.family ?? brand.fonts.display.family,
								},
								children: identity.name,
							},
						},
				{
					type: "div",
					props: {
						style: {
							fontSize: "48px",
							fontWeight: 700,
							lineHeight: 1.1,
							maxWidth: "800px",
						},
						children: title,
					},
				},
				subtitle
					? {
							type: "div",
							props: {
								style: {
									fontSize: "20px",
									color: `${brand.colors.text}99`,
									marginTop: "16px",
									maxWidth: "600px",
								},
								children: subtitle,
							},
						}
					: null,
				{
					type: "div",
					props: {
						style: {
							position: "absolute",
							bottom: "60px",
							right: "80px",
							fontSize: "14px",
							color: brand.colors.primary,
							fontFamily: brand.fonts.mono?.family ?? brand.fonts.display.family,
						},
						children: identity.slug,
					},
				},
			].filter(Boolean),
		},
	};
}

export interface BadgeOGOptions {
	attendeeName: string;
	badgeNumber: number;
	role: string;
	identity: EventIdentity;
	width?: number;
	height?: number;
}

export function buildBadgeOGElement(options: BadgeOGOptions) {
	const { attendeeName, badgeNumber, role, identity, width = 1200, height = 630 } = options;
	const { brand } = identity;

	return {
		type: "div",
		props: {
			style: {
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: `${width}px`,
				height: `${height}px`,
				backgroundColor: brand.colors.background,
				color: brand.colors.text,
				fontFamily: brand.fonts.display.family,
				textAlign: "center",
			},
			children: [
				{
					type: "div",
					props: {
						style: {
							fontSize: "14px",
							color: brand.colors.primary,
							letterSpacing: "0.3em",
							textTransform: "uppercase",
							marginBottom: "24px",
							fontFamily: brand.fonts.mono?.family ?? brand.fonts.display.family,
						},
						children: `#${String(badgeNumber).padStart(3, "0")}`,
					},
				},
				{
					type: "div",
					props: {
						style: {
							fontSize: "56px",
							fontWeight: 700,
							textTransform: "uppercase",
							letterSpacing: "0.05em",
						},
						children: attendeeName,
					},
				},
				{
					type: "div",
					props: {
						style: {
							fontSize: "18px",
							color: brand.colors.primary,
							textTransform: "uppercase",
							letterSpacing: "0.1em",
							marginTop: "12px",
						},
						children: role,
					},
				},
				{
					type: "div",
					props: {
						style: {
							position: "absolute",
							bottom: "40px",
							fontSize: "14px",
							color: `${brand.colors.text}66`,
							fontFamily: brand.fonts.mono?.family ?? brand.fonts.display.family,
						},
						children: identity.name,
					},
				},
			],
		},
	};
}
