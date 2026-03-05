"use client";

import { event } from "@/lib/event";
import { useThemeStyle } from "@/lib/themes";
import { DiscordLogo, WhatsappLogo } from "@phosphor-icons/react";

export function Community() {
	const community = event.features.community;
	const { iconWeight } = useThemeStyle();

	if (!community) return null;

	return (
		<section className="py-20 px-6" id="community">
			<div className="mx-auto max-w-2xl text-center">
				<p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-2">
					Community
				</p>
				<h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold mb-4">
					Join the <span className="text-[var(--accent)]">Community</span>
				</h2>
				<p className="text-sm text-[var(--muted)] mb-8">
					Connect with other attendees before, during, and after the event.
				</p>
				<div className="flex items-center justify-center gap-3">
					{community.whatsappUrl && (
						<a
							href={community.whatsappUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-6 py-2.5 text-sm font-medium text-[var(--foreground)] transition-all hover:bg-[var(--accent)]/10"
							style={{ borderRadius: "var(--radius)" }}
						>
							<WhatsappLogo size={16} weight={iconWeight} className="text-[#25D366]" />
							Join WhatsApp
						</a>
					)}
					{community.discordUrl && (
						<a
							href={community.discordUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-6 py-2.5 text-sm font-medium text-[var(--foreground)] transition-all hover:bg-[var(--accent)]/10"
							style={{ borderRadius: "var(--radius)" }}
						>
							<DiscordLogo size={16} weight={iconWeight} className="text-[#5865F2]" />
							Join Discord
						</a>
					)}
				</div>
			</div>
		</section>
	);
}
