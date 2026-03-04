"use client";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { event } from "@/lib/event";
import { useTranslation } from "@event-sdk/i18n";
import { useEffect, useState } from "react";

export function Countdown() {
	const { t } = useTranslation();
	const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		if (!event.dates?.start) return;
		const target = event.dates.start.getTime();
		const update = () => {
			const diff = Math.max(0, target - Date.now());
			setTime({
				days: Math.floor(diff / 86400000),
				hours: Math.floor((diff % 86400000) / 3600000),
				minutes: Math.floor((diff % 3600000) / 60000),
				seconds: Math.floor((diff % 60000) / 1000),
			});
		};
		update();
		const id = setInterval(update, 1000);
		return () => clearInterval(id);
	}, []);

	if (!event.dates?.start) return null;

	const units = [
		{ value: time.days, label: t.countdown.days },
		{ value: time.hours, label: t.countdown.hours },
		{ value: time.minutes, label: t.countdown.minutes },
		{ value: time.seconds, label: t.countdown.seconds },
	];

	return (
		<section className="py-20 px-6">
			<div className="mx-auto max-w-4xl text-center">
				<p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-8">
					{t.countdown.label}
				</p>
				<div className="flex items-center justify-center gap-3 md:gap-4">
					{units.map((u, i) => (
						<div key={u.label} className="flex items-center gap-3 md:gap-4">
							<div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 md:p-6 flex flex-col items-center min-w-[72px] md:min-w-[96px]">
								<span className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tabular-nums font-mono">
									{mounted ? (
										<AnimatedNumber
											value={u.value}
											prefix={u.value < 10 ? "0" : ""}
										/>
									) : (
										String(u.value).padStart(2, "0")
									)}
								</span>
								<span className="mt-2 text-[10px] font-mono uppercase tracking-widest text-[var(--muted)]">
									{u.label}
								</span>
							</div>
							{i < units.length - 1 && (
								<span className="text-[var(--muted)] text-2xl font-mono mb-4 select-none">:</span>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
