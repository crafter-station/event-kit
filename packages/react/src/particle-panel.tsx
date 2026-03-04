"use client";

import type { ParticleConfig, ParticleGroup } from "@crafter/event-kit-badge-3d";
import { useCallback, useState } from "react";

const DEFAULT_GROUP: ParticleGroup = {
	color: "#ff69b4",
	count: 1800,
	size: 0.012,
	shape: "sphere",
	metalness: 0.95,
	roughness: 0.9,
	emissive: "#000000",
	emissiveIntensity: 0,
	clearcoat: 0.5,
	opacity: 1,
	transmission: 0,
	fluid: false,
};

const SHAPES = ["sphere", "cube", "diamond", "capsule"] as const;

export interface ParticlePanelProps {
	config: ParticleConfig;
	onChange: (config: ParticleConfig) => void;
	isMobile?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

function Slider({
	label,
	value,
	min,
	max,
	step,
	onChange,
}: {
	label: string;
	value: number;
	min: number;
	max: number;
	step: number;
	onChange: (v: number) => void;
}) {
	return (
		<label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
			<span style={{ minWidth: 80 }}>{label}</span>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				style={{ flex: 1 }}
			/>
			<span style={{ minWidth: 40, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
				{value}
			</span>
		</label>
	);
}

export function ParticlePanel({
	config,
	onChange,
	isMobile,
	className,
	style,
}: ParticlePanelProps) {
	const [open, setOpen] = useState(!isMobile);

	const updateGroup = useCallback(
		(index: number, patch: Partial<ParticleGroup>) => {
			const groups = config.groups.map((g, i) => (i === index ? { ...g, ...patch } : g));
			onChange({ groups });
		},
		[config, onChange],
	);

	const addGroup = useCallback(() => {
		if (config.groups.length >= 4) return;
		onChange({ groups: [...config.groups, { ...DEFAULT_GROUP }] });
	}, [config, onChange]);

	const removeGroup = useCallback(
		(index: number) => {
			if (config.groups.length <= 1) return;
			onChange({ groups: config.groups.filter((_, i) => i !== index) });
		},
		[config, onChange],
	);

	const duplicateGroup = useCallback(
		(index: number) => {
			if (config.groups.length >= 4) return;
			const groups = [...config.groups];
			groups.splice(index + 1, 0, { ...config.groups[index] });
			onChange({ groups });
		},
		[config, onChange],
	);

	if (!open) {
		return (
			<button
				type="button"
				onClick={() => setOpen(true)}
				className={className}
				style={{
					padding: "8px 16px",
					background: "rgba(0,0,0,0.6)",
					color: "#fff",
					border: "1px solid rgba(255,255,255,0.15)",
					borderRadius: 8,
					cursor: "pointer",
					fontSize: 13,
					...style,
				}}
			>
				Customize Particles
			</button>
		);
	}

	return (
		<div
			className={className}
			style={{
				background: "rgba(0,0,0,0.75)",
				backdropFilter: "blur(12px)",
				border: "1px solid rgba(255,255,255,0.1)",
				borderRadius: 12,
				padding: 16,
				color: "#fff",
				fontSize: 13,
				maxWidth: 320,
				maxHeight: isMobile ? "50vh" : "70vh",
				overflowY: "auto",
				...style,
			}}
		>
			<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
				<span style={{ fontWeight: 600, fontSize: 14 }}>Particles</span>
				<button
					type="button"
					onClick={() => setOpen(false)}
					style={{
						background: "none",
						border: "none",
						color: "#fff",
						cursor: "pointer",
						fontSize: 16,
					}}
				>
					×
				</button>
			</div>

			{config.groups.map((group, index) => (
				<div
					key={`${group.color}-${group.shape}-${group.count}`}
					style={{
						marginBottom: 12,
						padding: 10,
						background: "rgba(255,255,255,0.05)",
						borderRadius: 8,
						borderLeft: `3px solid ${group.color}`,
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: 8,
						}}
					>
						<span style={{ fontSize: 12, fontWeight: 500 }}>Group {index + 1}</span>
						<div style={{ display: "flex", gap: 4 }}>
							{config.groups.length < 4 && (
								<button
									type="button"
									onClick={() => duplicateGroup(index)}
									style={{
										background: "none",
										border: "none",
										color: "rgba(255,255,255,0.5)",
										cursor: "pointer",
										fontSize: 11,
									}}
								>
									Dup
								</button>
							)}
							{config.groups.length > 1 && (
								<button
									type="button"
									onClick={() => removeGroup(index)}
									style={{
										background: "none",
										border: "none",
										color: "rgba(255,100,100,0.7)",
										cursor: "pointer",
										fontSize: 11,
									}}
								>
									Del
								</button>
							)}
						</div>
					</div>

					<div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
						<input
							type="color"
							value={group.color}
							onChange={(e) => updateGroup(index, { color: e.target.value })}
							style={{ width: 32, height: 24, padding: 0, border: "none", cursor: "pointer" }}
						/>
						<select
							value={group.shape}
							onChange={(e) =>
								updateGroup(index, { shape: e.target.value as ParticleGroup["shape"] })
							}
							style={{
								flex: 1,
								background: "rgba(0,0,0,0.4)",
								color: "#fff",
								border: "1px solid rgba(255,255,255,0.15)",
								borderRadius: 4,
								padding: "2px 4px",
								fontSize: 12,
							}}
						>
							{SHAPES.map((s) => (
								<option key={s} value={s}>
									{s}
								</option>
							))}
						</select>
					</div>

					<Slider
						label="Count"
						value={group.count}
						min={10}
						max={2500}
						step={10}
						onChange={(v) => updateGroup(index, { count: v })}
					/>
					<Slider
						label="Size"
						value={group.size}
						min={0.008}
						max={0.04}
						step={0.001}
						onChange={(v) => updateGroup(index, { size: v })}
					/>
					<Slider
						label="Metalness"
						value={group.metalness}
						min={0}
						max={1}
						step={0.05}
						onChange={(v) => updateGroup(index, { metalness: v })}
					/>
					<Slider
						label="Roughness"
						value={group.roughness}
						min={0}
						max={1}
						step={0.05}
						onChange={(v) => updateGroup(index, { roughness: v })}
					/>
					<Slider
						label="Clearcoat"
						value={group.clearcoat}
						min={0}
						max={1}
						step={0.05}
						onChange={(v) => updateGroup(index, { clearcoat: v })}
					/>
					<Slider
						label="Opacity"
						value={group.opacity}
						min={0.15}
						max={1}
						step={0.05}
						onChange={(v) => updateGroup(index, { opacity: v })}
					/>
					<Slider
						label="Emissive"
						value={group.emissiveIntensity}
						min={0}
						max={3}
						step={0.1}
						onChange={(v) => updateGroup(index, { emissiveIntensity: v })}
					/>
					<Slider
						label="Transmit"
						value={group.transmission}
						min={0}
						max={1}
						step={0.05}
						onChange={(v) => updateGroup(index, { transmission: v })}
					/>

					<div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
						<input
							type="color"
							value={group.emissive}
							onChange={(e) => updateGroup(index, { emissive: e.target.value })}
							style={{ width: 24, height: 18, padding: 0, border: "none", cursor: "pointer" }}
						/>
						<span style={{ fontSize: 11, opacity: 0.6 }}>Emissive color</span>
						<label
							style={{
								marginLeft: "auto",
								display: "flex",
								alignItems: "center",
								gap: 4,
								fontSize: 11,
							}}
						>
							<input
								type="checkbox"
								checked={group.fluid}
								onChange={(e) => updateGroup(index, { fluid: e.target.checked })}
							/>
							Fluid
						</label>
					</div>
				</div>
			))}

			{config.groups.length < 4 && (
				<button
					type="button"
					onClick={addGroup}
					style={{
						width: "100%",
						padding: "6px 0",
						background: "rgba(255,255,255,0.08)",
						border: "1px dashed rgba(255,255,255,0.2)",
						borderRadius: 6,
						color: "rgba(255,255,255,0.5)",
						cursor: "pointer",
						fontSize: 12,
					}}
				>
					+ Add Group
				</button>
			)}
		</div>
	);
}
