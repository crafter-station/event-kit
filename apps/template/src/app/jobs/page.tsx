import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { event } from "@/lib/event";

export const metadata = {
	title: `Jobs | ${event.name}`,
};

const PLACEHOLDER_JOBS = [
	{
		id: "1",
		title: "Senior ML Engineer",
		company: "TechCorp",
		type: "Full-time",
		location: "Remote",
		featured: true,
	},
	{
		id: "2",
		title: "Frontend Developer",
		company: "StartupAI",
		type: "Full-time",
		location: "Lima, PE",
	},
	{
		id: "3",
		title: "Data Scientist Intern",
		company: "DeepLab",
		type: "Internship",
		location: "Remote",
	},
	{
		id: "4",
		title: "DevOps Engineer",
		company: "CloudScale",
		type: "Contract",
		location: "Remote",
	},
];

export default function JobsPage() {
	return (
		<>
			<Navbar />
			<main className="pt-20 px-6 pb-20">
				<div className="mx-auto max-w-4xl">
					<div className="text-center mb-12">
						<p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-2">
							Careers
						</p>
						<h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold">
							Open <span className="text-[var(--accent)]">Positions</span>
						</h1>
						<p className="mt-4 text-sm text-[var(--muted)]">
							Opportunities from our sponsor companies
						</p>
					</div>
					<div className="space-y-2">
						{PLACEHOLDER_JOBS.map((job) => (
							<div
								key={job.id}
								className="flex items-center gap-4 rounded-lg border border-white/5 bg-[var(--surface)] p-4 transition-colors hover:border-white/10"
							>
								<div className="h-10 w-10 rounded-lg bg-white/5 shrink-0" />
								<div className="flex-1">
									<div className="flex items-center gap-2">
										<h3 className="text-sm font-medium">{job.title}</h3>
										{job.featured && (
											<span className="rounded-full bg-[var(--accent)]/10 px-2 py-0.5 text-[10px] font-mono text-[var(--accent)]">
												Featured
											</span>
										)}
									</div>
									<p className="text-xs text-[var(--muted)]">
										{job.company} • {job.type} • {job.location}
									</p>
								</div>
								<button
									type="button"
									className="rounded-md border border-white/10 px-4 py-1.5 text-xs font-medium text-[var(--muted)] hover:text-white hover:border-white/20 transition-colors"
								>
									Apply
								</button>
							</div>
						))}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
