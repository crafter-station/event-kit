"use client";

import { TEAM } from "@/lib/identity";
import type { ThemeStyles } from "@/lib/theme-styles";
import { generateCardTexture } from "@event-sdk/badge-3d";
import { defaultParticleConfig } from "@event-sdk/badge-3d";
import { Badge3DScene, BadgeCard } from "@event-sdk/react";
import { useEffect, useState } from "react";

interface HeroSectionProps {
	accent: string;
	secondary: string;
	background: string;
	roles: { id: string; displayName: string }[];
	themeStyles: ThemeStyles;
	eventName: string;
	tagline?: string;
	fontDisplay: string;
}

export function HeroSection({
	accent,
	secondary,
	background,
	roles,
	themeStyles,
	eventName,
	tagline,
	fontDisplay,
}: HeroSectionProps) {
	const [selectedMember, setSelectedMember] = useState(0);
	const member = TEAM[selectedMember];
	const [textureUrl, setTextureUrl] = useState<string | undefined>(undefined);
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		if (typeof document === "undefined") return;
		let cancelled = false;
		generateCardTexture({
			width: 1024,
			height: 1024,
			eventName,
			eventTagline: tagline,
			name: member.name,
			role: roles[member.role % roles.length]?.displayName ?? "Attendee",
			organization: "Crafter Station",
			badgeNumber: String(selectedMember + 1).padStart(3, "0"),
			particleColors: [accent, secondary],
			backgroundColor: background,
			fontFamily: fontDisplay,
		}).then((url) => {
			if (!cancelled) setTextureUrl(url);
		});
		return () => {
			cancelled = true;
		};
	}, [
		member.name,
		member.role,
		selectedMember,
		accent,
		secondary,
		background,
		roles,
		eventName,
		tagline,
		fontDisplay,
	]);

	return (
		<section
			style={{
				minHeight: "100dvh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				position: "relative",
				padding: "80px 24px 40px",
			}}
		>
			{themeStyles.bgPattern && (
				<div
					style={{
						position: "absolute",
						inset: 0,
						backgroundImage: themeStyles.bgPattern,
						backgroundSize: themeStyles.scanlines ? "6px 6px" : "64px 64px",
						pointerEvents: "none",
					}}
				/>
			)}

			<div
				style={{
					position: "absolute",
					inset: 0,
					background: `radial-gradient(ellipse at 50% 40%, ${accent}08 0%, transparent 70%)`,
					pointerEvents: "none",
				}}
			/>

			<div style={{ position: "relative", textAlign: "center", marginBottom: 24 }}>
				<div className="fade-in" style={{ ...themeStyles.label, color: accent, marginBottom: 12 }}>
					{themeStyles.cursorBlink && (
						<span className="blink" style={{ marginRight: 4 }}>
							{">_"}
						</span>
					)}
					@CRAFTER/EVENT-KIT
				</div>
				<h1
					className="fade-in fade-in-1"
					style={{
						...themeStyles.heading,
						fontSize: "clamp(28px, 5vw, 56px)",
						lineHeight: 1,
						margin: 0,
					}}
				>
					{eventName}
				</h1>
				{tagline && (
					<p className="fade-in fade-in-2" style={{ color: "#777", fontSize: 14, marginTop: 8 }}>
						{tagline}
					</p>
				)}
			</div>

			{mounted && (
				<div
					className="fade-in fade-in-2"
					style={{
						width: "100%",
						maxWidth: 500,
						height: "min(55vh, 500px)",
						position: "relative",
					}}
				>
					<Badge3DScene
						cardTextureUrl={textureUrl}
						particleConfig={defaultParticleConfig}
						style={{ width: "100%", height: "100%" }}
					/>
				</div>
			)}

			<div
				className="fade-in fade-in-3"
				style={{
					display: "flex",
					gap: 12,
					marginTop: 16,
					overflowX: "auto",
					padding: "4px 0",
					scrollbarWidth: "none",
				}}
			>
				{TEAM.map((t, i) => {
					const scale = 0.44;
					const cardW = 320;
					const cardH = cardW * (4 / 3);
					return (
						<button
							key={t.name}
							type="button"
							onClick={() => setSelectedMember(i)}
							style={{
								flexShrink: 0,
								cursor: "pointer",
								border: "none",
								background: "none",
								padding: 0,
								width: cardW * scale,
								height: cardH * scale,
								opacity: selectedMember === i ? 1 : 0.5,
								transition: "opacity 0.3s ease, transform 0.3s ease",
								transform: selectedMember === i ? "scale(1)" : "scale(0.92)",
							}}
						>
							<BadgeCard
								name={t.name}
								role={roles[t.role % roles.length]?.displayName ?? "Attendee"}
								organization="Crafter Station"
								badgeNumber={String(i + 1).padStart(3, "0")}
								photoUrl={t.photo}
								particleColors={[accent, secondary]}
								style={{
									width: cardW,
									transformOrigin: "top left",
									transform: `scale(${scale})`,
									...themeStyles.card,
									boxShadow:
										selectedMember === i
											? `0 0 20px ${accent}20`
											: (themeStyles.card.boxShadow ?? "none"),
								}}
							/>
						</button>
					);
				})}
			</div>

			<div className="fade-in fade-in-4" style={{ display: "flex", gap: 8, marginTop: 24 }}>
				<span
					style={{
						padding: "4px 12px",
						background: `${accent}15`,
						border: `1px solid ${accent}30`,
						borderRadius: themeStyles.card.borderRadius ?? 999,
						fontSize: 12,
						color: accent,
					}}
				>
					v0.0.1
				</span>
				<span
					style={{
						padding: "4px 12px",
						background: "rgba(255,255,255,0.04)",
						border: "1px solid rgba(255,255,255,0.08)",
						borderRadius: themeStyles.card.borderRadius ?? 999,
						fontSize: 12,
						color: "#888",
					}}
				>
					4 packages
				</span>
			</div>
		</section>
	);
}
