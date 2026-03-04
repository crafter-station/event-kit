"use client";

import { pickAccentColor, pickReadableColor } from "@crafter/event-kit-core";
import { useEventKit } from "./context";

export interface BadgeCardProps {
	name: string;
	role: string;
	organization?: string;
	badgeNumber?: string;
	photoUrl?: string;
	particleColors?: string[];
	className?: string;
	style?: React.CSSProperties;
}

export function BadgeCard({
	name,
	role,
	organization,
	badgeNumber,
	photoUrl,
	particleColors = [],
	className,
	style,
}: BadgeCardProps) {
	const identity = useEventKit();
	const accent = particleColors.length
		? pickAccentColor(particleColors)
		: identity.brand.colors.primary;
	const textColor = particleColors.length
		? pickReadableColor(particleColors)
		: identity.brand.colors.text;
	const bg = identity.brand.colors.background;

	return (
		<div
			className={className}
			style={{
				position: "relative",
				width: 320,
				aspectRatio: "3 / 4",
				background: bg,
				borderRadius: 16,
				overflow: "hidden",
				fontFamily: identity.brand.fonts.body.family,
				...style,
			}}
		>
			<div
				style={{
					position: "absolute",
					inset: 0,
					background: `radial-gradient(ellipse at 50% 30%, ${accent}14 0%, transparent 60%)`,
				}}
			/>

			<div
				style={{
					position: "relative",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-end",
					padding: "24px 28px",
				}}
			>
				{identity.brand.logos.primary && (
					<img
						src={identity.brand.logos.primary}
						alt={identity.name}
						style={{
							position: "absolute",
							top: 20,
							left: 28,
							width: 40,
							height: 40,
							objectFit: "contain",
						}}
					/>
				)}

				<div
					style={{
						position: "absolute",
						top: 24,
						left: 28,
						right: 28,
					}}
				>
					<div
						style={{
							color: accent,
							fontSize: 10,
							fontWeight: 700,
							letterSpacing: "0.15em",
							marginTop: identity.brand.logos.primary ? 48 : 0,
						}}
					>
						{identity.name.toUpperCase()}
					</div>
					{identity.tagline && (
						<div
							style={{
								color: `${textColor}66`,
								fontSize: 11,
								marginTop: 4,
							}}
						>
							{identity.tagline}
						</div>
					)}
				</div>

				{photoUrl && (
					<img
						src={photoUrl}
						alt={name}
						style={{
							width: 72,
							height: 72,
							borderRadius: "50%",
							objectFit: "cover",
							marginBottom: 16,
							border: `2px solid ${accent}33`,
						}}
					/>
				)}

				<div
					style={{
						color: textColor,
						fontSize: 28,
						fontWeight: 700,
						lineHeight: 1.1,
						fontFamily: identity.brand.fonts.display.family,
					}}
				>
					{name.toUpperCase()}
				</div>

				<div
					style={{
						color: accent,
						fontSize: 13,
						fontWeight: 600,
						letterSpacing: "0.08em",
						marginTop: 8,
					}}
				>
					{role.toUpperCase()}
				</div>

				{organization && (
					<div
						style={{
							color: `${textColor}99`,
							fontSize: 12,
							marginTop: 4,
						}}
					>
						{organization}
					</div>
				)}

				{badgeNumber && (
					<div
						style={{
							color: `${textColor}33`,
							fontSize: 10,
							fontFamily: identity.brand.fonts.mono?.family ?? "monospace",
							letterSpacing: "0.15em",
							marginTop: 12,
						}}
					>
						#{badgeNumber}
					</div>
				)}
			</div>
		</div>
	);
}
