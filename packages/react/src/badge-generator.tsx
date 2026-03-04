"use client";

import type { ParticleConfig } from "@event-sdk/badge-3d";
import { defaultParticleConfig } from "@event-sdk/badge-3d";
import { pickAccentColor } from "@event-sdk/core";
import { type ReactNode, useCallback, useState } from "react";
import { useEventKit } from "./context";
import { ParticleInput } from "./particle-input";

export interface BadgeGeneratorProps {
	onSubmit: (data: BadgeFormData) => void | Promise<void>;
	onGenerateParticles?: (prompt: string) => Promise<ParticleConfig>;
	renderPreview?: (data: BadgeFormData & { particleConfig: ParticleConfig }) => ReactNode;
	renderActions?: (data: BadgeFormData & { particleConfig: ParticleConfig }) => ReactNode;
	defaultRole?: string;
	showOrganization?: boolean;
	showParticleInput?: boolean;
	isMobile?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

export interface BadgeFormData {
	name: string;
	role: string;
	organization?: string;
	email?: string;
}

type Step = "form" | "customize" | "done";

export function BadgeGenerator({
	onSubmit,
	onGenerateParticles,
	renderPreview,
	renderActions,
	defaultRole,
	showOrganization = true,
	showParticleInput = true,
	isMobile,
	className,
	style,
}: BadgeGeneratorProps) {
	const identity = useEventKit();
	const [step, setStep] = useState<Step>("form");
	const [name, setName] = useState("");
	const [role, setRole] = useState(defaultRole ?? identity.roles[0]?.id ?? "attendee");
	const [organization, setOrganization] = useState("");
	const [email, setEmail] = useState("");
	const [particleConfig, setParticleConfig] = useState<ParticleConfig>(defaultParticleConfig);
	const [loading, setLoading] = useState(false);
	const [particleLoading, setParticleLoading] = useState(false);

	const accentColor = pickAccentColor(particleConfig.groups.map((g) => g.color));

	const handleFormSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			if (!name.trim()) return;
			setLoading(true);
			try {
				await onSubmit({
					name,
					role,
					organization: organization || undefined,
					email: email || undefined,
				});
				setStep("customize");
			} finally {
				setLoading(false);
			}
		},
		[name, role, organization, email, onSubmit],
	);

	const handleGenerateParticles = useCallback(
		async (prompt: string) => {
			if (!onGenerateParticles) return;
			setParticleLoading(true);
			try {
				const config = await onGenerateParticles(prompt);
				setParticleConfig(config);
			} finally {
				setParticleLoading(false);
			}
		},
		[onGenerateParticles],
	);

	if (step === "form") {
		return (
			<form
				onSubmit={handleFormSubmit}
				className={className}
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 16,
					maxWidth: 400,
					...style,
				}}
			>
				<input
					type="text"
					placeholder="Your name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					style={{
						padding: "10px 14px",
						background: "rgba(255,255,255,0.06)",
						border: "1px solid rgba(255,255,255,0.12)",
						borderRadius: 8,
						color: "#fff",
						fontSize: 14,
						outline: "none",
					}}
				/>

				{identity.roles.length > 1 && (
					<select
						value={role}
						onChange={(e) => setRole(e.target.value)}
						style={{
							padding: "10px 14px",
							background: "rgba(255,255,255,0.06)",
							border: "1px solid rgba(255,255,255,0.12)",
							borderRadius: 8,
							color: "#fff",
							fontSize: 14,
							outline: "none",
						}}
					>
						{identity.roles.map((r) => (
							<option key={r.id} value={r.id}>
								{r.displayName}
							</option>
						))}
					</select>
				)}

				{showOrganization && (
					<input
						type="text"
						placeholder="Organization (optional)"
						value={organization}
						onChange={(e) => setOrganization(e.target.value)}
						maxLength={40}
						style={{
							padding: "10px 14px",
							background: "rgba(255,255,255,0.06)",
							border: "1px solid rgba(255,255,255,0.12)",
							borderRadius: 8,
							color: "#fff",
							fontSize: 14,
							outline: "none",
						}}
					/>
				)}

				<input
					type="email"
					placeholder="Email (optional)"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					style={{
						padding: "10px 14px",
						background: "rgba(255,255,255,0.06)",
						border: "1px solid rgba(255,255,255,0.12)",
						borderRadius: 8,
						color: "#fff",
						fontSize: 14,
						outline: "none",
					}}
				/>

				<button
					type="submit"
					disabled={!name.trim() || loading}
					style={{
						padding: "12px 24px",
						background: accentColor,
						border: "none",
						borderRadius: 8,
						color: "#000",
						fontSize: 14,
						fontWeight: 600,
						cursor: loading ? "wait" : "pointer",
						opacity: !name.trim() || loading ? 0.5 : 1,
					}}
				>
					{loading ? "Creating..." : "Create Badge"}
				</button>
			</form>
		);
	}

	return (
		<div
			className={className}
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 16,
				...style,
			}}
		>
			{renderPreview?.({
				name,
				role,
				organization: organization || undefined,
				email: email || undefined,
				particleConfig,
			})}

			{showParticleInput && (
				<ParticleInput
					onGenerate={handleGenerateParticles}
					onPreset={setParticleConfig}
					isLoading={particleLoading}
					isMobile={isMobile}
					accentColor={accentColor}
				/>
			)}

			{renderActions?.({
				name,
				role,
				organization: organization || undefined,
				email: email || undefined,
				particleConfig,
			})}
		</div>
	);
}
