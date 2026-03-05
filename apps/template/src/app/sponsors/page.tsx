import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { event } from "@/lib/event";

type SponsorTier = NonNullable<typeof event.features.sponsors>["tiers"][number];

export const metadata = {
	title: `Sponsors | ${event.name}`,
};

export default function SponsorsPage() {
	const sponsorConfig = event.features.sponsors;

	return (
		<>
			<Navbar />
			<main className="pt-20 px-6 pb-20">
				<div className="mx-auto max-w-6xl">
					<div className="text-center mb-12">
						<p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-2">
							Partners
						</p>
						<h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold">
							Our <span className="text-[var(--accent)]">Sponsors</span>
						</h1>
					</div>
					{sponsorConfig?.tiers.map((tier: SponsorTier) => (
						<div key={tier.id} className="mb-12">
							<h2
								className="font-mono text-sm uppercase tracking-widest mb-4"
								style={{ color: tier.color }}
							>
								{tier.name} {tier.price ? `— $${(tier.price / 100).toLocaleString()}` : ""}
							</h2>
							<div className="rounded-lg border border-white/5 bg-[var(--surface)] p-8">
								<div className="flex items-center justify-center gap-8 flex-wrap">
									<div className="h-20 w-48 rounded-lg border border-dashed border-white/10 flex items-center justify-center text-xs text-[var(--muted)]">
										Your logo here
									</div>
								</div>
								{tier.benefits && (
									<div className="mt-6 flex flex-wrap gap-2 justify-center">
										{tier.benefits.map((b: string) => (
											<span
												key={b}
												className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)]"
											>
												{b}
											</span>
										))}
									</div>
								)}
							</div>
						</div>
					))}
					{sponsorConfig?.ctaUrl && (
						<div className="text-center mt-12">
							<a
								href={sponsorConfig.ctaUrl}
								className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-8 py-3 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90"
							>
								{sponsorConfig.ctaLabel ?? "Become a Sponsor"}
							</a>
						</div>
					)}
				</div>
			</main>
			<Footer />
		</>
	);
}
