"use client";

import { AnimatedGroup } from "@/components/motion/animated-group";
import { event } from "@/lib/event";
import { useThemeStyle } from "@/lib/themes";

const PLACEHOLDER_SPEAKERS = [
	{ name: "Jane Doe", title: "ML Engineer", company: "TechCorp", talk: "Building RAG at Scale" },
	{ name: "Carlos Ruiz", title: "CTO", company: "StartupAI", talk: "AI-First Architecture" },
	{ name: "Maria Chen", title: "Research Lead", company: "DeepLab", talk: "LLMs in Production" },
];

function Avatar({ name, photo }: { name: string; photo?: string }) {
	if (photo) {
		return <img src={photo} alt={name} className="h-20 w-20 rounded-full object-cover" />;
	}
	return (
		<div className="h-20 w-20 rounded-full bg-[var(--border)] flex items-center justify-center">
			<span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--accent)]">
				{name.charAt(0)}
			</span>
		</div>
	);
}

export function Speakers() {
	const { styleId } = useThemeStyle();
	const isRetro = styleId === "retro";
	const isBrutal = styleId === "brutal";

	if (!event.features.speakers?.enabled) return null;

	const cardClass = isBrutal
		? "brutalist-card bg-[var(--surface)] p-6 transition-all duration-300"
		: isRetro
			? "pixel-border-sm bg-[var(--surface)] p-6 transition-all duration-300 hover:scanlines"
			: "border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:scale-[1.02] hover:border-[var(--accent)]/20";

	return (
		<section className="py-20 px-6" id="speakers">
			<div className="mx-auto max-w-6xl">
				<div className="text-center mb-12">
					<p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-2">
						Speakers
					</p>
					<h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold">
						Meet the <span className="text-[var(--accent)]">Speakers</span>
					</h2>
				</div>
				<AnimatedGroup
					preset="blur-slide"
					triggerOnView
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
				>
					{PLACEHOLDER_SPEAKERS.map((s) => (
						<div
							key={s.name}
							className={cardClass}
							style={{ borderRadius: "var(--radius)" }}
						>
							<div className="mb-4">
								<Avatar name={s.name} />
							</div>
							<h3 className="font-medium">{s.name}</h3>
							<p className="text-xs text-[var(--muted)]">
								{s.title} @ {s.company}
							</p>
							<p className="mt-3 text-sm text-[var(--accent)]">{s.talk}</p>
						</div>
					))}
				</AnimatedGroup>
				<div className="mt-8 text-center">
					<a
						href="/speakers"
						className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
					>
						View all speakers →
					</a>
				</div>
			</div>
		</section>
	);
}
