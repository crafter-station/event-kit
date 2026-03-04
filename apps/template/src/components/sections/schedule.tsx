"use client";

import { AnimatedGroup } from "@/components/motion/animated-group";
import { event } from "@/lib/event";

const PLACEHOLDER_SESSIONS = [
	{ time: "09:00", title: "Registration & Check-in", type: "break" },
	{ time: "10:00", title: "Opening Keynote", type: "keynote", speaker: "Jane Doe" },
	{ time: "11:00", title: "Hacking Begins!", type: "workshop" },
	{ time: "13:00", title: "Lunch Break", type: "break" },
	{ time: "14:00", title: "Mentor Office Hours", type: "panel" },
	{ time: "18:00", title: "Day 1 Wrap-up", type: "keynote", speaker: "Carlos Ruiz" },
];

const TYPE_BADGE: Record<string, string> = {
	keynote: "bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20",
	workshop: "bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/20",
	panel: "bg-[var(--muted)]/10 text-[var(--muted)] border-[var(--muted)]/20",
	break: "bg-[var(--surface)] text-[var(--muted)] border-[var(--border)]",
	networking: "bg-[var(--surface)] text-[var(--muted)] border-[var(--border)]",
	talk: "bg-[var(--surface)] text-[var(--muted)] border-[var(--border)]",
};

export function Schedule() {
	if (!event.features.schedule?.enabled) return null;

	return (
		<section className="py-20 px-6" id="schedule">
			<div className="mx-auto max-w-4xl">
				<div className="text-center mb-12">
					<p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-2">
						Schedule
					</p>
					<h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold">
						Event <span className="text-[var(--accent)]">Agenda</span>
					</h2>
				</div>
				<AnimatedGroup preset="slide" triggerOnView className="relative">
					<div className="absolute left-[5.5rem] top-0 bottom-0 border-l-2 border-[var(--border)] pointer-events-none" />
					<div className="space-y-3">
						{PLACEHOLDER_SESSIONS.map((s) => (
							<div key={`${s.time}-${s.title}`} className="flex items-start gap-4">
								<span className="font-mono text-sm text-[var(--muted)] w-14 shrink-0 pt-3.5">
									{s.time}
								</span>
								<div className="relative flex items-start gap-4 flex-1">
									<div className="absolute -left-[1.1rem] top-[1.1rem] h-3 w-3 rounded-full bg-[var(--accent)] border-2 border-[var(--background)] shrink-0" />
									<div className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--accent)]/20">
										<div className="flex items-center justify-between gap-2">
											<p className="text-sm font-medium">{s.title}</p>
											<span
												className={`rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase shrink-0 ${TYPE_BADGE[s.type] ?? TYPE_BADGE.break}`}
											>
												{s.type}
											</span>
										</div>
										{s.speaker && (
											<p className="mt-1 text-xs text-[var(--muted)]">{s.speaker}</p>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</AnimatedGroup>
				<div className="mt-8 text-center">
					<a
						href="/schedule"
						className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
					>
						Full schedule →
					</a>
				</div>
			</div>
		</section>
	);
}
