"use client";

import { FLAG_PRESETS, STYLE_PRESETS, defaultParticleConfig } from "@crafter/event-kit-badge-3d";
import type { ParticleConfig } from "@crafter/event-kit-badge-3d";
import { pickAccentColor } from "@crafter/event-kit-core";
import {
	BadgeCard,
	BadgeGenerator,
	EventKitProvider,
	ParticleInput,
	ParticlePanel,
	ShareButton,
	WatermarkBanner,
} from "@crafter/event-kit-react";
import { useState } from "react";
import { demoIdentity } from "@/lib/identity";

export default function DemoPage() {
	const [particleConfig, setParticleConfig] = useState<ParticleConfig>(defaultParticleConfig);
	const [activeSection, setActiveSection] = useState<string>("badge-card");
	const accentColor = pickAccentColor(particleConfig.groups.map((g) => g.color));

	const sections = [
		{ id: "badge-card", label: "BadgeCard" },
		{ id: "badge-generator", label: "BadgeGenerator" },
		{ id: "particle-panel", label: "ParticlePanel" },
		{ id: "particle-input", label: "ParticleInput" },
		{ id: "presets", label: "Presets" },
	];

	return (
		<EventKitProvider identity={demoIdentity}>
			<div style={{ minHeight: "100vh", padding: "40px 24px", maxWidth: 1200, margin: "0 auto" }}>
				<header style={{ marginBottom: 48 }}>
					<div
						style={{
							fontSize: 12,
							letterSpacing: "0.2em",
							color: accentColor,
							fontWeight: 600,
							marginBottom: 8,
						}}
					>
						@CRAFTER/EVENT-KIT
					</div>
					<h1
						style={{
							fontSize: 48,
							fontWeight: 800,
							margin: 0,
							lineHeight: 1.1,
							letterSpacing: "-0.03em",
						}}
					>
						Hackathon SDK
					</h1>
					<p style={{ color: "#a0a0a0", fontSize: 16, marginTop: 12, maxWidth: 500 }}>
						Badges, onboarding, and social assets for tech events. Built by Crafter Station.
					</p>
					<div style={{ display: "flex", gap: 8, marginTop: 16 }}>
						<span
							style={{
								padding: "4px 10px",
								background: "rgba(74,222,128,0.1)",
								border: "1px solid rgba(74,222,128,0.2)",
								borderRadius: 999,
								fontSize: 12,
								color: "#4ade80",
							}}
						>
							v0.0.1
						</span>
						<span
							style={{
								padding: "4px 10px",
								background: "rgba(255,255,255,0.05)",
								border: "1px solid rgba(255,255,255,0.1)",
								borderRadius: 999,
								fontSize: 12,
								color: "#a0a0a0",
							}}
						>
							4 packages
						</span>
					</div>
				</header>

				<nav style={{ display: "flex", gap: 4, marginBottom: 32, flexWrap: "wrap" }}>
					{sections.map((s) => (
						<button
							key={s.id}
							type="button"
							onClick={() => setActiveSection(s.id)}
							style={{
								padding: "8px 16px",
								background: activeSection === s.id ? "rgba(255,255,255,0.1)" : "transparent",
								border: `1px solid ${activeSection === s.id ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
								borderRadius: 8,
								color: activeSection === s.id ? "#fff" : "#666",
								cursor: "pointer",
								fontSize: 13,
								fontWeight: 500,
								fontFamily: "monospace",
							}}
						>
							{"<"}
							{s.label}
							{" />"}
						</button>
					))}
				</nav>

				<main>
					{activeSection === "badge-card" && <BadgeCardDemo accentColor={accentColor} />}
					{activeSection === "badge-generator" && <BadgeGeneratorDemo />}
					{activeSection === "particle-panel" && (
						<ParticlePanelDemo config={particleConfig} onChange={setParticleConfig} />
					)}
					{activeSection === "particle-input" && (
						<ParticleInputDemo onPreset={setParticleConfig} accentColor={accentColor} />
					)}
					{activeSection === "presets" && <PresetsDemo />}
				</main>

				<footer style={{ marginTop: 64, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
					<WatermarkBanner />
				</footer>
			</div>
		</EventKitProvider>
	);
}

function BadgeCardDemo({ accentColor }: { accentColor: string }) {
	const roles = ["Hacker", "Speaker", "Mentor", "Sponsor", "Staff"];
	const names = ["Railly Hugo", "Anthony Cueva", "Cris Correa", "Shiara Arauzo"];

	return (
		<section>
			<SectionTitle title="BadgeCard" description="Static 2D badge display, identity-aware" />
			<div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
				{names.map((name, i) => (
					<BadgeCard
						key={name}
						name={name}
						role={roles[i % roles.length]}
						organization="Crafter Station"
						badgeNumber={String(i + 1).padStart(3, "0")}
						particleColors={["#4ade80", "#22c55e"]}
						style={{
							width: 260,
							boxShadow: `0 0 40px ${accentColor}11`,
						}}
					/>
				))}
			</div>
		</section>
	);
}

function BadgeGeneratorDemo() {
	return (
		<section>
			<SectionTitle title="BadgeGenerator" description="Two-step form: register, then customize particles" />
			<BadgeGenerator
				onSubmit={async (data) => {
					console.log("Badge form submitted:", data);
				}}
				onGenerateParticles={async (prompt) => {
					console.log("AI prompt:", prompt);
					return defaultParticleConfig;
				}}
				renderPreview={(data) => (
					<div style={{ padding: 16, background: "rgba(255,255,255,0.03)", borderRadius: 12 }}>
						<BadgeCard
							name={data.name}
							role={data.role}
							organization={data.organization}
							particleColors={data.particleConfig.groups.map((g) => g.color)}
						/>
					</div>
				)}
				renderActions={(data) => (
					<div style={{ display: "flex", gap: 8 }}>
						<ShareButton platform="twitter" text={`My badge for Crafter Conf!`}>
							<span style={{ fontSize: 13 }}>Share on X</span>
						</ShareButton>
						<ShareButton platform="clipboard" url="https://event-kit.crafter.run">
							<span style={{ fontSize: 13 }}>Copy Link</span>
						</ShareButton>
					</div>
				)}
			/>
		</section>
	);
}

function ParticlePanelDemo({
	config,
	onChange,
}: { config: ParticleConfig; onChange: (c: ParticleConfig) => void }) {
	return (
		<section>
			<SectionTitle title="ParticlePanel" description="Full material configurator — colors, shapes, sliders" />
			<div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
				<ParticlePanel config={config} onChange={onChange} />
				<div
					style={{
						flex: 1,
						minWidth: 300,
						padding: 16,
						background: "rgba(255,255,255,0.03)",
						borderRadius: 12,
						fontSize: 12,
						fontFamily: "monospace",
						color: "#a0a0a0",
						whiteSpace: "pre-wrap",
						maxHeight: 500,
						overflow: "auto",
					}}
				>
					{JSON.stringify(config, null, 2)}
				</div>
			</div>
		</section>
	);
}

function ParticleInputDemo({
	onPreset,
	accentColor,
}: { onPreset: (c: ParticleConfig) => void; accentColor: string }) {
	return (
		<section>
			<SectionTitle title="ParticleInput" description="Flag/style preset chips + AI prompt textarea" />
			<div style={{ maxWidth: 500 }}>
				<ParticleInput
					onGenerate={async (prompt) => console.log("Generate:", prompt)}
					onPreset={onPreset}
					accentColor={accentColor}
				/>
			</div>
		</section>
	);
}

function PresetsDemo() {
	return (
		<section>
			<SectionTitle title="Presets" description="Built-in flag and style presets for particle configs" />
			<h3 style={{ fontSize: 14, color: "#666", marginBottom: 12, fontWeight: 500 }}>
				Flag Presets ({FLAG_PRESETS.length})
			</h3>
			<div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
				{FLAG_PRESETS.map((p) => (
					<div
						key={p.id}
						style={{
							padding: "8px 14px",
							background: "rgba(255,255,255,0.04)",
							border: "1px solid rgba(255,255,255,0.08)",
							borderRadius: 8,
							fontSize: 13,
						}}
					>
						<span style={{ marginRight: 6 }}>{p.emoji}</span>
						{p.name}
						<div style={{ display: "flex", gap: 3, marginTop: 6 }}>
							{p.config.groups.map((g) => (
								<div
									key={g.color}
									style={{
										width: 14,
										height: 14,
										borderRadius: 3,
										background: g.color,
									}}
								/>
							))}
						</div>
					</div>
				))}
			</div>

			<h3 style={{ fontSize: 14, color: "#666", marginBottom: 12, fontWeight: 500 }}>
				Style Presets ({STYLE_PRESETS.length})
			</h3>
			<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
				{STYLE_PRESETS.map((p) => (
					<div
						key={p.id}
						style={{
							padding: "8px 14px",
							background: "rgba(255,255,255,0.04)",
							border: "1px solid rgba(255,255,255,0.08)",
							borderRadius: 8,
							fontSize: 13,
						}}
					>
						{p.name}
						<div style={{ display: "flex", gap: 3, marginTop: 6 }}>
							{p.config.groups.map((g) => (
								<div
									key={g.color}
									style={{
										width: 14,
										height: 14,
										borderRadius: 3,
										background: g.color,
										boxShadow:
											g.emissiveIntensity > 0.5
												? `0 0 8px ${g.emissive}`
												: "none",
									}}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

function SectionTitle({ title, description }: { title: string; description: string }) {
	return (
		<div style={{ marginBottom: 24 }}>
			<h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
				{"<"}{title}{" />"}
			</h2>
			<p style={{ color: "#666", fontSize: 14, margin: "4px 0 0" }}>{description}</p>
		</div>
	);
}
