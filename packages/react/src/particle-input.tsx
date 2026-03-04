"use client";

import type { ParticleConfig } from "@crafter/event-kit-badge-3d";
import { FLAG_PRESETS, STYLE_PRESETS, capConfigForMobile } from "@crafter/event-kit-badge-3d";
import { type KeyboardEvent, useCallback, useState } from "react";

export interface ParticleInputProps {
	onGenerate: (prompt: string) => Promise<void>;
	onPreset: (config: ParticleConfig) => void;
	isLoading?: boolean;
	isMobile?: boolean;
	accentColor?: string;
	className?: string;
	style?: React.CSSProperties;
}

function ChipRow({
	items,
	onSelect,
	isMobile,
}: {
	items: { label: string; emoji?: string; config: ParticleConfig }[];
	onSelect: (config: ParticleConfig) => void;
	isMobile?: boolean;
}) {
	return (
		<div
			style={{
				display: "flex",
				gap: 6,
				overflowX: "auto",
				paddingBottom: 4,
				scrollbarWidth: "none",
			}}
		>
			{items.map((item) => (
				<button
					key={item.label}
					type="button"
					onClick={() => {
						const cfg = isMobile ? capConfigForMobile(item.config) : item.config;
						onSelect(cfg);
					}}
					style={{
						flexShrink: 0,
						padding: "4px 10px",
						background: "rgba(255,255,255,0.08)",
						border: "1px solid rgba(255,255,255,0.12)",
						borderRadius: 999,
						color: "#fff",
						fontSize: 12,
						cursor: "pointer",
						whiteSpace: "nowrap",
					}}
				>
					{item.emoji ? `${item.emoji} ` : ""}
					{item.label}
				</button>
			))}
		</div>
	);
}

export function ParticleInput({
	onGenerate,
	onPreset,
	isLoading,
	isMobile,
	accentColor = "#4ade80",
	className,
	style,
}: ParticleInputProps) {
	const [prompt, setPrompt] = useState("");

	const handleSubmit = useCallback(async () => {
		const trimmed = prompt.trim();
		if (!trimmed || isLoading) return;
		await onGenerate(trimmed);
		setPrompt("");
	}, [prompt, isLoading, onGenerate]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLTextAreaElement>) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				handleSubmit();
			}
		},
		[handleSubmit],
	);

	const flagItems = FLAG_PRESETS.map((p) => ({
		label: p.name,
		emoji: p.emoji,
		config: p.config,
	}));

	const styleItems = STYLE_PRESETS.map((p) => ({
		label: p.name,
		config: p.config,
	}));

	return (
		<div
			className={className}
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 8,
				...style,
			}}
		>
			<ChipRow items={flagItems} onSelect={onPreset} isMobile={isMobile} />
			<ChipRow items={styleItems} onSelect={onPreset} isMobile={isMobile} />

			<div style={{ position: "relative" }}>
				<textarea
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Describe your particle style..."
					rows={2}
					disabled={isLoading}
					style={{
						width: "100%",
						padding: "8px 12px",
						background: "rgba(0,0,0,0.4)",
						border: `1px solid ${isLoading ? accentColor : "rgba(255,255,255,0.15)"}`,
						borderRadius: 8,
						color: "#fff",
						fontSize: 13,
						resize: "none",
						outline: "none",
						fontFamily: "inherit",
						opacity: isLoading ? 0.5 : 1,
					}}
				/>
				{isLoading && (
					<div
						style={{
							position: "absolute",
							inset: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							borderRadius: 8,
							background: "rgba(0,0,0,0.3)",
						}}
					>
						<div
							style={{
								width: 20,
								height: 20,
								border: `2px solid ${accentColor}`,
								borderTopColor: "transparent",
								borderRadius: "50%",
								animation: "spin 0.8s linear infinite",
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
