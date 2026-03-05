"use client";

import { event } from "@/lib/event";
import { useState } from "react";

export function SubmissionForm() {
	const hackathon = event.features.hackathon;
	const [submitted, setSubmitted] = useState(false);
	const [data, setData] = useState({
		title: "",
		track: hackathon?.tracks?.[0]?.slug ?? "",
		description: "",
		demoUrl: "",
		repoUrl: "",
		videoUrl: "",
		teamName: "",
		teamMembers: "",
	});

	const update = (field: string, value: string) => setData((prev) => ({ ...prev, [field]: value }));

	if (submitted) {
		return (
			<div className="rounded-xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 p-8 text-center">
				<p className="text-2xl font-bold mb-2">Submitted!</p>
				<p className="text-sm text-[var(--muted)]">
					Your project &quot;{data.title}&quot; has been submitted successfully.
				</p>
				<a
					href="/submissions"
					className="mt-4 inline-block text-sm text-[var(--accent)] hover:underline"
				>
					View all submissions →
				</a>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div>
				<label htmlFor="sub-title" className="block text-xs font-mono text-[var(--muted)] mb-1.5">
					Project Name
				</label>
				<input
					id="sub-title"
					type="text"
					value={data.title}
					onChange={(e) => update("title", e.target.value)}
					className="w-full rounded-lg border border-white/10 bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-white/20 focus:border-[var(--accent)]/50 focus:outline-none"
					placeholder="My AI Project"
				/>
			</div>

			{hackathon?.tracks && hackathon.tracks.length > 0 && (
				<div>
					<label htmlFor="sub-track" className="block text-xs font-mono text-[var(--muted)] mb-1.5">
						Track
					</label>
					<div className="grid grid-cols-2 gap-2">
						{hackathon.tracks.map((track: NonNullable<NonNullable<typeof event.features.hackathon>["tracks"]>[number]) => (
							<button
								key={track.slug}
								type="button"
								onClick={() => update("track", track.slug)}
								className={`rounded-lg border p-3 text-left text-xs transition-colors ${
									data.track === track.slug
										? "border-[var(--accent)]/50 bg-[var(--accent)]/5"
										: "border-white/5 bg-[var(--surface)] hover:border-white/10"
								}`}
							>
								<div className="flex items-center gap-2 mb-1">
									<div className="h-2 w-2 rounded-full" style={{ background: track.color }} />
									<span className="font-medium">{track.name}</span>
								</div>
								{track.description && (
									<p className="text-[var(--muted)] line-clamp-1">{track.description}</p>
								)}
							</button>
						))}
					</div>
				</div>
			)}

			<div>
				<label htmlFor="sub-team" className="block text-xs font-mono text-[var(--muted)] mb-1.5">
					Team Name
				</label>
				<input
					id="sub-team"
					type="text"
					value={data.teamName}
					onChange={(e) => update("teamName", e.target.value)}
					className="w-full rounded-lg border border-white/10 bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-white/20 focus:border-[var(--accent)]/50 focus:outline-none"
					placeholder="Team Awesome"
				/>
			</div>

			<div>
				<label htmlFor="sub-members" className="block text-xs font-mono text-[var(--muted)] mb-1.5">
					Team Members
				</label>
				<input
					id="sub-members"
					type="text"
					value={data.teamMembers}
					onChange={(e) => update("teamMembers", e.target.value)}
					className="w-full rounded-lg border border-white/10 bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-white/20 focus:border-[var(--accent)]/50 focus:outline-none"
					placeholder="Comma-separated names"
				/>
			</div>

			<div>
				<label htmlFor="sub-desc" className="block text-xs font-mono text-[var(--muted)] mb-1.5">
					Description
				</label>
				<textarea
					id="sub-desc"
					rows={4}
					value={data.description}
					onChange={(e) => update("description", e.target.value)}
					className="w-full rounded-lg border border-white/10 bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-white/20 focus:border-[var(--accent)]/50 focus:outline-none resize-none"
					placeholder="What does your project do?"
				/>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div>
					<label htmlFor="sub-demo" className="block text-xs font-mono text-[var(--muted)] mb-1.5">
						Demo URL
					</label>
					<input
						id="sub-demo"
						type="url"
						value={data.demoUrl}
						onChange={(e) => update("demoUrl", e.target.value)}
						className="w-full rounded-lg border border-white/10 bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-white/20 focus:border-[var(--accent)]/50 focus:outline-none"
						placeholder="https://"
					/>
				</div>
				<div>
					<label htmlFor="sub-repo" className="block text-xs font-mono text-[var(--muted)] mb-1.5">
						Repo URL
					</label>
					<input
						id="sub-repo"
						type="url"
						value={data.repoUrl}
						onChange={(e) => update("repoUrl", e.target.value)}
						className="w-full rounded-lg border border-white/10 bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-white/20 focus:border-[var(--accent)]/50 focus:outline-none"
						placeholder="https://github.com/"
					/>
				</div>
				<div>
					<label htmlFor="sub-video" className="block text-xs font-mono text-[var(--muted)] mb-1.5">
						Video URL
					</label>
					<input
						id="sub-video"
						type="url"
						value={data.videoUrl}
						onChange={(e) => update("videoUrl", e.target.value)}
						className="w-full rounded-lg border border-white/10 bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-white/20 focus:border-[var(--accent)]/50 focus:outline-none"
						placeholder="https://youtube.com/"
					/>
				</div>
			</div>

			{hackathon?.judgingCriteria && (
				<div className="rounded-lg border border-white/5 bg-[var(--surface)] p-4">
					<p className="text-xs font-mono text-[var(--accent)] tracking-widest uppercase mb-3">
						Judging Criteria
					</p>
					<div className="space-y-2">
						{hackathon.judgingCriteria.map((c: NonNullable<NonNullable<typeof event.features.hackathon>["judgingCriteria"]>[number]) => (
							<div key={c.name} className="flex items-center justify-between text-xs">
								<div>
									<span className="font-medium">{c.name}</span>
									{c.description && (
										<span className="text-[var(--muted)] ml-2">— {c.description}</span>
									)}
								</div>
								<span className="font-mono text-[var(--accent)]">{c.weight}%</span>
							</div>
						))}
					</div>
				</div>
			)}

			<button
				type="button"
				onClick={() => setSubmitted(true)}
				disabled={!data.title.trim() || !data.demoUrl.trim()}
				className="w-full rounded-lg bg-[var(--accent)] py-3 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
			>
				Submit Project
			</button>
		</div>
	);
}
