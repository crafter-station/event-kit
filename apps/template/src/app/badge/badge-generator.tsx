"use client";

import { event } from "@/lib/event";
import { useState } from "react";

const PARTICLE_PRESETS = [
	{ name: "Default", colors: [event.brand.colors.primary, event.brand.colors.secondary] },
	{ name: "Fire", colors: ["#FF4500", "#FFD700"] },
	{ name: "Ocean", colors: ["#0077B6", "#00B4D8"] },
	{ name: "Neon", colors: ["#FF00FF", "#00FFFF"] },
	{ name: "Forest", colors: ["#2D6A4F", "#95D5B2"] },
	{ name: "Sunset", colors: ["#FF6B35", "#F7C59F"] },
];

export function BadgeGenerator() {
	const [name, setName] = useState("");
	const [role, setRole] = useState("attendee");
	const [organization, setOrganization] = useState("");
	const [selectedPreset, setSelectedPreset] = useState(0);
	const [generated, setGenerated] = useState(false);

	const handleGenerate = () => {
		if (!name.trim()) return;
		setGenerated(true);
	};

	return (
		<div className="space-y-8">
			{!generated ? (
				<div className="space-y-4">
					<div>
						<label
							htmlFor="badge-name"
							className="block text-xs font-mono text-[var(--muted)] mb-1.5"
						>
							Full Name
						</label>
						<input
							id="badge-name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Your name"
							className="w-full rounded-lg border border-white/10 bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-white/20 focus:border-[var(--accent)]/50 focus:outline-none transition-colors"
						/>
					</div>
					<div>
						<label
							htmlFor="badge-role"
							className="block text-xs font-mono text-[var(--muted)] mb-1.5"
						>
							Role
						</label>
						<select
							id="badge-role"
							value={role}
							onChange={(e) => setRole(e.target.value)}
							className="w-full rounded-lg border border-white/10 bg-[var(--surface)] px-4 py-2.5 text-sm focus:border-[var(--accent)]/50 focus:outline-none transition-colors"
						>
							{event.roles.map((r: { id: string; displayName: string }) => (
								<option key={r.id} value={r.id}>
									{r.displayName}
								</option>
							))}
						</select>
					</div>
					<div>
						<label
							htmlFor="badge-org"
							className="block text-xs font-mono text-[var(--muted)] mb-1.5"
						>
							Organization
						</label>
						<input
							id="badge-org"
							type="text"
							value={organization}
							onChange={(e) => setOrganization(e.target.value)}
							placeholder="Company or school"
							className="w-full rounded-lg border border-white/10 bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-white/20 focus:border-[var(--accent)]/50 focus:outline-none transition-colors"
						/>
					</div>
					<div>
						<p className="text-xs font-mono text-[var(--muted)] mb-2">Particle Style</p>
						<div className="grid grid-cols-3 gap-2">
							{PARTICLE_PRESETS.map((preset, i) => (
								<button
									key={preset.name}
									type="button"
									onClick={() => setSelectedPreset(i)}
									className={`rounded-lg border p-3 text-center text-xs transition-colors ${
										selectedPreset === i
											? "border-[var(--accent)]/50 bg-[var(--accent)]/5"
											: "border-white/5 bg-[var(--surface)] hover:border-white/10"
									}`}
								>
									<div className="flex gap-1 justify-center mb-1.5">
										{preset.colors.map((c) => (
											<div key={c} className="h-3 w-3 rounded-full" style={{ background: c }} />
										))}
									</div>
									<span>{preset.name}</span>
								</button>
							))}
						</div>
					</div>
					<button
						type="button"
						onClick={handleGenerate}
						disabled={!name.trim()}
						className="w-full rounded-lg bg-[var(--accent)] py-3 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
					>
						Generate Badge
					</button>
				</div>
			) : (
				<div className="space-y-6">
					<div className="rounded-xl border border-white/5 bg-[var(--surface)] p-8 text-center">
						<div className="mx-auto mb-6 aspect-[3/4] w-64 rounded-lg border border-white/10 bg-[var(--background)] flex flex-col items-center justify-center gap-3 p-6">
							<div className="flex gap-1">
								{PARTICLE_PRESETS[selectedPreset].colors.map((c) => (
									<div key={c} className="h-2 w-8 rounded-full" style={{ background: c }} />
								))}
							</div>
							<p className="font-mono text-[10px] text-[var(--accent)] tracking-widest uppercase">
								{event.name}
							</p>
							<p className="text-lg font-bold">{name}</p>
							<p className="text-xs text-[var(--muted)]">
								{event.roles.find((r: { id: string; displayName: string }) => r.id === role)?.displayName}
							</p>
							{organization && <p className="text-xs text-[var(--muted)]">{organization}</p>}
							<p className="font-mono text-xs text-[var(--accent)]">#001</p>
						</div>
						<p className="text-xs text-[var(--muted)]">
							3D badge preview with particle physics coming soon
						</p>
					</div>
					<div className="flex gap-3">
						<button
							type="button"
							onClick={() => setGenerated(false)}
							className="flex-1 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-[var(--muted)] hover:text-white transition-colors"
						>
							Customize
						</button>
						<button
							type="button"
							className="flex-1 rounded-lg bg-[var(--accent)] py-2.5 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90"
						>
							Download
						</button>
					</div>
					<div className="flex items-center justify-center gap-4 text-xs text-[var(--muted)]">
						<span>Share on</span>
						<button type="button" className="hover:text-white transition-colors">
							Twitter
						</button>
						<button type="button" className="hover:text-white transition-colors">
							LinkedIn
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
