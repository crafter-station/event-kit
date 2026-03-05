import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { event } from "@/lib/event";

export const metadata = {
	title: `Submissions | ${event.name}`,
};

const PLACEHOLDER_SUBMISSIONS = [
	{
		title: "EduAI Assistant",
		team: "Team Alpha",
		track: "ai-education",
		description: "AI-powered tutoring platform.",
		demoUrl: "#",
		repoUrl: "#",
	},
	{
		title: "MedScan",
		team: "HealthHackers",
		track: "ai-health",
		description: "Medical image analysis tool.",
		demoUrl: "#",
		repoUrl: "#",
	},
	{
		title: "CarbonTrack",
		team: "GreenBytes",
		track: "ai-climate",
		description: "Personal carbon footprint tracker.",
		demoUrl: "#",
		repoUrl: "#",
	},
	{
		title: "CodeBuddy",
		team: "Pair Pro",
		track: "open",
		description: "AI pair programming companion.",
		demoUrl: "#",
		repoUrl: "#",
	},
	{
		title: "LangLearn",
		team: "Polyglots",
		track: "ai-education",
		description: "Language learning with spaced repetition.",
		demoUrl: "#",
		repoUrl: "#",
	},
	{
		title: "MindfulAI",
		team: "Wellness Co",
		track: "ai-health",
		description: "Mental health check-in chatbot.",
		demoUrl: "#",
		repoUrl: "#",
	},
];

export default function SubmissionsPage() {
	const hackathon = event.features.hackathon;
	const tracks = hackathon?.tracks ?? [];

	return (
		<>
			<Navbar />
			<main className="pt-20 px-6 pb-20">
				<div className="mx-auto max-w-6xl">
					<div className="text-center mb-12">
						<p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-2">
							Gallery
						</p>
						<h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold">
							Project <span className="text-[var(--accent)]">Submissions</span>
						</h1>
						<p className="mt-4 text-sm text-[var(--muted)]">
							{PLACEHOLDER_SUBMISSIONS.length} projects submitted
						</p>
					</div>

					{tracks.length > 0 && (
						<div className="flex flex-wrap gap-2 justify-center mb-8">
							<span className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-3 py-1 text-xs font-mono text-[var(--accent)]">
								All
							</span>
							{tracks.map((track: NonNullable<NonNullable<typeof event.features.hackathon>["tracks"]>[number]) => (
								<span
									key={track.slug}
									className="rounded-full border border-white/10 px-3 py-1 text-xs font-mono text-[var(--muted)] hover:text-white cursor-pointer transition-colors"
								>
									{track.name}
								</span>
							))}
						</div>
					)}

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{PLACEHOLDER_SUBMISSIONS.map((sub) => {
							const track = tracks.find((t: NonNullable<NonNullable<typeof event.features.hackathon>["tracks"]>[number]) => t.slug === sub.track);
							return (
								<div
									key={sub.title}
									className="rounded-lg border border-white/5 bg-[var(--surface)] p-6 transition-colors hover:border-white/10"
								>
									<div className="mb-3 aspect-video rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center">
										<span className="text-xs text-[var(--muted)]">Screenshot</span>
									</div>
									<div className="flex items-center gap-2 mb-2">
										{track && (
											<div className="h-2 w-2 rounded-full" style={{ background: track.color }} />
										)}
										<span className="text-[10px] font-mono text-[var(--muted)]">
											{track?.name ?? sub.track}
										</span>
									</div>
									<h3 className="font-medium">{sub.title}</h3>
									<p className="text-xs text-[var(--muted)] mb-1">{sub.team}</p>
									<p className="text-xs text-[var(--muted)] mt-2">{sub.description}</p>
									<div className="mt-4 flex gap-2">
										<a
											href={sub.demoUrl}
											className="rounded border border-white/10 px-3 py-1 text-[10px] font-mono text-[var(--muted)] hover:text-white transition-colors"
										>
											Demo
										</a>
										<a
											href={sub.repoUrl}
											className="rounded border border-white/10 px-3 py-1 text-[10px] font-mono text-[var(--muted)] hover:text-white transition-colors"
										>
											Code
										</a>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
