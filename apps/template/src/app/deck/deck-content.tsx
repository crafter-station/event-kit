"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { event } from "@/lib/event";
import { TextEffect } from "@/components/motion/text-effect";
import { AnimatedGroup } from "@/components/motion/animated-group";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DeckSlide = NonNullable<NonNullable<typeof event.features.sponsors>["deckSlides"]>[number];

function renderSlide(slide: DeckSlide, sponsorConfig: NonNullable<typeof event.features.sponsors>) {
	switch (slide.variant) {
		case "cover":
			return (
				<div className="text-center max-w-3xl">
					<TextEffect
						preset="fade-in-blur"
						per="word"
						as="h1"
						className="font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,6rem)] font-bold leading-[1.05]"
					>
						{event.name}
					</TextEffect>
					{event.tagline && (
						<TextEffect
							preset="fade"
							delay={0.5}
							as="p"
							className="mt-6 text-xl text-[var(--muted)]"
						>
							{event.tagline}
						</TextEffect>
					)}
					<p className="mt-8 font-mono text-sm text-[var(--muted)]">
						{event.dates?.start.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
						{" — "}
						{event.dates?.end.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
						{event.location?.city && ` · ${event.location.city}, ${event.location.country}`}
					</p>
				</div>
			);

		case "opportunity":
			return (
				<div className="text-center max-w-2xl">
					<TextEffect
						preset="fade-in-blur"
						per="word"
						as="h2"
						className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold"
					>
						{slide.title || "The Opportunity"}
					</TextEffect>
					{slide.content && (
						<TextEffect
							preset="fade"
							delay={0.3}
							as="p"
							className="mt-8 text-lg text-[var(--muted)] leading-relaxed"
						>
							{slide.content}
						</TextEffect>
					)}
				</div>
			);

		case "audience":
			return (
				<div className="text-center max-w-3xl">
					<TextEffect
						preset="fade-in-blur"
						per="word"
						as="h2"
						className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold mb-12"
					>
						{slide.title || "Our Audience"}
					</TextEffect>
					<AnimatedGroup preset="blur-slide" className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{[
							{ label: "Expected Attendees", value: 500 },
							{ label: "Countries", value: 12 },
							{ label: "Speakers", value: 20 },
							{ label: "Sponsors", value: 15 },
						].map((stat) => (
							<div
								key={stat.label}
								className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6"
							>
								<p className="text-3xl md:text-4xl font-bold font-mono">
									<AnimatedNumber value={stat.value} />
									<span>+</span>
								</p>
								<p className="mt-2 text-sm text-[var(--muted)]">{stat.label}</p>
							</div>
						))}
					</AnimatedGroup>
				</div>
			);

		case "tiers":
			return (
				<div className="w-full max-w-5xl">
					<TextEffect
						preset="fade-in-blur"
						per="word"
						as="h2"
						className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-center mb-12"
					>
						{slide.title || "Sponsor Tiers"}
					</TextEffect>
					<AnimatedGroup
						preset="blur-slide"
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
					>
						{sponsorConfig.tiers.map((tier) => (
							<div
								key={tier.slug}
								className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 hover:border-[var(--accent)]/20 transition-colors"
							>
								<div className="flex items-center gap-2 mb-3">
									<div className="w-2 h-2 rounded-full" style={{ background: tier.color }} />
									<h3 className="font-mono text-sm uppercase tracking-wider">{tier.name}</h3>
								</div>
								{tier.price && (
									<p className="text-2xl font-bold font-mono mb-4">
										${(tier.price / 100).toLocaleString()}
									</p>
								)}
								<ul className="space-y-2">
									{tier.benefits?.map((b) => (
										<li key={b} className="text-sm text-[var(--muted)] flex items-start gap-2">
											<span className="text-[var(--accent-secondary)] mt-0.5">·</span>
											{b}
										</li>
									))}
								</ul>
							</div>
						))}
					</AnimatedGroup>
				</div>
			);

		case "benefits":
			return (
				<div className="text-center max-w-2xl">
					<TextEffect
						preset="fade-in-blur"
						per="word"
						as="h2"
						className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold"
					>
						{slide.title || "Benefits"}
					</TextEffect>
					{slide.content && (
						<TextEffect
							preset="fade"
							delay={0.3}
							as="p"
							className="mt-8 text-lg text-[var(--muted)] leading-relaxed"
						>
							{slide.content}
						</TextEffect>
					)}
				</div>
			);

		case "past-sponsors":
			return (
				<div className="text-center max-w-3xl">
					<TextEffect
						preset="fade-in-blur"
						per="word"
						as="h2"
						className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold mb-12"
					>
						{slide.title || "Past Sponsors"}
					</TextEffect>
					<AnimatedGroup preset="fade" className="grid grid-cols-3 md:grid-cols-4 gap-8">
						{Array.from({ length: 8 }).map((_, i) => (
							<div
								key={i}
								className="aspect-[3/2] bg-[var(--surface)] border border-[var(--border)] rounded-lg flex items-center justify-center text-[var(--muted)] text-sm"
							>
								Logo
							</div>
						))}
					</AnimatedGroup>
				</div>
			);

		case "contact":
			return (
				<div className="text-center max-w-2xl">
					<TextEffect
						preset="fade-in-blur"
						per="word"
						as="h2"
						className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold"
					>
						{slide.title || "Let's Talk"}
					</TextEffect>
					<TextEffect
						preset="fade"
						delay={0.3}
						as="p"
						className="mt-6 text-lg text-[var(--muted)]"
					>
						{slide.content || "Interested in sponsoring? We'd love to hear from you."}
					</TextEffect>
					{sponsorConfig.ctaUrl && (
						<div className="mt-8">
							<a
								href={sponsorConfig.ctaUrl}
								className="inline-block rounded-md bg-[var(--accent)] px-8 py-3 text-sm font-medium text-[var(--background)] transition-all hover:opacity-90 active:scale-95"
							>
								Become a Sponsor
							</a>
						</div>
					)}
				</div>
			);

		default:
			return (
				<div className="text-center max-w-2xl">
					<h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold">
						{slide.title}
					</h2>
					{slide.content && (
						<p className="mt-6 text-lg text-[var(--muted)]">{slide.content}</p>
					)}
				</div>
			);
	}
}

export function DeckContent() {
	const sponsorConfig = event.features.sponsors;
	if (!sponsorConfig?.deckSlides) return null;

	const slides = sponsorConfig.deckSlides;

	return <DeckInner slides={slides} sponsorConfig={sponsorConfig} />;
}

type SponsorConfig = NonNullable<typeof event.features.sponsors>;

function DeckInner({
	slides,
	sponsorConfig,
}: {
	slides: DeckSlide[];
	sponsorConfig: SponsorConfig;
}) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [direction, setDirection] = useState<"next" | "prev">("next");
	const [slideKey, setSlideKey] = useState(0);
	const touchStartX = useRef<number | null>(null);
	const touchStartY = useRef<number | null>(null);

	const goToSlide = useCallback(
		(index: number, dir?: "next" | "prev") => {
			if (isTransitioning || index === currentSlide) return;
			if (index < 0 || index >= slides.length) return;
			setDirection(dir || (index > currentSlide ? "next" : "prev"));
			setIsTransitioning(true);
			setTimeout(() => {
				setCurrentSlide(index);
				setSlideKey((k) => k + 1);
				setIsTransitioning(false);
			}, 300);
		},
		[currentSlide, isTransitioning, slides.length],
	);

	const nextSlide = useCallback(() => {
		goToSlide(currentSlide < slides.length - 1 ? currentSlide + 1 : 0, "next");
	}, [currentSlide, goToSlide, slides.length]);

	const prevSlide = useCallback(() => {
		goToSlide(currentSlide > 0 ? currentSlide - 1 : slides.length - 1, "prev");
	}, [currentSlide, goToSlide, slides.length]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					nextSlide();
					break;
				case "ArrowLeft":
				case "ArrowUp":
					prevSlide();
					break;
				case "Home":
					goToSlide(0);
					break;
				case "End":
					goToSlide(slides.length - 1);
					break;
				case "Escape":
					window.location.href = "/";
					break;
				default:
					if (e.key >= "1" && e.key <= "9") {
						const idx = Number.parseInt(e.key) - 1;
						if (idx < slides.length) goToSlide(idx);
					}
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [nextSlide, prevSlide, goToSlide, slides.length]);

	useEffect(() => {
		const handleTouchStart = (e: TouchEvent) => {
			touchStartX.current = e.touches[0]?.clientX ?? null;
			touchStartY.current = e.touches[0]?.clientY ?? null;
		};
		const handleTouchEnd = (e: TouchEvent) => {
			if (touchStartX.current === null || touchStartY.current === null) return;
			const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
			const dy = (e.changedTouches[0]?.clientY ?? 0) - touchStartY.current;
			if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
				if (dx < 0) nextSlide();
				else prevSlide();
			}
			touchStartX.current = null;
			touchStartY.current = null;
		};
		window.addEventListener("touchstart", handleTouchStart);
		window.addEventListener("touchend", handleTouchEnd);
		return () => {
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchend", handleTouchEnd);
		};
	}, [nextSlide, prevSlide]);

	const slideClasses = [
		"absolute inset-0 flex items-center justify-center p-8 md:p-16",
		"transition-all duration-500 ease-out",
		isTransitioning
			? direction === "next"
				? "opacity-0 translate-x-12"
				: "opacity-0 -translate-x-12"
			: "opacity-100 translate-x-0",
	].join(" ");

	return (
		<div className="fixed inset-0 z-50 bg-[var(--background)] overflow-hidden">
			<div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--border)] z-50">
				<div
					className="h-full bg-[var(--foreground)] transition-all duration-300"
					style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
				/>
			</div>

			<div className="absolute top-6 right-8 text-xs font-mono text-[var(--muted)] z-50">
				{currentSlide + 1} / {slides.length}
			</div>

			<div className="relative w-full h-full" onClick={nextSlide}>
				<div key={slideKey} className={slideClasses}>
					{renderSlide(slides[currentSlide] as DeckSlide, sponsorConfig)}
				</div>
			</div>

			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
				{slides.map((slide, i) => (
					<button
						key={slide.variant}
						onClick={(e) => {
							e.stopPropagation();
							goToSlide(i);
						}}
						className={[
							"group relative h-1.5 rounded-full transition-all duration-300",
							i === currentSlide
								? "w-8 bg-[var(--foreground)]"
								: "w-1.5 bg-[var(--muted)]/30 hover:bg-[var(--muted)]/60",
						].join(" ")}
						aria-label={`Slide ${i + 1}: ${slide.variant}`}
					>
						<span
							className={[
								"absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono whitespace-nowrap transition-opacity duration-200",
								i === currentSlide
									? "opacity-100 text-[var(--foreground)]"
									: "opacity-0 group-hover:opacity-100 text-[var(--muted)]",
							].join(" ")}
						>
							{slide.variant}
						</span>
					</button>
				))}
			</div>

			<button
				onClick={(e) => {
					e.stopPropagation();
					prevSlide();
				}}
				className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
			>
				<ChevronLeft size={24} />
			</button>
			<button
				onClick={(e) => {
					e.stopPropagation();
					nextSlide();
				}}
				className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
			>
				<ChevronRight size={24} />
			</button>

			<div className="absolute bottom-8 right-8 text-[var(--muted)] text-xs hidden md:flex items-center gap-2 z-50">
				<kbd className="px-1.5 py-0.5 bg-[var(--surface)] border border-[var(--border)] rounded-sm font-mono">
					&larr;
				</kbd>
				<kbd className="px-1.5 py-0.5 bg-[var(--surface)] border border-[var(--border)] rounded-sm font-mono">
					&rarr;
				</kbd>
			</div>
		</div>
	);
}
