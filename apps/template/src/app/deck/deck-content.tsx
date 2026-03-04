"use client";

import { event } from "@/lib/event";

export function DeckContent() {
	const sponsorConfig = event.features.sponsors;
	if (!sponsorConfig?.deckSlides) return null;

	return (
		<div className="h-[100dvh] overflow-y-auto snap-y snap-mandatory">
			{sponsorConfig.deckSlides.map((slide, i) => (
				<div
					key={slide.variant}
					className="h-[100dvh] snap-start flex items-center justify-center px-6"
				>
					<div className="max-w-4xl text-center">
						{i === 0 ? (
							<>
								<p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-6">
									Sponsor Deck
								</p>
								<h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,4rem)] font-bold leading-tight">
									{slide.title ?? event.name}
								</h1>
								{event.tagline && (
									<p className="mt-4 text-lg text-[var(--muted)]">{event.tagline}</p>
								)}
							</>
						) : slide.variant === "tiers" ? (
							<>
								<h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold mb-12">
									{slide.title ?? "Sponsor Tiers"}
								</h2>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									{sponsorConfig.tiers.map((tier) => (
										<div
											key={tier.id}
											className="rounded-lg border border-white/5 bg-[var(--surface)] p-6"
										>
											<div
												className="h-3 w-3 rounded-full mx-auto mb-3"
												style={{ background: tier.color }}
											/>
											<p className="font-medium" style={{ color: tier.color }}>
												{tier.name}
											</p>
											{tier.price && (
												<p className="mt-1 text-2xl font-bold">
													${(tier.price / 100).toLocaleString()}
												</p>
											)}
											{tier.benefits && (
												<ul className="mt-4 space-y-1 text-xs text-[var(--muted)] text-left">
													{tier.benefits.map((b) => (
														<li key={b}>• {b}</li>
													))}
												</ul>
											)}
										</div>
									))}
								</div>
							</>
						) : (
							<>
								<h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold mb-6">
									{slide.title}
								</h2>
								{slide.content && (
									<p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">{slide.content}</p>
								)}
							</>
						)}
						<p className="mt-12 text-[10px] font-mono text-[var(--muted)]">
							{i + 1} / {sponsorConfig.deckSlides?.length ?? 0}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
