"use client";

import type { ParticleConfig } from "@crafter/event-kit-badge-3d";
import { defaultParticleConfig } from "@crafter/event-kit-badge-3d";
import { pickAccentColor } from "@crafter/event-kit-core";
import { BadgeCard, BadgeGenerator, ShareButton } from "@crafter/event-kit-react";
import { useState } from "react";

interface TryItSectionProps {
	accent: string;
}

export function TryItSection({ accent }: TryItSectionProps) {
	const [particleConfig, setParticleConfig] = useState<ParticleConfig>(defaultParticleConfig);
	const currentAccent = pickAccentColor(particleConfig.groups.map((g) => g.color));

	return (
		<section
			style={{
				minHeight: "100vh",
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
					Try it
				</h2>
				<p style={{ color: "#777", fontSize: 14, marginTop: 8 }}>
					Create your badge. Choose particles. Share it.
				</p>
			</div>

			<BadgeGenerator
				onSubmit={async (data) => {
					console.log("Badge form submitted:", data);
				}}
				onGenerateParticles={async (prompt) => {
					console.log("AI prompt:", prompt);
					return defaultParticleConfig;
				}}
				renderPreview={(data) => (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							padding: 24,
							background: "rgba(255,255,255,0.02)",
							borderRadius: 16,
							border: "1px solid rgba(255,255,255,0.06)",
						}}
					>
						<BadgeCard
							name={data.name}
							role={data.role}
							organization={data.organization}
							particleColors={data.particleConfig.groups.map((g) => g.color)}
							style={{
								width: 300,
								boxShadow: `0 0 40px ${currentAccent}10`,
							}}
						/>
					</div>
				)}
				renderActions={(data) => (
					<div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
						<ShareButton platform="twitter" text="My badge for the hackathon!">
							<span
								style={{
									display: "inline-flex",
									padding: "8px 16px",
									background: "rgba(255,255,255,0.06)",
									border: "1px solid rgba(255,255,255,0.1)",
									borderRadius: 8,
									fontSize: 13,
									color: "#fff",
									cursor: "pointer",
								}}
							>
								Share on X
							</span>
						</ShareButton>
						<ShareButton platform="clipboard" url="https://event-kit.crafter.run">
							<span
								style={{
									display: "inline-flex",
									padding: "8px 16px",
									background: "rgba(255,255,255,0.06)",
									border: "1px solid rgba(255,255,255,0.1)",
									borderRadius: 8,
									fontSize: 13,
									color: "#fff",
									cursor: "pointer",
								}}
							>
								Copy Link
							</span>
						</ShareButton>
					</div>
				)}
				style={{ maxWidth: 500, margin: "0 auto" }}
			/>
		</section>
	);
}
