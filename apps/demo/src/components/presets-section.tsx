"use client";

import type { ThemeStyles } from "@/lib/theme-styles";
import { FLAG_PRESETS, STYLE_PRESETS } from "@event-sdk/badge-3d";

interface PresetsSectionProps {
	accent: string;
	themeStyles: ThemeStyles;
}

export function PresetsSection({ accent, themeStyles }: PresetsSectionProps) {
	return (
		<section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
			<div style={{ marginBottom: 40, textAlign: "center" }}>
				<div style={{ ...themeStyles.label, color: accent, marginBottom: 8 }}>
					{themeStyles.cursorBlink && (
						<span className="blink" style={{ marginRight: 4 }}>
							{">_"}
						</span>
					)}
					PRESETS
				</div>
				<h2 style={{ ...themeStyles.heading, fontSize: "clamp(24px, 4vw, 40px)", margin: 0 }}>
					{FLAG_PRESETS.length} flags + {STYLE_PRESETS.length} styles
				</h2>
				<p style={{ color: "#777", fontSize: 14, marginTop: 8 }}>
					Ready to use particle configurations.
				</p>
			</div>

			<div style={{ marginBottom: 48 }}>
				<h3 style={{ ...themeStyles.label, color: accent, marginBottom: 16 }}>
					FLAGS ({FLAG_PRESETS.length})
				</h3>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
						gap: 10,
					}}
				>
					{FLAG_PRESETS.map((p) => (
						<div
							key={p.id}
							style={{
								padding: "12px 14px",
								...themeStyles.card,
								cursor: "default",
								position: "relative",
							}}
							className={themeStyles.scanlines ? "scanlines" : undefined}
						>
							<div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
								<span style={{ fontSize: 16 }}>{p.emoji}</span>
								<span style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</span>
							</div>
							<div style={{ display: "flex", gap: 3 }}>
								{p.config.groups.map((g) => (
									<div
										key={g.color}
										style={{
											flex: 1,
											height: 6,
											borderRadius: themeStyles.card.borderRadius === 0 ? 0 : 3,
											background: g.color,
										}}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<div>
				<h3 style={{ ...themeStyles.label, color: accent, marginBottom: 16 }}>
					STYLES ({STYLE_PRESETS.length})
				</h3>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
						gap: 10,
					}}
				>
					{STYLE_PRESETS.map((p) => (
						<div
							key={p.id}
							style={{
								padding: "12px 14px",
								...themeStyles.card,
								cursor: "default",
								position: "relative",
							}}
							className={themeStyles.scanlines ? "scanlines" : undefined}
						>
							<div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>{p.name}</div>
							<div style={{ display: "flex", gap: 3 }}>
								{p.config.groups.map((g) => (
									<div
										key={g.color}
										style={{
											width: 16,
											height: 16,
											borderRadius: themeStyles.card.borderRadius === 0 ? 0 : 4,
											background: g.color,
											boxShadow: g.emissiveIntensity > 0.5 ? `0 0 8px ${g.emissive}` : "none",
										}}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
