"use client";

import { AnimatedGroup } from "@/components/motion/animated-group";
import { event } from "@/lib/event";
import { useThemeStyle } from "@/lib/themes";

export function Tracks() {
	const { styleId } = useThemeStyle();
	const isRetro = styleId === "retro";
	const isBrutal = styleId === "brutal";

	const hackathon = event.features.hackathon;
	if (!hackathon?.enabled || !hackathon.tracks) return null;

	const cardClass = isBrutal
		? "brutalist-card bg-[var(--surface)] p-6 transition-all duration-300"
		: isRetro
			? "pixel-border-sm bg-[var(--surface)] p-6 transition-all duration-300 hover:scanlines"
			: "border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:border-[var(--accent)]/20 active:scale-[0.98]";

	return (
		<section className="py-20 px-6" id="tracks">
			<div className="mx-auto max-w-6xl">
				<div className="text-center mb-12">
					<p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-2">
						Hackathon
					</p>
					<h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold">
						<span className="text-[var(--accent)]">Tracks</span>
					</h2>
				</div>
				<AnimatedGroup
					preset="blur-slide"
					triggerOnView
					className="grid grid-cols-1 sm:grid-cols-2 gap-4"
				>
					{hackathon.tracks.map((track: NonNullable<NonNullable<typeof event.features.hackathon>["tracks"]>[number]) => (
						<div
							key={track.slug}
							className={cardClass}
							style={{ borderRadius: "var(--radius)" }}
						>
							<div className="mb-3 flex items-center gap-2">
								<div className="h-3 w-3 rounded-full shrink-0" style={{ background: track.color }} />
								<h3 className="font-medium">{track.name}</h3>
							</div>
							{track.description && (
								<p className="text-sm text-[var(--muted)]">{track.description}</p>
							)}
						</div>
					))}
				</AnimatedGroup>
			</div>
		</section>
	);
}
