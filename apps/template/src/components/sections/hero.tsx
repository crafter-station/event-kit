"use client";

import { EncryptedText } from "@/components/decorative/encrypted-text";
import { TextEffect } from "@/components/motion/text-effect";
import { event } from "@/lib/event";
import { useThemeStyle } from "@/lib/themes";

export function Hero() {
	const { styleId } = useThemeStyle();
	const isRetro = styleId === "retro";
	const isBrutal = styleId === "brutal";

	const dateStr = event.dates
		? `${event.dates.start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${event.dates.end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
		: undefined;

	return (
		<section
			className={`relative flex min-h-[100dvh] flex-col items-center justify-center px-6 py-32 pt-32 pb-12 ${isRetro ? "scanlines" : ""}`}
		>
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,var(--accent)_0%,transparent_70%)] opacity-[0.05] pointer-events-none" />
			<div className={`relative text-center max-w-3xl ${isBrutal ? "brutalist-card p-8" : ""}`}>
				<p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-4">
					{event.type.toUpperCase()}
				</p>
				<h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
					{isRetro ? (
						<EncryptedText text={event.name} />
					) : (
						<TextEffect preset="fade-in-blur" per="word">
							{event.name}
						</TextEffect>
					)}
				</h1>
				{event.tagline && (
					<p className="mt-4 text-lg text-[var(--muted)]">{event.tagline}</p>
				)}
				{(dateStr || event.location) && (
					<div className="mt-6 flex items-center justify-center gap-4 text-sm text-[var(--muted)]">
						{dateStr && <span className="font-mono">{dateStr}</span>}
						{dateStr && event.location?.city && <span className="text-[var(--border)]">|</span>}
						{event.location && (
							<span className="font-mono">
								{event.location.city}
								{event.location.country ? `, ${event.location.country}` : ""}
								{event.location.format !== "in-person" && ` (${event.location.format})`}
							</span>
						)}
					</div>
				)}
				<div className="mt-8 flex items-center justify-center gap-3">
					<a
						href="#register"
						className={`px-6 py-2.5 text-sm font-medium transition-all active:scale-95 ${
							isRetro
								? "pixel-border-sm text-[var(--foreground)]"
								: isBrutal
									? "brutalist-button bg-[var(--accent)] text-[var(--accent-foreground)]"
									: "bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90"
						}`}
						style={{ borderRadius: "var(--radius)" }}
					>
						Register Now
					</a>
					{event.features.deck && (
						<a
							href="/deck"
							className="border border-[var(--border)] px-6 py-2.5 text-sm font-medium text-[var(--muted)] transition-all hover:text-[var(--foreground)] hover:border-[var(--accent)]/30 active:scale-95"
							style={{ borderRadius: "var(--radius)" }}
						>
							Sponsor Deck
						</a>
					)}
				</div>
			</div>
		</section>
	);
}
