"use client";

import { FLAG_PRESETS, STYLE_PRESETS } from "@crafter/event-kit-badge-3d";

interface PresetsSectionProps {
	accent: string;
}

export function PresetsSection({ accent }: PresetsSectionProps) {
	return (
		<section
			style={{
				padding: "80px 24px",
				maxWidth: 1100,
				margin: "0 auto",
			}}
		>
			<div style={{ marginBottom: 40, textAlign: "center" }}>
				<h2
					style={{
						fontSize: "clamp(24px, 4vw, 40px)",
						fontWeight: 800,
						letterSpacing: "-0.03em",
						margin: 0,
					}}
				>
					Presets
				</h2>
				<p style={{ color: "#777", fontSize: 14, marginTop: 8 }}>
					{FLAG_PRESETS.length} flags + {STYLE_PRESETS.length} styles, ready to use.
				</p>
			</div>

			<div style={{ marginBottom: 48 }}>
				<h3
					style={{
						fontSize: 13,
						color: accent,
						fontWeight: 600,
						letterSpacing: "0.1em",
						marginBottom: 16,
						fontFamily: "monospace",
					}}
				>
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
								background: "rgba(255,255,255,0.03)",
								border: "1px solid rgba(255,255,255,0.06)",
								borderRadius: 10,
								cursor: "default",
							}}
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
											borderRadius: 3,
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
				<h3
					style={{
						fontSize: 13,
						color: accent,
						fontWeight: 600,
						letterSpacing: "0.1em",
						marginBottom: 16,
						fontFamily: "monospace",
					}}
				>
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
								background: "rgba(255,255,255,0.03)",
								border: "1px solid rgba(255,255,255,0.06)",
								borderRadius: 10,
								cursor: "default",
							}}
						>
							<div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>{p.name}</div>
							<div style={{ display: "flex", gap: 3 }}>
								{p.config.groups.map((g) => (
									<div
										key={g.color}
										style={{
											width: 16,
											height: 16,
											borderRadius: 4,
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
